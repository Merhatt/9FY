import toastr from 'toastr';
class Validator {
    static validateUser(user) {
        var re = /^[a-zA-Z0-9 ]{2,30}$/;
        if (!(re.test(user))) {
           return false;
        }

        return true;
    }

    static validatePassword(password) {
        var re = /^[A-Za-z0-9]\w{5,15}$/;
        if (!(re.test(password))) {
            return false;
        }
        return true;
    }

    static validateEmail(email) {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        //anystring@anystring.anystring' -> true, 'name@again@example.com' -> false
        if (!(re.test(email))) {
          return false;
        }
        return true;

    }

}
export { Validator };