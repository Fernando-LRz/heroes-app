import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../src/auth/context';
import { AppRouter } from '../../src/router/AppRouter';

describe('<AppRouter /> tests', () => {

    test('should render the login page if the user is not authenticated', () => {
    
        const contextValue = {
            logged: false
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider> 
            </MemoryRouter>
        );

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('should render the marvel page if the user is authenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Fernando',
                id: '123abc'
            }
        };

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider> 
            </MemoryRouter>
        );

        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);
    });

});