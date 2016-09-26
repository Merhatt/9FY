class spotify {
    static _getSecretToken() {
        return new Promise((resolve, reject) => {
            //Implement it
            let token;

            resolve(token);
        });
    }

    static freshMusic() {
        let url = 'https://api.spotify.com/v1/browse/new-releases';
        return new Promise((resolve, reject) => {
            spotify._getSecretToken.then((token) => {
                $.ajax({
                    type: 'GET',
                    url: url,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + token);
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