/**
 * Created by t.blindaruk on 11.11.16.
 */

var UserViewModel = (function (viewModel, api) {

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
            return true;
        } else {
            element.classList.add(className);
            return false;
        }
    }

    function appendLinks(self, linksBlockClass, callback) {
        var user = self.user;
        var followersListElement = self.userBlock.getElementsByClassName(linksBlockClass)[0];
        callback(user).then(function (followers) {
            debugger;
            for (let i = 0; i < followers.length; ++i) {

                var url = followers[i]['html_url'];
                url = url ? url : followers[i]['git_url'];
                url = url ? url : followers[i]['url'];

                var name = followers[i]['login'];
                name = name ? name : followers[i]['full_name'];

                var followerElement = document.createElement('A');
                followerElement.innerHTML = name;
                followerElement.href = url;
                followerElement.setAttribute('target', '_blank');
                followerElement.classList.add('list-group-item');
                followersListElement.appendChild(followerElement);

            }
        }, function (error) {

        })
    }

    var PublicApi = Object.create(viewModel);

    PublicApi.init = function (user) {
        var self = this;
        self.user = user;
        self.htmlDocument = false;
        return new Promise(function (resolve, reject) {
            self.readPartial('partial/user.html')
                .then(function (htmlText) {

                    var html = document.createElement('BODY');
                    html.innerHTML = htmlText;
                    self.htmlDocument = html;

                    showUser(html, self.user);
                    self.onClickHead(self.getUserBlock());

                    resolve(true);
                }, function (error) {
                    reject(error);
                    alert(error);
                });
        })
    };

    PublicApi.getUserBlock = function (document, number) {
        if (!this.userBlock) {
            document = document ? document : this.htmlDocument;
            number = number ? number : 0;
            this.userBlock = document.getElementsByClassName('panel-user')[number];
        }

        return this.userBlock;
    };

    PublicApi.onClickHead = function (element) {
        var self = this;
        element = element.getElementsByClassName('panel-user-heading')[0];
        element.onclick = function () {
            var show = self.toggleBody(element);
            if (show && !self.isUserLoaded) {
                api.getUser(self.user).then(function (val) {
                    self.user = val;

                    self.appendUserName();
                    self.appendUserEmail();
                    self.appendUserFollowers();
                    self.appendUserFollowings();
                    self.appendUserStarred();
                    self.appendUserSubscription();
                    self.appendUserOrganization();
                    self.appendUserRepos();

                    self.isUserLoaded = false;

                }, function (error) {

                });
            }
        };
    };

    PublicApi.toggleBody = function (element) {
        return toggle(element.nextElementSibling);
    };

    PublicApi.appendUserName = function (user) {
        this.userBlock.getElementsByClassName('user-name')[0].innerHTML = this.user['name'];

    };

    PublicApi.appendUserEmail = function (user) {
        var emailElement = this.userBlock.getElementsByClassName('user-email')[0];
        var email = this.user['email'];
        if (email) {
            emailElement.innerHTML = `(${email})`;
            emailElement.href = `mailto:${email}`;
        }
    };

    PublicApi.appendUserFollowers = function () {
        appendLinks(this, 'follower-links', api.getUserFollowers);
    };

    PublicApi.appendUserFollowings = function () {
        appendLinks(this, 'followings-links', api.getUserFollowings);
    };

    PublicApi.appendUserStarred = function () {
        appendLinks(this, 'starred-links', api.getUserStarred);
    };

    PublicApi.appendUserSubscription = function () {
        appendLinks(this, 'subscription-links', api.getUserSubscriptions);
    };

    PublicApi.appendUserOrganization = function () {
        appendLinks(this, 'organization-links', api.getUserOrganizations);
    };

    PublicApi.appendUserRepos = function () {
        appendLinks(this, 'repos-links', api.getUserRepos)
    };

    return PublicApi;
})(window.app.viewModel, window.app.api);
