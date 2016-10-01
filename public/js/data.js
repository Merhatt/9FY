import { Requester } from 'requester'
import { KINVEY } from 'constants'
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

    static getNews() {
        let url = 'http://content.guardianapis.com/search?show-elements=all&page-size=10&q=music&api-key=e1abba4c-6002-4f52-8511-2e2a5c3167ac';
        return Requester.get(url);
    }

    static getCurrentUser() {
        var username = localStorage.getItem('username');
        if (!username) {
            return null;
        }

        return username;
    }

    static getUserData() {
            var userId = localStorage.getItem('userId');
            let url = `https://baas.kinvey.com/user/${KINVEY.appId}/${userId}`;
            let authorization = btoa(`${KINVEY.appId}:${KINVEY.appMaster}`);
            console.log(url)

            let headers = {
                'Authorization': `Basic ${authorization}`,
                'ContentType': 'application/json'
            };
         return   Requester.get(url,{
                headers
            })
        
    }

    static addFavorites(songs){
         var userId = localStorage.getItem('userId');
            let url = `https://baas.kinvey.com/user/${KINVEY.appId}/${userId}`;
            let authorization = btoa(`${KINVEY.appId}:${KINVEY.appMaster}`);

            let headers = {
                'Authorization': `Basic ${authorization}`,
                'ContentType': 'application/json'
            };

            let data = {
                favs: songs
            }

            return Requester.put(url,{
                headers,
                data
            });

    }

   
}
export { Data };
