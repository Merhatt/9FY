import { FMA } from 'constants';

class FreeMusicArchive {
    static featuredPlaylist() {
        return new Promise((resolve, reject) => {
            let url = 'https://freemusicarchive.org/featured.json';

            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    resolve(JSON.parse(data));
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }

    static freshMusic() {
        return new Promise((resolve, reject) => {
            let url = 'https://freemusicarchive.org/recent.json';

            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    resolve(JSON.parse(data));
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }
}


export { FreeMusicArchive };