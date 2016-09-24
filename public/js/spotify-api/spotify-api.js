class getMusic {
    static freshMusic() {
        $.ajax({
            type: 'GET',
            url: 'https://accounts.spotify.com/authorize/?client_id=29aa5ede1ed34306ba232a64f1ff10c1&response_type=code&redirect_uri=http://127.0.0.1:8080',
            success: function(data) {
                console.log('succes');
            },
            error: function(err) {}
        });
        let url = 'https://api.spotify.com/v1/browse/new-releases';
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


export { getMusic };
//getMusic.searchArtist('krisko').then((data) => { console.log(data); });