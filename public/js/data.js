
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
}

    export {Data};