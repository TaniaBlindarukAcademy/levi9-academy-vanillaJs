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
            var userUrl = `https://api.github.com/user/${user['id']}`;
            return sendRequest(userUrl);
        },
        getUserFollowers: function (user) {
            var followers_url = user['followers_url'];
            return getUserLinks(followers_url);
        },
        getUserFollowings: function (user) {
            var followings_url = `https://api.github.com/users/${user['login']}/following`;
            return getUserLinks(followings_url);
        },
        getUserStarred: function (user) {
            var starred_url = `https://api.github.com/users/${user['login']}/starred`;
            return getUserLinks(starred_url);
        },
        getUserSubscriptions: function (user) {
            var subscription_url = user['subscriptions_url'];
            return getUserLinks(subscription_url);
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