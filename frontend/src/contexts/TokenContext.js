import React from 'react';
import { useJwt } from 'react-jwt';

const TokenContext = React.createContext();

export function TokenProvider({ children }) {
	const token = localStorage.getItem('token');
	const { decodedToken } = useJwt(token);
	const [decoded, setDecoded] = React.useState({ data: '' });
	const [logged, setLogged] = React.useState(false);

	React.useEffect(() => {
		if (token && decodedToken) {
			setDecoded(decodedToken);
		}
	}, [decodedToken, token]);

	return (
		<TokenContext.Provider value={{ token, decoded, setLogged, logged }}>
			{children}
		</TokenContext.Provider>
	);
}

export const useToken = () => React.useContext(TokenContext);
