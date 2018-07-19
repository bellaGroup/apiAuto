/**
 * Created by xionghuan on 8/11/17.
 */

var Guid = require("guid")

function requestReplace(payload, subJson){
    var uid = Guid.create().value;
    payload.params.request.reference = uid;
    payload.params.request.uniqueRequestId = uid;

    for(key in subJson){
        var k = key.toString();
        payload.params.request[k] = subJson[key];
    }
    console.log("replaced payload is : " + JSON.stringify(payload));
    return payload;
}

function initRequest(payload){
    var uid = Guid.create().value;
    payload.reference = uid;
    payload.uniqueRequestId = uid;
    return payload;
}

exports.requestReplace = requestReplace;
exports.initRequest = initRequest;




