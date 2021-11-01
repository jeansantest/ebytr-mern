import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { TokenProvider } from './contexts/TokenContext';
import './App.css';

function App() {
	return (
		<TokenProvider>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Register} />
			</Switch>
		</TokenProvider>
	);
}

export default App;
