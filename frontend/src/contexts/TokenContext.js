import React from 'react';
import { useJwt } from 'react-jwt';

const TokenContext = React.createContext();

export function TokenProvider({ children }) {
	const [tokens, setToken] = React.useState('');
	const token = localStorage.getItem('token');
	const { decodedToken } = useJwt(token);
	const [decoded, setDecoded] = React.useState({ data: '' });

	React.useEffect(() => {
		if (token && decodedToken) {
			setDecoded(decodedToken);
		}
	}, [decodedToken, tokens, token]);

	return (
		<TokenContext.Provider value={{ token, setToken, decoded }}>
			{children}
		</TokenContext.Provider>
	);
}

export const useToken = () => React.useContext(TokenContext);
