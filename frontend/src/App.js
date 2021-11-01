import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import { TokenProvider } from './contexts/TokenContext';
import './App.css';

function App() {
	return (
		<TokenProvider>
			<Switch>
				<Route path="/login" component={Login} />
			</Switch>
		</TokenProvider>
	);
}

export default App;
