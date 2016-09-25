/// <reference path="../../../jquery.d.ts"/>
import 'jquery'

function send(method, url, options) {
    options = options || {};

    let headers = options.headers || {};
    let data = options.data || undefined;

    let promise = new Promise((resolve, reject)=> {
        $.ajax({
            url : url,
            method: method,
            contentType: 'application/json',
            headers: headers,
            data: JSON.stringify(data),
            success: function (res) {
                resolve(res)
            },
            error: function (err) {
                reject(err)
            }
            
        })
    })

    return promise;
}

class Requester{
   static get(url, options){
        return send('GET', url, options)
    }

   static post(url, options ){
        return send('POST', url, options)
    }

  static  put(url, options){
        return send('PUT', url, options)
    }
}

export {Requester};