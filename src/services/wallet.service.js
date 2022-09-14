import Web3 from 'web3';
import Web3Modal from 'web3modal';
import ethProvider from 'eth-provider';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { BehaviorSubject } from 'rxjs';
// import BlockchainService from './blockchain.service';
import { isMobile } from '../lib/lib';
import { INFURA_PROVIDERS } from '../config/infura';
import MessageDialogService from './message-dialog.service';

class WalletService {
  initialState = {
    connected: false,
    connecting: false,
    address: '',
    chainId: null,
    networkName: '',
    error: '',
    deviceType: '',
  };

  state = this.initialState;
  state$ = new BehaviorSubject(this.initialState);

  constructor() {
    this.providerOptions = null;
    this.provider = null;
    this.web3 = null;
    this.web3Modal = null;

    this.activateConnection();
  }

  activateConnection = async () => {
    this.state = {
      ...this.state,
      connecting: true,
    };
    this.state$.next(this.state);
    const walletLS = JSON.parse(window.localStorage.getItem('wallet'));
    if (walletLS) {
      if (walletLS.deviceType === 'desktop') {
        await this.#createProvider();
      } else {
        await this.#createProviderMobile();
      }

      const addressResponse = await this.#getUserAddress(walletLS.deviceType);

      const chainId = await this.web3.eth.getChainId();
      const networkName = await this.#getNetworkName(chainId);

      this.state = {
        ...this.state,
        ...walletLS,
        connected: true,
        address: addressResponse[0],
        chainId,
        networkName,
        connecting: false,
      };

      this.#storeConnection();

      this.state$.next(this.state);
    } else {
      this.state = {
        ...this.state,
        connecting: false,
      };

      this.state$.next(this.state);
    }
  };

  #getUserAddress = async (deviceType) => {
    if (
      deviceType === 'desktop' &&
      !Object.keys(this.provider).includes('wc')
    ) {
      return await this.provider.request({
        method: 'eth_requestAccounts',
      });
    } else {
      return this.provider.enable();
    }
  };

  connect = async () => {
    if (this.state.connected) {
      return;
    }
    this.state = {
      ...this.state,
      connecting: true,
    };
    this.state$.next(this.state);

    let deviceType = 'desktop';

    if (isMobile()) {
      deviceType = 'mobile';
      await this.#createProviderMobile();
    } else {
      await this.#createProvider();
    }

    if (this.provider) {
      const addressResponse = await this.#getUserAddress(deviceType);
      const chainId = await this.web3.eth.getChainId();
      const networkName = await this.#getNetworkName(chainId);

      this.state = {
        ...this.state,
        connected: true,
        address: addressResponse[0],
        chainId,
        networkName,
        deviceType,
        connecting: false,
      };

      this.#storeConnection();

      this.state$.next(this.state);
    }
  };

  disconnect = async () => {
    if (this.web3Modal && this.web3Modal.cachedProvider) {
      this.web3Modal.clearCachedProvider();
    }

    window.localStorage.removeItem('wallet');

    this.state = this.initialState;
    this.state$.next(this.state);
  };

  changeNetwork = async (network) => {
    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(network) }],
      });
    } catch (e) {
      throw e;
    }
  };

  #getNetworkName = async (networkId) => {
    // TODO
    // const bc = await BlockchainService.getBCDataByNetworkId(networkId);
    // return bc.name;
  };

  setProviderOptions = () => {
    return new Promise((resolve) => {
      const initProviderOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              // 137: 'https://rpc-mainnet.maticvigil.com/',
              // 80001: 'https://matic-mumbai.chainstacklabs.com',
              // 97: 'https://data-seed-prebsc-1-s3.binance.org:8545',
              1: 'https://eth-mainnet.public.blastapi.io',
            },
          },
        },
      };

      const ws = new WebSocket('ws://127.0.0.1:1248/');

      ws.onerror = () => {
        ws.close();
        this.providerOptions = initProviderOptions;
        resolve(true);
      };

      ws.onopen = () => {
        ws.close();
        const frame = { package: ethProvider };
        this.providerOptions = { ...initProviderOptions, frame };
        resolve(true);
      };
    });
  };

  #createProvider = async () => {
    await this.setProviderOptions();
    this.web3Modal = new Web3Modal({
      // network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions: this.providerOptions, // required
      theme: 'dark',
    });

    try {
      this.provider = await this.web3Modal.connect();
      this.web3 = new Web3(this.provider);
    } catch (e) {
      await this.disconnect();
      throw e;
    }

    // Subscribe to accounts change
    this.provider.on('accountsChanged', async (accounts) => {
      await this.#accountChanged(accounts);
    });

    // Subscribe to chainId change
    this.provider.on('chainChanged', async (chainId) => {
      await this.#chainChanged(+chainId);
    });

    // Subscribe to provider disconnection
    this.provider.on('disconnect', async (error) => {
      await this.#providerDisconnected(error);
    });

    this.web3.eth.net.isListening(async (error) => {
      if (error) {
        await this.disconnect();
        MessageDialogService.showError(error.message, 'Provider error');
      }
    });
  };

  #createProviderMobile = async () => {
    if (this.web3Modal && this.web3Modal.cachedProvider) {
      this.web3Modal.clearCachedProvider();
    }

    const providerOptions = {
      rpc: INFURA_PROVIDERS,
      qrcodeModalOptions: {
        mobileLinks: [
          'rainbow',
          'metamask',
          'argent',
          'trust',
          'imtoken',
          'pillar',
        ],
      },
    };

    try {
      this.provider = new WalletConnectProvider(providerOptions);
      this.web3 = new Web3(this.provider);
    } catch (error) {
      MessageDialogService.showError(error, 'Provider error');
      await this.disconnect();
      return;
    }

    // Subscribe to accounts change
    this.provider.on('accountsChanged', async (accounts) => {
      await this.#accountChanged(accounts);
    });

    // Subscribe to chainId change
    this.provider.on('chainChanged', async (chainId) => {
      await this.#chainChanged(+chainId);
    });

    // Subscribe to session disconnection
    this.provider.on('disconnect', async (error) => {
      await this.#providerDisconnected(error);
    });

    this.web3.eth.net.isListening(async (error) => {
      if (error) {
        await this.disconnect();
        MessageDialogService.showError(error.message, 'Provider error');
      }
    });
  };

  #accountChanged = async (accounts) => {
    if (this.state.connected) {
      this.state = {
        ...this.state,
        address: accounts[0],
      };
      this.#storeConnection();
      this.state$.next(this.state);
    }
  };

  #chainChanged = async (chainId) => {
    if (this.state.connected) {
      const networkName = await this.#getNetworkName(chainId);
      this.state = {
        ...this.state,
        connected: true,
        networkName,
        chainId: chainId,
      };
      this.#storeConnection();
      this.state$.next(this.state);
    }
  };

  #providerDisconnected = async (error) => {
    // TODO:
    // console.log('disconnect', error);
    // this.state = {
    // 	...this.state,
    // 	connected: false,
    // 	error,
    // };
    // this.state$.next(this.state);
  };

  #storeConnection() {
    window.localStorage.setItem(
      'wallet',
      JSON.stringify({
        address: this.state.address,
        chainId: this.state.chainId,
        networkName: this.state.networkName,
        deviceType: this.state.deviceType,
      })
    );
  }
}

export default new WalletService();
