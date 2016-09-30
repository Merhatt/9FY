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

function getSongId(text) {
    do {
        text = text.split('(');
        text = text[1];
    } while (text.indexOf('(') >= '0');

    let songId = text.split(')')[0];

    return songId;
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

    static search(name, maxResultCount) {
        return new Promise((resolve, reject) => {
            let url = 'https://freemusicarchive.org/api/trackSearch?q=' + name + '&limit=' + maxResultCount;

            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    data = JSON.parse(data);
                    let result = {
                        title: name,
                        songs: []
                    };

                    let promiseArray = [];

                    for (let i = 0; i < data.aRows.length; i += 1) {
                        let songId = getSongId(data.aRows[i]);

                        promiseArray.push(FreeMusicArchive.getSongBySongId(songId));
                    }

                    Promise.all(promiseArray)
                        .then((res) => {
                            res.forEach(s => {
                                if (s && s.track_image_file !== 'https://freemusicarchive.org/file/') {
                                    result.songs.push(s);
                                }
                            });
                            resolve(result);
                        });
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }

    static getSongBySongId(id) {
        return new Promise((resolve, reject) => {
            let url = 'https://freemusicarchive.org/api/get/tracks.json?api_key=' + FMA.key + '&track_id=' + id;

            $.ajax({
                type: 'GET',
                url: url,
                success: function(data) {
                    let song = JSON.parse(data).dataset[0];
                    if (song) {
                        song.track_image_file = setDomainName(song.track_image_file, 'https://freemusicarchive.org/file/');
                        song.track_title = setStrLength(song.track_title, 29);
                        song.track_file = setDomainName(song.track_file, 'https://freemusicarchive.org/file/');
                    }

                    resolve(song);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }
}


export { FreeMusicArchive };