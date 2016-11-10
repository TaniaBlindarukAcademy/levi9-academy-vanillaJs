/**
 * Created by tania on 10.11.16.
 */

window.app.api = (function () {
    var publicApi = {
        getUsers: function () {
            return new Promise(function (resolve, reject) {
                var url = 'https://api.github.com/users';
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = () => {
                    if (xmlHttp.readyState === XMLHttpRequest.DONE) {
                        if (xmlHttp.status !== 200) {
                            reject(`${xmlHttp.status} ${xmlHttp.statusText}`);
                        } else {
                            resolve(JSON.parse(xmlHttp.responseText));
                        }
                    }
                }
                xmlHttp.open("GET", url, true);
                xmlHttp.send();
            });
        },
        getUser: function (userId) {
            return new Promise(function (resolve, reject) {
                var url = 'https://api.github.com/user';
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = () => {
                    if (xmlHttp.readyState === XMLHttpRequest.DONE) {
                        if (xmlHttp.status !== 200) {
                            reject(`${xmlHttp.status} ${xmlHttp.statusText}`);
                        } else {
                            resolve(JSON.parse(xmlHttp.responseText));
                        }
                    }
                }
                xmlHttp.open("GET", url, true);
                xmlHttp.send();
            });
        }
    };

    return publicApi;
})();