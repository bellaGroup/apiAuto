/**
 * Created by xionghuan on 2/2/18.
 */


function timeOut(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
};

exports.timeOut = timeOut