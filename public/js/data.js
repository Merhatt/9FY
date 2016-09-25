
import {Requester} from 'requester'
import {KINVEY} from 'constants'
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
            email: user.email
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



    static getCurrentUser() {
        var username = localStorage.getItem('username');
        if (!username) {
            return null;
        }

        return username;
    }
}
export {Data};