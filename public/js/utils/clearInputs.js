import 'jquery'

class Cleaner {

static cleanInputs(...inputs){
    inputs.forEach(x=> x.val(''));
}
}

export {Cleaner};