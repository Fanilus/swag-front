import { Subject } from 'rxjs';

class MessageDialogService {
	initialState = {
		show: false,
		message: '',
		header: '',
		type: '',
	};

	state$ = new Subject(this.initialState);

	show(message, header = 'Attention') {
		this.state$.next({
			...this.initialState,
			show: true,
			message,
			type: 'attention',
			header,
		});
	}

	hide() {
		this.state$.next({
			...this.initialState,
			show: false,
		});
	}

	showError(message, header = 'Error') {
		this.state$.next({
			...this.initialState,
			show: true,
			message,
			type: 'error',
			header,
		});
	}

	showWarning(message, header = 'Warning') {
		this.state$.next({
			...this.initialState,
			show: true,
			message,
			type: 'warning',
			header,
		});
	}

	showSuccess(message, header = 'Success') {
		this.state$.next({
			...this.initialState,
			show: true,
			message,
			type: 'success',
			header,
		});
	}
}

export default new MessageDialogService();
