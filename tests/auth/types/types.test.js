import { types } from '../../../src/auth';

describe('types tests', () => {
    
    test('should return the correct types', () => {
        
        expect( types ).toEqual({
            login: '[Auth] login',
            logout: '[Auth] logout'
        })
    });

});