/**
 * Created by xionghuan on 3/2/18.
 * Acquiring Service
 */


var axios = require('axios')
var requestHelper = require("./requestHelper");
var path_getToken = "/api/v1/authentication/login"
var path_createPayment = "/api/v1/payments/"

var baseUrl = require("../testconfigs/config").config.baseURL;

var account = require("../testconfigs/config.json").endpoints.Wechat.account

function getToken(){
    var instance = axios.create({
        baseURL: baseUrl,
        timeout: 15000,
        headers: {
            'x-api-key': account.apiKey,
            'x-client-id' : account.clientId
        }
    });
    console.log(">>> hitting getToken api...  " )
    return instance.get(path_getToken);
}
exports.getToken = getToken

function getAuthorization(){
    var token
    getToken().then(
        res=>{
            token= res.data.token

        }
    )
    return token

}
exports.getAuthorization = getAuthorization


function createPayment(token,request){

    var instance = axios.create({
        baseURL: baseUrl,
        timeout: 15000,
        headers: {
            'Authorization': token
        }
    });
    console.log(">>> request : " + JSON.stringify(request,null,2))
    return instance.post(path_createPayment, request);
}
exports.createPayment = createPayment;
