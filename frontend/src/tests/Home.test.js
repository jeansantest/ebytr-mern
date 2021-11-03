import React from 'react';
import App from '../App';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { createMemoryHistory } from 'history';
import { LocalStorageMock } from '@react-mock/localstorage';
import { Router } from 'react-router-dom';

describe('Page Home', () => {
	it('Teste se a página contém as labels para login', () => {
		const { container } = renderWithRouter(<App />, { route: '/' });
		const h1Home = container.querySelector('h1');
		expect(h1Home.textContent).toContain(
			'Você precisa estar logado para poder criar uma task.'
		);
	});

	const renderComponent = ({ token }) => {
		return render(
			<LocalStorageMock items={{ token }}>
				<Router history={createMemoryHistory({ initialEntries: ['/'] })}>
					<App />
				</Router>
			</LocalStorageMock>
		);
	};

	it('Teste se existe paragrafo após o token no localStorage', () => {
		const { container } = renderComponent({
			token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjE4MTNiODJmMjhhMWMyMjMxN2RkMDdlIiwibmFtZSI6ImplYW4iLCJlbWFpbCI6ImplYW5AZ21haWwuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNjM1OTc0OTYzLCJleHAiOjE2MzY1Nzk3NjN9.-lBqVyOXEC560e3vTqIQ0yW5Dx43IBF3dvGzAzVJ9sQ',
		});

		const pHome = container.querySelector('p');
		expect(pHome.textContent).toContain('Carregando...');
	});

	it('Teste se existe um input de criação de todo', async () => {
		const { findByTestId } = renderComponent({
			token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjE4MTNiODJmMjhhMWMyMjMxN2RkMDdlIiwibmFtZSI6ImplYW4iLCJlbWFpbCI6ImplYW5AZ21haWwuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNjM1OTc0OTYzLCJleHAiOjE2MzY1Nzk3NjN9.-lBqVyOXEC560e3vTqIQ0yW5Dx43IBF3dvGzAzVJ9sQ',
		});

		const divTodoHome = await findByTestId('div-todo');
		expect(divTodoHome.textContent).toContain('Adicionar');
	});
});
