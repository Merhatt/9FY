
import {Requester} from 'requester'
import {KINVEY} from 'constants'
import 'jquery'
import {Validator} from 'validator'

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