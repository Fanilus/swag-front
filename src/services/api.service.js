import { POST } from '../api/fetch-api';

class ApiService {
  constructor() {
    this.deployerUrl = process.env.REACT_APP_DEPLOYER_API_URL;
  }

  rpcCall(body) {
    return POST(`${this.deployerUrl}/rpc/call`, body);
  }

  login(login, password, address) {
    const body = {
      method: 'user.fakeLogin',
      params: [login, password, address],
    };

    return this.rpcCall(body);
  }
}

export default new ApiService();
