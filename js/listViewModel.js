/**
 * Created by t.blindaruk on 11.11.16.
 */

(function (viewModel, api) {

    var userList = document.getElementById('userList');

    function showUsers(users) {
        for (var i = 0; i < users.length; ++i) {
            let userView = Object.create(UserViewModel);
            userView.init(users[i]).then(function (value) {
                userList.innerHTML += userView.getHtml();
            }, function (error) {

            });
        }
    }

    var PublicApi = Object.create(viewModel);

    PublicApi.userList = function () {
        var self = this;
        api.getUsers()
            .then(function (users) {
                showUsers(users);
                self.readPartial('partial/user.html')
                    .then(function (partialHtml) {

                    });
            });
    };

    PublicApi.init = function () {
        this.userList();
    };

    var publicApi = Object.create(PublicApi);

    publicApi.init();

    return publicApi;
})(window.app.viewModel, window.app.api);
