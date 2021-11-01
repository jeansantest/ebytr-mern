import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AllTodos from './pages/AllTodos';
import { TokenProvider } from './contexts/TokenContext';
import { TodoProvider } from './contexts/TodoContext';
import './App.css';

function App() {
	return (
		<TokenProvider>
			<TodoProvider>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Register} />
					<Route exact path="/all-tasks" component={AllTodos} />
				</Switch>
			</TodoProvider>
		</TokenProvider>
	);
}

export default App;
