/**
 * Created by xionghuan on 8/7/17.
 */

var axios =require("axios");
var lodash = require("lodash");


let ClientApiClient;




var defaultHeader;
exports.defaultHeader = {
    "content-type": "application/json"
}

exports.configure=clientApiUrl=>{
    ClientApiClient=axios.create({
    baseURL : clientApiUrl,
    headers : defaultHeader
});

// apiClient.interceptors.request.use(
//     request=>{
//
//          request.headers["Authorization"] = `Bearer ${clientApiToken}`
//
//         return request;
//     }
// )


}

exports.ClientApiClient=ClientApiClient;



