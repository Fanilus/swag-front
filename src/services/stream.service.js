import { from, Subject, take } from 'rxjs';
import ApiService from './api.service';

class StreamService {
  initialState = {
    loading: false,
    error: '',
    streams: [],
    activeStream: null,
    screenShots: [],
    userMedia: null,
  };

  state = this.initialState;
  state$ = new Subject();

  getStreams() {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.state,
      loading: true,
    };
    this.state$.next(this.state);

    const data$ = from(ApiService.getStreams()).pipe(take(1));

    data$.subscribe({
      next: (result) => {
        if (result.success) {
          this.state = {
            ...this.state,
            loading: false,
            streams: result.data,
          };
        } else {
          this.state = {
            ...this.state,
            loading: false,
            error: result.message,
          };
        }

        this.state$.next(this.state);
      },
      error: (error) => {
        this.state = {
          ...this.state,
          loading: false,
          error: error.message,
        };
        this.state$.next(this.state);
      },
    });
  }

  getScreenShots(streamId) {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.state,
      loading: true,
    };
    this.state$.next(this.state);

    const data$ = from(ApiService.getScreenShots(streamId)).pipe(take(1));

    data$.subscribe({
      next: (result) => {
        if (result.success) {
          this.state = {
            ...this.state,
            loading: false,
            screenShots: result.data,
          };
        } else {
          this.state = {
            ...this.state,
            loading: false,
            error: result.message,
          };
        }

        this.state$.next(this.state);
      },
      error: (error) => {
        this.state = {
          ...this.state,
          loading: false,
          error: error.message,
        };
        this.state$.next(this.state);
      },
    });
  }

  postScreenShot(streamId, author, base64Image) {
    return new Promise((resolve) => {
      if (this.state.loading) {
        return;
      }

      this.state = {
        ...this.state,
        loading: true,
      };
      this.state$.next(this.state);

      const data$ = from(
        ApiService.postScreenShot(streamId, author, base64Image)
      ).pipe(take(1));

      data$.subscribe({
        next: (result) => {
          if (result.success) {
            this.state = {
              ...this.state,
              loading: false,
            };
          } else {
            this.state = {
              ...this.state,
              loading: false,
              error: result.message,
            };
          }

          this.state$.next(this.state);
          resolve();
        },
        error: (error) => {
          this.state = {
            ...this.state,
            loading: false,
            error: error.message,
          };
          this.state$.next(this.state);
          resolve();
        },
      });
    });
  }

  vote(screenshotId, accessToken) {
    return new Promise((resolve) => {
      if (this.state.loading) {
        return;
      }

      this.state = {
        ...this.state,
        loading: true,
      };
      this.state$.next(this.state);

      const data$ = from(ApiService.vote(screenshotId, accessToken)).pipe(
        take(1)
      );

      data$.subscribe({
        next: (result) => {
          if (result.success) {
            this.state = {
              ...this.state,
              loading: false,
            };
          } else {
            this.state = {
              ...this.state,
              loading: false,
              error: result.message,
            };
          }

          this.state$.next(this.state);
          resolve(result.success);
        },
        error: (error) => {
          this.state = {
            ...this.state,
            loading: false,
            error: error.message,
          };
          this.state$.next(this.state);
          resolve(false);
        },
      });
    });
  }

  setActiveStream(id) {
    if (this.state.loading) {
      return;
    }
    const activeStream = this.state.streams.find((stream) => stream.id === id);
    this.state = { ...this.state, activeStream };
    this.state$.next(this.state);
  }

  async startUserMedia() {
    try {
      const captureOptions = {
        audio: false,
      };

      const captureStream = await navigator.mediaDevices.getDisplayMedia(
        captureOptions
      );
      document.getElementById('video').srcObject = captureStream;
      this.state = { ...this.state, userMedia: captureStream };
      this.state$.next(this.state);
    } catch (e) {
      this.state = { ...this.state, userMedia: null };
      this.state$.next(this.state);
      console.error(e);
    }
  }
}

export default new StreamService();
