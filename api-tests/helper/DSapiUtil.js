/**
 * Created by xionghuan on 8/14/17.
 * Disbursement service
 */


var axios = require('axios')
var requestHelper = require("./requestHelper");
var path_disb = "/disbursement"
var path_rate = "fx_rate"
var path_infoV = "/info_validation"

var baseUrl = require("../testconfigs/config").config.baseURL;

function createDisbursement(payload){
    var request = {
        "jsonrpc": "2.0",
        "method": "create",
        "id": 3,
        "params": {
            "request":{}
        }
    }
    payload=requestHelper.initRequest(payload);
    var instance = axios.create({
        baseURL: baseUrl,
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });
    request.params.request=payload;
    console.log(">>> request : " + JSON.stringify(request,null,2))
    return instance.post(path_disb, request);
}
exports.createDisbursement = createDisbursement;


function queryDisbursement(disbId){
    var payload = require("../data/payload/common/disbursementQueryRequest.json");
    payload.params.reference = disbId;

    var instance = axios.create({
        baseURL : baseUrl,
        timeout: 15000
    });
    console.log(">>> request : " + JSON.stringify(payload,null,2))
    return instance.post(path_disb, payload)
}
exports.queryDisbursement = queryDisbursement;


function cancelDisbursement(disbId){
    var payload = require("../data/payload/common/disbursementCancelRequest.json");
    payload.params.reference = disbId;

    var instance = axios.create({
        baseURL : baseUrl,
        timeout: 15000
    });
    console.log(">>> request : " + JSON.stringify(payload,null,2))
    return instance.post(path_disb, payload)
}
exports.cancelDisbursement = cancelDisbursement;


function queryFXRate(currencyPair){
    var payload = require("../data/payload/common/FXRateRequest.json");
    payload.params.currencyPair = currencyPair;

    var instance = axios.create({
        baseURL : baseUrl,
        timeout: 15000
    });
    console.log(">>> request : " + JSON.stringify(payload,null,2))
    return instance.post(path_rate, payload)
}
exports.queryFXRate = queryFXRate;



function infoValidation(payload){
    var request = {
        "jsonrpc": "2.0",
        "method": "probeBankCard",
        "id": 3,
        "params": {
            "request":{}
        }
    }

    var instance = axios.create({
        baseURL : baseUrl,
        timeout: 15000
    });
    request.params.request=payload;
    console.log(">>> request : " + JSON.stringify(request,null,2))
    return instance.post(path_infoV, request)
}
exports.infoValidation = infoValidation;