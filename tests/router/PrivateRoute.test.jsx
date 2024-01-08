import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { PrivateRoute } from '../../src/router/PrivateRoute';
import { AuthContext } from '../../src/auth';

describe('<PrivateRoute /> tests', () => {

    test('should render the children if the user is authenticated', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                name: 'Fernando',
                id: '123abc'
            }
        };
        
        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Private route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Private route') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath','/search?q=batman');
    });
})