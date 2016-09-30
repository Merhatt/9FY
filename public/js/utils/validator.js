import toastr from 'toastr';
class Validator {
    static validateUser(user) {
        var re = /^[a-zA-Z ]{2,30}$/;
        if (!(re.test(user))) {
           return false;
        }

        return true;
    }

    static validatePassword(password) {
        var re = /^[A-Za-z]\w{6,15}$/;
        if (!(re.test(password))) {
            return false;
        }
        return true;
    }

    static validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //anystring@anystring.anystring' -> true, 'name@again@example.com' -> false
        if (!(re.test(email))) {
          return false;
        }
        
    }

}
export { Validator };