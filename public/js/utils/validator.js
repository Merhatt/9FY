class Validator {
    static validateUser(user){
        if (typeof user !== 'string') {
            throw new Error('User must be a text!');
        }
        if (typeof user === undefined) {
            throw new Error('Must be a some text!');
        }
        if (!user) {
            throw new Error('It must be a not empty text!');
        }
        if (user.length < 3 || user.length > 20) {
            throw new Error('Username must be between 3 and 20 characters!');
        }
    }
    static validatePassword(password){
        if (typeof password === undefined) {
            throw new Error('You must write your password!');
        }
        if (!password) {
            throw new Error('You must write your password!');
        }
    }
}
export { Validator };