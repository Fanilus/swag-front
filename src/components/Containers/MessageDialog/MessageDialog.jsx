import React, { useEffect, useState } from 'react';
import MessageDialogService from '../../../services/message-dialog.service';
import {
	MessageDialogWrapper,
	MessageDialogBlur,
	MessageDialogCardWrapper,
	DialogMessage,
} from './styled';
import { Card, CardFooter, CardBody, CardHeader } from './styled';
import { Button } from '../../Buttons/Button/styled';

import { WarningIcon } from '../../Icons/WarningIcon';
import { ErrorIcon } from '../../Icons/ErrorIcon';
import { SuccessIcon } from '../../Icons/SuccessIcon';

const MessageDialog = () => {
	const [dialog, setDialog] = useState({
		show: false,
	});
	const [icon, setIcon] = useState(null);

	const recognizeIcon = (type) => {
		switch (type) {
			case 'success':
				setIcon(SuccessIcon);
				break;
			case 'warning':
				setIcon(WarningIcon);
				break;
			case 'error':
				setIcon(ErrorIcon);
				break;
			default:
				setIcon(null);
				break;
		}
	};

	useEffect(() => {
		const state$ = MessageDialogService.state$.subscribe((state) => {
			setDialog(state);
		});

		return () => {
			state$.unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (dialog) {
			recognizeIcon(dialog.type);
			setTimeout(() => {
				document.body.style.overflowY = dialog.show ? 'hidden' : 'auto';
			});
		}

		return () => {
			document.body.style.overflowY = 'auto';
		};
	}, [dialog]);

	return (
		<>
			<MessageDialogWrapper show={dialog.show}>
				<MessageDialogBlur
					onClick={() => MessageDialogService.hide()}
				/>
				<MessageDialogCardWrapper>
					<Card shadow={true}>
						<CardHeader>{dialog.header}</CardHeader>
						<CardBody>
							<div>{icon}</div>
							<DialogMessage>{dialog.message}</DialogMessage>
						</CardBody>
						<CardFooter>
							<Button onClick={() => MessageDialogService.hide()}>
								Close
							</Button>
						</CardFooter>
					</Card>
				</MessageDialogCardWrapper>
			</MessageDialogWrapper>
		</>
	);
};

export default MessageDialog;
