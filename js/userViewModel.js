/**
 * Created by t.blindaruk on 11.11.16.
 */

var UserViewModel = (function (viewModel) {

    function showUser(userPartialView, user) {
        userPartialView.getElementsByClassName('title')[0].innerHTML = user['login'];
        userPartialView.getElementsByClassName('card-img-top')[0].src = user['avatar_url'];
        userPartialView.getElementsByClassName('panel')[0].setAttribute('data-id', user['id']);
        user['site_admin'] ? userPartialView.getElementsByClassName('admin')[0].innerHTML = "Admin" : null;
    }

    function toggle(element) {
        var className = 'hidden';
        var hasClass = element.classList.contains(className);
        if (hasClass === true) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    }

    var PublicApi = Object.create(viewModel);

    PublicApi.init = function (user) {
        var self = this;
        self.user = user;
        self.htmlText = '';
        return new Promise(function (resolve, reject) {
            self.readPartial('partial/user.html')
                .then(function (htmlText) {
                    var html = document.createElement('BODY');
                    html.innerHTML = htmlText;
                    self.htmlDocument = html;
                    self.htmlText = showUser(html, self.user);
                    var headPanel = html.getElementsByClassName('panel-user-heading');
                    headPanel.onclick = function () {
                        self.toggleBody(html.getElementsByClassName('panel-user-body'));
                    };
                    resolve(true);
                }, function (error) {
                    reject(error);
                    alert(error);
                });
        })
    };

    PublicApi.getElement = function () {
        return this.htmlDocument.getElementsByClassName('panel-user')[0];
    };

    PublicApi.toggleBody = function (element) {
        toggle(element.nextElementSibling);
    };

    return PublicApi;
})(window.app.viewModel);
