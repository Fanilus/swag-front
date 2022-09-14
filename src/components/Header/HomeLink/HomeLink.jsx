import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledHomeLink } from './styled';

const HomeLink = ({ color, visible }) => {
	const navigate = useNavigate();

	return (
		<StyledHomeLink
			href="#"
			onClick={() => navigate('/depositors')}
			color={color}
			visible={visible}
		>
			Home
		</StyledHomeLink>
	);
};

export default HomeLink;
