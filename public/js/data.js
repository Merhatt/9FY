
import {Requester} from 'requester'
import {KINVEY} from 'constants'
import 'jquery'
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
class Data {
    static register(user) {
        let url = `https://baas.kinvey.com/user/${KINVEY.appId}/`;
        let authorization = btoa(`${KINVEY.appId}:${KINVEY.appSecret}`);

        let headers = {
            'Authorization': `Basic ${authorization}`,
            'ContentType': 'application/json'
        };

        let userToBeRegistered = {
            username: user.username,
            password: user.password,
            email: user.email,
            favs: user.favs
        }
        return Requester.post(url, {
            headers: headers,
            data: userToBeRegistered
        })
    }

    static login(user) {
        let url = `https://baas.kinvey.com/user/${KINVEY.appId}/login`;
        let authorization = btoa(`${KINVEY.appId}:${KINVEY.appSecret}`);

        let headers = {
            'Authorization': `Basic ${authorization}`,
            'ContentType': 'application/json'
        };

        return Requester.post(url, {
            headers: headers,
            data: user
        })
    }

    static getNews(){
        let url = 'http://content.guardianapis.com/search?show-elements=all&page-size=20&q=music&api-key=e1abba4c-6002-4f52-8511-2e2a5c3167ac';
        return Requester.get(url);
    }



    static getCurrentUser() {
        var username = localStorage.getItem('username');
        if (!username) {
            return null;
        }

        return username;
    }

    static getFresh(){
        let url = 'https://freemusicarchive.org/recent.json';
        
        
    }
}
export {Data};