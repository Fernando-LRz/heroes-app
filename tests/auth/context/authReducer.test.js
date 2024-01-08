import { authReducer, types } from '../../../src/auth';

describe('authReducer tests', () => {

    test('should return the default state', () => {

        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual({ logged: false });
    });

    test('should set the user during login action', () => {
        
        const action = {
            type: types.login,
            payload: {
                name: 'Fernando',
                id: '123abc'
            }
        };

        const state = authReducer({ logged: false }, action);
        
        expect( state ).toEqual({
            logged: true,
            user: action.payload
        });
    });

    test('should unset the user during logout action', () => {
        
        const state = {
            logged: true,
            user: { id: '123abc', name: 'Fernando' }
        };

        const action = {
            type: types.logout
        };

        const newState = authReducer(state, action);
        expect( newState ).toEqual({ logged: false });
    });

});