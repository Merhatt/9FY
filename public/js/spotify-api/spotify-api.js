class spotify {
    static _getSecretToken() {
        return new Promise((resolve, reject) => {
            //Implement it
            let url = '';

            let appId = '29aa5ede1ed34306ba232a64f1ff10c1';
            let appSecret = '8c3bf398c3cf4ae9ae6a7edbe7cf25d0';

            let authorization = btoa(`${appId}:${appSecret}`);

            let headers = {
                'Authorization': `Basic ${authorization}`,
                'ContentType': 'application/json'
            };

            let data = {
                grant_type: 'client_credentials'
            }

            $.ajax({
                url: url,
                method: 'post',
                contentType: 'application/json',
                headers: headers,
                data: JSON.stringify(data),
                success: function(res) {
                    resolve(res);
                },
                error: function(err) {
                    reject(err);
                }

            })
        });
    }

    static freshMusic() {
        let url = 'https://api.spotify.com/v1/browse/new-releases';
        return new Promise((resolve, reject) => {
            spotify._getSecretToken()
                .then((token) => {
                    $.ajax({
                        type: 'GET',
                        url: url,
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("Authorization", "Bearer " + token);
                        },
                        success: function(data) {
                            resolve(data);
                        },
                        error: function(err) {
                            reject(err);
                        }
                    });
                });
        });
    }

    static searchArtist(name) {
        let url = 'https://api.spotify.com/v1/search?q= ' + name + ' &type=artist';
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    resolve(data);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }
}


export { spotify };