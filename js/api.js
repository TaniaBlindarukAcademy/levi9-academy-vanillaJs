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

    function getUserLinks(url) {
        return sendRequest(url);
    }

    var publicApi = {
        getUsers: function () {
            return sendRequest('https://api.github.com/users');
        },
        getUser: function (user) {
            return sendRequest(`https://api.github.com/user/${user['id']}`);
        },
        getUserFollowers: function (user) {
            return getUserLinks(user['followers_url']);
        },
        getUserFollowings: function (user) {
            return getUserLinks(`https://api.github.com/users/${user['login']}/following`);
        },
        getUserStarred: function (user) {
            return getUserLinks(`https://api.github.com/users/${user['login']}/starred`);
        },
        getUserSubscriptions: function (user) {
            return getUserLinks(user['subscriptions_url']);
        },
        getUserOrganizations: function (user) {
            return getUserLinks(user['organizations_url']);
        },
        getUserRepos: function (user) {
            return getUserLinks(user['repos_url']);
        }

    };

    return publicApi;
})();