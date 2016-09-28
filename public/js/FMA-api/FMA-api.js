import { FMA } from 'constants';

function setDomainName(url, domainToSet) {
    if (url.indexOf('http') < 0) {
        url = domainToSet + url;
    }

    return url;
}

function setStrLength(str, length) {
    if (str.length >= length) {
        str = str.slice(0, length) + '...';
    }

    return str;
}

class FreeMusicArchive {
    static getHot() {
        return new Promise((resolve, reject) => {
            let url = 'https://freemusicarchive.org/featured.json';
            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    let parsedData = JSON.parse(data);
                    let finalData = {
                        title: 'Hot',
                        songs: parsedData.aTracks
                    };

                    for (let i = 0; i < finalData.songs.length; i += 1) {
                        finalData.songs[i].track_image_file = setDomainName(finalData.songs[i].track_image_file, 'https://freemusicarchive.org/file/');
                        finalData.songs[i].track_title = setStrLength(finalData.songs[i].track_title, 29);
                    }

                    resolve(finalData);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }

    static getTrending() {
        return new Promise((resolve, reject) => {
            let url = 'https://freemusicarchive.org/featured.json';
            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    let parsedData = JSON.parse(data);
                    parsedData.aTracks = parsedData.aTracks.reverse();
                    let finalData = {
                        title: 'Trending',
                        songs: parsedData.aTracks
                    };

                    for (let i = 0; i < finalData.songs.length; i += 1) {
                        finalData.songs[i].track_image_file = setDomainName(finalData.songs[i].track_image_file, 'https://freemusicarchive.org/file/');
                        finalData.songs[i].track_title = setStrLength(finalData.songs[i].track_title, 29);
                    }

                    resolve(finalData);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }

    static getFresh() {
        return new Promise((resolve, reject) => {
            let url = 'https://freemusicarchive.org/recent.json';

            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    let parsedData = JSON.parse(data);
                    let finalData = {
                        title: 'Fresh',
                        songs: parsedData.aTracks
                    };

                    for (let i = 0; i < finalData.songs.length; i += 1) {
                        finalData.songs[i].track_image_file = setDomainName(finalData.songs[i].track_image_file, 'https://freemusicarchive.org/file/');
                        finalData.songs[i].track_title = setStrLength(finalData.songs[i].track_title, 29);
                    }

                    resolve(finalData);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }

    static searchArtistByName(name, maxResultCount) {
        return new Promise((resolve, reject) => {
            let url = 'https://freemusicarchive.org/api/trackSearch?q=' + name + '&limit=' + maxResultCount;

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