class BlockchainService {
  isMainnet(chainId) {
    switch (chainId) {
      case 1:
      case 137:
      case 56:
        return true;
      default:
        return false;
    }
  }
}

export default new BlockchainService();
