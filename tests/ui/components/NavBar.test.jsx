import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../../src/auth/context';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('<NavBar /> tests', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'Fernando',
            id: '123abc'
        },
        logout: jest.fn()
    };

    beforeEach(() => jest.clearAllMocks());
    
    test('should display the name of the logged-in user', () => {

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Fernando') ).toBeTruthy();
    });

    test('should execute the logout function and the navigate when clicking the logout button', () => {

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click( logoutBtn );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', { replace: true });
    });

});