export const html = `
  <div style="overflow: hidden; height: 100%;">
    <video
      autoplay
      playsinline
      muted
      id="video"
      style="height: 100%; width: 100%;"
    >
      Video stream not available.
    </video>
  </div>
`;

export const script = `
  async function start() {
    try {
      const captureOptions = {
        audio: false
      };

      const captureStream = await navigator.mediaDevices.getDisplayMedia(captureOptions);
      console.log(captureStream)
      document.getElementById('video').srcObject = captureStream;
    } catch(e) {
      console.error(e)
    }
  }

  start();
`;
