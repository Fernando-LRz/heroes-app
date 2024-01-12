import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { SearchPage } from '../../../src/heroes';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('<SearchPage /> tests', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should render the page correctly with default values', () => {
        
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();
    });

    test('should render Batman and set the input with the value from the query string', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');

        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');

        const alert = screen.getByLabelText('alert-danger');
        expect( alert.style.display ).toBe('none');
    });

    test('should display an error if the hero (batman123) does not exist', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const alert = screen.getByLabelText('alert-danger');
        expect( alert.style.display ).toBe('');
    });

    test('should call navigate and redirect to the new page', () => {
        
        const inputValue = 'superman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change( input, { target: { name: 'searchText', value: inputValue } });
        
        const form = screen.getByRole('form');
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`);
    });

});