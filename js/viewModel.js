/**
 * Created by tania on 10.11.16.
 */

(function (api) {
    var ViewModel = {
        readPartial: function (file) {
            return new Promise(
                function (resolve, reject) {
                    var rawFile = new XMLHttpRequest();
                    rawFile.open("GET", file, false);
                    rawFile.onreadystatechange = function () {
                        if (rawFile.readyState === 4) {
                            if (rawFile.status === 200 || rawFile.status == 0) {
                                resolve(rawFile.responseText);
                            } else {
                                reject(`${rawFile.status} ${rawFile.statusText}`);
                            }
                        }
                    };
                    rawFile.send(null);
                }
            );
        }
    };

    var PublicApi = Object.create(ViewModel);

    PublicApi.userList = function () {
        var self = this;
        api.getUsers()
            .then(function (users) {
                self.readPartial('partial/userIntro.html')
                    .then(function (partialHtml) {
                        var userList = document.getElementById('userList');
                        for(let i = 0;i<users.length; ++i) {
                            var html1 = document.createElement('BODY');
                            html1.innerHTML = partialHtml;
                            html1.getElementsByClassName('title')[0].innerHTML = users[i]['login'];
                            html1.getElementsByClassName('card-img-top')[0].src = users[i]['avatar_url'];
                            users[i]['site_admin'] ? html1.getElementsByClassName('admin')[0].innerHTML = "Admin" : null;
                            debugger;
                            userList.innerHTML += html1.innerHTML;
                        }
                    });
            });
    };

    var publicApi = Object.create(PublicApi);

    publicApi.userList();

    return publicApi;

})(window.app.api);