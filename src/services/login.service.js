import { from, Subject, take } from 'rxjs';
import ApiService from './api.service';

class LoginService {
  initialState = {
    loading: false,
    error: '',
    accessToken: '',
  };

  state = this.initialState;
  state$ = new Subject();

  login(login, password, address) {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.state,
      loading: true,
    };
    this.state$.next(this.state);

    const data$ = from(ApiService.login(login, password, address)).pipe(
      take(1)
    );

    data$.subscribe({
      next: (result) => {
        if (result.success) {
          window.localStorage.setItem('accessToken', result.data);
          this.state = {
            ...this.state,
            loading: false,
            accessToken: result.data,
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

  disconnect() {
    if (this.state.loading) {
      return;
    }

    window.localStorage.removeItem('accessToken');

    this.state = {
      ...this.state,
      accessToken: '',
    };
    this.state$.next(this.state);
  }
}

export default new LoginService();
