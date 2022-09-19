import { POST } from '../api/fetch-api';

class ApiService {
  constructor() {
    this.deployerUrl = process.env.REACT_APP_DEPLOYER_API_URL;
  }

  rpcCall(body) {
    return POST(`${this.deployerUrl}/rpc/call`, body);
  }

  async getStreams() {
    return {
      success: true,
      data: [
        {
          id: 1,
          icon: 'https://bloximages.newyork1.vip.townnews.com/lancasteronline.com/content/tncms/assets/v3/editorial/0/3c/03cde3ac-01b4-11ec-a9f2-bf04179f5161/611fa3191dd85.image.jpg?resize=888%2C500',
          name: 'Fruktozka',
          url: 'https://www.youtube.com/embed/jfKfPfyJRdk',
          active: true,
        },
        {
          id: 2,
          icon: 'https://i0.wp.com/www.coliseugeek.com.br/wp-content/uploads/2022/06/5-Dicas-para-streamer-evitar-perder-o-canal-no-youtube-ou-twitch.jpg?fit=1200%2C800&ssl=1',
          name: 'prostomaluy',
          url: 'https://www.youtube.com/embed/3pnXRyVNAxA',
          active: false,
        },
      ],
    };
  }

  getScreenShots(steamId) {
    const body = {
      method: 'photo.getPhotos',
      params: [steamId],
    };

    return this.rpcCall(body);
  }

  postScreenShot(steamId, author, base64Image) {
    const body = {
      method: 'photo.makeShut',
      params: [steamId, author, base64Image],
    };

    return this.rpcCall(body);
  }

  vote(screenshotId, accessToken) {
    const body = {
      method: 'voting.vote',
      params: [screenshotId, accessToken],
    };

    return this.rpcCall(body);
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
