/**
 * Created by tania on 10.11.16.
 */

window.app.api = (function () {

    function sendRequest(url) {
        return new Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState === XMLHttpRequest.DONE) {
                    if (xmlHttp.status !== 200) {
                        reject(`${xmlHttp.status} ${xmlHttp.statusText}`);
                    } else {
                        resolve(JSON.parse(xmlHttp.responseText));
                    }
                }
            };
            xmlHttp.open("GET", url, true);
            xmlHttp.send();
        });
    }

    var publicApi = {
        getUsers: function () {
            return sendRequest('https://api.github.com/users');
        },
        getUser: function (userId) {
            return sendRequest('https://api.github.com/user');
        }
    };

    return publicApi;
})();