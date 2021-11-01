import React from 'react';

const TokenContext = React.createContext();

export function TokenProvider({ children }) {
	const [token, setToken] = React.useState('');

	return (
		<TokenContext.Provider value={{ token, setToken }}>
			{children}
		</TokenContext.Provider>
	);
}

export const useToken = () => React.useContext(TokenContext);
