/**
 * Created by xionghuan on 8/16/17.
 */

var expect = require('chai').expect;

const _payload = require("../../data/payload/BOS/disbursementCreateRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var IDGen = require("../../util/IDGen");
var disbHelper = require("../../helper/disbursementHelper");
var promiseDelay = require('promise-delay');
var deepCopy = require("jsprim").deepCopy;


var payload;

describe("BOS disbursement query : ", function(){
    beforeEach(() => {
        payload= deepCopy(_payload)
    });

    it("new account, sync mode, query disbursement 'Is processing' ", function(){
        var idNo = IDGen.getIdentityId();
        var cardId =
            "6216261000000000019"
        //IDGen.getBankCard().cardId;
        var firstName = "小一";
        var lastName = "胡";
        payload = disbHelper.fillBaseInfo(payload,idNo,cardId,firstName,lastName);
        var disbId;
        return apiUtil.createDisbursement(payload).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result.notes[0]).to.include("Forex transfer sucessfully, waiting for notification");
                expect(result.disbursementId).to.not.be.empty;
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE");
                 disbId = result.disbursementId;
            }
        ).then(
            function(){
               // var later =  promiseDelay(5000,false);
               //  // Promise.delay(3000)
               //  later.then(function(disbId){
                    return apiUtil.queryDisbursement(disbId).then(
                        res=> {
                            console.log(">>> response: " + JSON.stringify(res.data,null,2));
                            var result = res.data.result[1];
                            expect(result.notes[1]).to.include("Is processing");
                            expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE");
                        }
                    )
                // })
            }
        );
    })

    it("Query disbursement, indentityId format error. " , function(){
        var idNo = "01011981010";
        var cardId = "6216261000000000019";
        var firstName = "小一";
        var lastName = "胡";
        payload = disbHelper.fillBaseInfo(payload,idNo,cardId,firstName,lastName);
        var disbId;
        return apiUtil.createDisbursement(payload).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result.notes[1]).to.include("S72_0003:身份证: "+idNo+", 格式错误");
                expect(result.disbursementId).to.not.be.empty;
                expect(result.status).to.equal("ERROR_NOT_RECOVERABLE_NEED_OPS");
                disbId = result.disbursementId;
            }
        ).then(
            function(){
                return apiUtil.queryDisbursement(disbId).then(
                    res=> {
                        console.log(">>> response: " + JSON.stringify(res.data,null,2));
                        var result = res.data.result[1];
                        expect(result.notes[1]).to.include("S72_0003:身份证: "+idNo+", 格式错误");
                        expect(result.disbursementId).to.equal(disbId);
                        expect(result.status).to.equal("ERROR_NOT_RECOVERABLE_NEED_OPS");
                    },
                    err=> {
                        console.log(">>>call api failed! ")
                        throw err;
                    }
                )
            }
        );
    })

    it("Query disbursement status change from 'PENDING' to 'EXECUTING_NOT_CANCELABLE'" , function(){
        var idNo = "420101198101011224";
        var cardId = "6216261000000000019";
        var firstName = "小一";
        var lastName = "胡";
        payload = disbHelper.fillBaseInfo(payload,idNo,cardId,firstName,lastName);
        payload.rpcMode = "Async";
        var disbId;
        return apiUtil.createDisbursement(payload).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result.notes[0]).to.include("Pending to execute forex transfer");
                expect(result.disbursementId).to.not.be.empty;
                expect(result.status).to.equal("PENDING");
                disbId = result.disbursementId;
            }
        ).then(
            function(){
                return apiUtil.queryDisbursement(disbId).then(
                    res=> {
                        console.log(">>> response: " + JSON.stringify(res.data,null,2));
                        var result = res.data.result[1];
                        expect(result.notes[0]).to.include("Forex transfer sucessfully, waiting for notification");
                        expect(result.disbursementId).to.equal(disbId);
                        expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE");
                    },
                    err=> {
                        console.log(">>>call api failed! ")
                        throw err;
                    }
                )
            }
        );
    })

    it("disbId not exist in system", function(){
        var disbId = "8b27a150";
        return apiUtil.queryDisbursement(disbId).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                expect(res.data.result[0]).to.equal("left");
                expect(res.data.result[1].message).to.include("Disbursment does not exist for dibursmentid: "+disbId);
            },
            err => {
                console.log(">>>call api failed! ")
                throw err;
            })
    })

    it("Disbursment id is blank", function(){
        var disbId = "";
        return apiUtil.queryDisbursement(disbId).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                expect(res.data.result[0]).to.equal("left");
                expect(res.data.result[1].message).to.include("Disbursment id is blank");
            },
            err => {
                console.log(">>>call api failed! ")
                throw err;
            })
    })

})