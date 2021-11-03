import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
const renderWithRouter = (
	component,
	{
		route = '/',
		history = createMemoryHistory({ initialEntries: [route] }),
	} = {}
) => {
	return {
		...render(<Router history={history}>{component}</Router>),
		history,
	};
};
export default renderWithRouter;
