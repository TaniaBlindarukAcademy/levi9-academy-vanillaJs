/**
 * Created by tania on 10.11.16.
 */

window.app.viewModel = (function () {
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

    return ViewModel;
})();