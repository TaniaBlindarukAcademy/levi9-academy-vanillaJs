/**
 * Created by t.blindaruk on 11.11.16.
 */

var app = (function (api) {

    var userList = document.getElementById('userList');

    function showUsers(users) {
        for (let i = 0; i < users.length; ++i) {
            let userView = Object.create(UserViewModel);
            userView.init(users[i]).then(function (value) {
                userList.appendChild(userView.getUserBlock());
                console.log(i);
            }, function (error) {

            });
        }
    }

    var PublicApi = {
        userList: function () {
            api.getUsers()
                .then(function (users) {
                        showUsers(users);
                    },
                    function (error) {
                        alert(error);
                    });
        },
        init: function () {
            this.userList();
        }
    };

    return Object.create(PublicApi);
})(window.app.api);
