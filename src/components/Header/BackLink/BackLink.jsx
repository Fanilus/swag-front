import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledBackLink } from './styled';

const BackLink = ({ color, visible, url }) => {
	const navigate = useNavigate();

	return (
		<StyledBackLink
			onClick={() => navigate(url)}
			color={color}
			visible={visible}
		>
			Back
		</StyledBackLink>
	);
};

export default BackLink;
