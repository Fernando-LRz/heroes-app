import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { PublicRoute } from '../../src/router/PublicRoute';
import { AuthContext } from '../../src/auth';

describe('<PublicRoute /> tests', () => {
    
    test('should render the children if the user is not authenticated', () => {

        const contextValue = {
            logged: false
        };
        
        render( 
            <AuthContext.Provider 
                value={ contextValue }
            >
                <PublicRoute>
                    <h1>Public route</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Public route') ).toBeTruthy();
    });

    test('should navigate to the marvel page if the user is authenticated', () => {
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Fernando',
                id: '123abc'
            }
        };
        
        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Public route</h1>
                            </PublicRoute>
                        }/>

                        <Route path='marvel' element={ <h1>Marvel page</h1> } />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Marvel page') ).toBeTruthy();
    });

});