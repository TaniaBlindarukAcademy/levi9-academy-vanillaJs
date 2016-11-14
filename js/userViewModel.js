/**
 * Created by t.blindaruk on 11.11.16.
 */

var UserViewModel = (function (viewModel, api) {
    function showUser(userPartialView, user) {
        userPartialView.getElementsByClassName('login')[0].innerHTML = user['login'];
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

    function appendLinks(self, linksBlockClass, callback, urlParam, nameParam) {
        var user = self.user;
        var followersListElement = self.userBlock.getElementsByClassName(linksBlockClass)[0];
        callback(user).then(function (values) {
            debugger;
            for (let i = 0; i < values.length; ++i) {
                var value = values[i];

                var url = urlParam ? value[urlParam] : value['html_url'];

                var name = nameParam ? value[nameParam] : value['login'];

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

    var UserViewModel = Object.create(viewModel);

    UserViewModel.init = function (user, templateOption) {
        var self = this;
        self.user = user;
        self.htmlDocument = false;
        self.initTemplateOption(templateOption);
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

    UserViewModel.initTemplateOption = function (templateOption) {
        this.templateOption = templateOption;
        if (!this.templateOption) {
            this.templateOption = {};
        }
        if (!this.templateOption.classNames) {
            this.templateOption.classNames = {};
        }
        if (!this.templateOption.classNames) {
            this.templateOption.classNames = {};
        }
        if (!this.templateOption.classNames['mainBlock']) {
            this.templateOption.classNames['mainBlock'] = 'panel-user';
        }
        if (!this.templateOption.classNames['headingBlock']) {
            this.templateOption.classNames['headingBlock'] = 'panel-user-heading';
        }
        if (!this.templateOption.classNames['userName']) {
            this.templateOption.classNames['userName'] = 'user-name';
        }
        if (!this.templateOption.classNames['userEmail']) {
            this.templateOption.classNames['userEmail'] = 'user-email';
        }
        if (!this.templateOption.classNames['followerLinks']) {
            this.templateOption.classNames['followerLinks'] = 'follower-links';
        }
        if (!this.templateOption.classNames['followingsLinks']) {
            this.templateOption.classNames['followingsLinks'] = 'followings-links';
        }
        if (!this.templateOption.classNames['starredLinks']) {
            this.templateOption.classNames['starredLinks'] = 'starred-links';
        }
        if (!this.templateOption.classNames['subscriptionLinks']) {
            this.templateOption.classNames['subscriptionLinks'] = 'subscription-links';
        }
        if (!this.templateOption.classNames['organizationLinks']) {
            this.templateOption.classNames['organizationLinks'] = 'organization-links';
        }
        if (!this.templateOption.classNames['reposLinks']) {
            this.templateOption.classNames['reposLinks'] = 'repos-links';
        }
        return this;
    };

    UserViewModel.getUserBlock = function (document, number) {
        if (!this.userBlock) {
            document = document ? document : this.htmlDocument;
            number = number ? number : 0;
            this.userBlock = document.getElementsByClassName(this.templateOption.classNames['mainBlock'])[number];
        }

        return this.userBlock;
    };

    UserViewModel.onClickHead = function (element) {
        var self = this;
        element = element.getElementsByClassName(self.templateOption.classNames['headingBlock'])[0];
        element.onclick = function () {
            var show = self.toggleBody(element);
            if (show && !self.isUserLoaded) {
                api.getUser(self.user).then(function (val) {
                    self.user = val;
                    self.addAdditionalInformation();
                    self.isUserLoaded = false;
                }, function (error) {

                });
            }
        };
    };

    UserViewModel.addAdditionalInformation = function () {
        this.appendUserName();
        this.appendUserEmail();
        this.appendUserFollowers();
        this.appendUserFollowings();
        this.appendUserStarred();
        this.appendUserSubscription();
        this.appendUserOrganization();
        this.appendUserRepos();
    };

    UserViewModel.toggleBody = function (element) {
        return toggle(element.nextElementSibling);
    };

    UserViewModel.appendUserName = function () {
        this.userBlock.getElementsByClassName(this.templateOption.classNames['userName'])[0].innerHTML = this.user['name'];

    };

    UserViewModel.appendUserEmail = function () {
        var emailElement = this.userBlock.getElementsByClassName(this.templateOption.classNames['userEmail'])[0];
        var email = this.user['email'];
        if (email) {
            emailElement.innerHTML = `(${email})`;
            emailElement.href = `mailto:${email}`;
        }
    };

    UserViewModel.appendUserFollowers = function () {
        appendLinks(this, this.templateOption.classNames['followerLinks'], api.getUserFollowers);
    };

    UserViewModel.appendUserFollowings = function () {
        appendLinks(this, this.templateOption.classNames['followingsLinks'], api.getUserFollowings);
    };

    UserViewModel.appendUserStarred = function () {
        appendLinks(this, this.templateOption.classNames['starredLinks'], api.getUserStarred, 'html_url', 'name');
    };

    UserViewModel.appendUserSubscription = function () {
        appendLinks(this, this.templateOption.classNames['subscriptionLinks'], api.getUserSubscriptions, 'html_url', 'name');
    };

    UserViewModel.appendUserOrganization = function () {
        appendLinks(this, this.templateOption.classNames['organizationLinks'], api.getUserOrganizations, 'url', 'login');
    };

    UserViewModel.appendUserRepos = function () {
        appendLinks(this, this.templateOption.classNames['reposLinks'], api.getUserRepos, 'html_url', 'full_name')
    };

    return UserViewModel;
})(window.app.viewModel, window.app.api);
