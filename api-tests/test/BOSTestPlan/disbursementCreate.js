/**
 * Created by xionghuan on 8/11/17.
 */


var expect = require('chai').expect;

const _payload = require("../../data/payload/BOS/disbursementCreateRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var IDGen = require("../../util/IDGen");
var disbHelper = require("../../helper/disbursementHelper");
var deepCopy = require("jsprim").deepCopy;
var payload;

describe("BOS disbursement create, positive cases ： ", function(){

    beforeEach(() => {
        payload= deepCopy(_payload)
            //Object.assign({}, _payload)
    });

    it.only("new account, sync mode", function(){
        var idNo = //"420101198101014492";
        IDGen.getIdentityId();
        var cardId = "6216261000000000019";
        //IDGen.getBankCard().cardId;
        var firstName = "小二";
        var lastName = "胡";
        payload = disbHelper.fillBaseInfo(payload,idNo,cardId,firstName,lastName);
        payload.beneficiary.firstName = "huaide"
        return apiUtil.createDisbursement(payload).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result.notes[0]).to.include("Forex transfer sucessfully, waiting for notification");
                expect(result.notes[1]).to.include("Transfer serial number=");
                expect(result.disbursementId).to.not.be.empty;
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE");
                expect(result.sourceCurrencyCode).to.equal(payload.sourceCurrencyCode);
                expect(result.targetCurrencyCode).to.equal(payload.targetCurrencyCode);
            }
        )

    })


    it("new account, Async mode ", function(){
        var idNo = IDGen.getIdentityId();
        var cardId =
            "6216261000000000019"
        //IDGen.getBankCard().cardId;
        var firstName = "小一";
        var lastName = "胡";
        payload.rpcMode = "Async";
        payload = disbHelper.fillBaseInfo(payload,idNo,cardId,firstName,lastName);

        return apiUtil.createDisbursement(payload).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result.notes[0]).to.include("Pending to execute forex transfer");
                expect(result.disbursementId).to.not.be.empty;
                expect(result.status).to.equal("PENDING");
                expect(result.sourceCurrencyCode).to.equal(payload.sourceCurrencyCode);
                expect(result.targetCurrencyCode).to.equal(payload.targetCurrencyCode);
            },
            err => {
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("test create disbursement for existed account ", function(){
        var idNo = "420101198101011830"
        var cardId = "6228486571568990402"
        var firstName = "测";
        var lastName = "试三";
        payload = disbHelper.fillBaseInfo(payload,idNo,cardId,firstName,lastName);
        return apiUtil.createDisbursement(payload).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result.notes[0]).to.include("Forex transfer sucessfully");
                expect(result.reference).to.equal(payload.reference);
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE");
                expect(result.sourceCurrencyCode).to.equal(payload.sourceCurrencyCode);
                expect(result.targetCurrencyCode).to.equal(payload.targetCurrencyCode);
            },
            err => {
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("allow space at the front or end of 'fullAddress','firstName', 'lastName'", function(){
        var idNo = "441881199505017218";
        var cardId = "6222020903001483077"
        var firstName = "婷";
        var lastName = "李";
        payload = disbHelper.fillBaseInfo(payload,idNo,cardId,firstName,lastName);
        payload.payer.address.fullAddress = " TEST 地址 123：908 - 990 ";
        payload.payer.firstName = " first ";
        payload.payer.firstName = " last ";
        payload.beneficiary.firstName = " first ";
        payload.beneficiary.firstName = " last ";
        return apiUtil.createDisbursement(payload).then(
            res => {
                var result = res.data.result[1];
                expect(result.notes[0]).to.include("Forex transfer sucessfully");
                expect(result.reference).to.equal(payload.reference);
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE");
            },
            err => {
                console.log(">>>call api failed! ")
                throw(err)
            }
        )
    })

})



describe("BOS disbursement create api, negative case ： ", function(){

    beforeEach(() => {
        payload= deepCopy(_payload)
    });


    it("test idNo is invalid, api should return error", function(){

        var idNo = "420101198101011832"
        var cardId = "6228486571568990402"
        var firstName = "测";
        var lastName = "试三";
        payload = disbHelper.fillBaseInfo(payload,idNo,cardId,firstName,lastName);
        return apiUtil.createDisbursement(payload).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result.status).to.equal("ERROR_NOT_RECOVERABLE_NEED_OPS");
                expect(result.notes[1]).to.include("S72_0003:身份证: "+idNo+", 格式错误");
            },
            err => {
                console.log(">>>call api failed! ")
                throw(err)
            }
        )
    })

    it("test Beneficiary's bank account name does not equal to existing account name in system", function(){

        var idNo = "420101198101011830"
        var cardId = "6228486571568990402"
        var firstName = "错误";
        var lastName = "名";
        payload = disbHelper.fillBaseInfo(payload,idNo,cardId,firstName,lastName);
        return apiUtil.createDisbursement(payload).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result.status).to.equal("ERROR_NOT_RECOVERABLE_NEED_OPS");
                expect(result.notes[1]).to.include("Beneficiary's bank account name does not equal to existing account name in system");
            },
            err => {
                console.log(">>>call api failed! ")
                throw(err)
            }
        )
    })

    it("payerAirwallexId should be numeric", function(){

        var idNo = "441881199505017218";
        var cardId = "6222020903001483077"
        var firstName = "婷";
        var lastName = "李";
        payload = disbHelper.fillBaseInfo(payload,idNo,cardId,firstName,lastName);
        payload.variation.payerAirwallexId = "sbaodeID";
        return apiUtil.createDisbursement(payload).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result.message).to.include("PayerAirwallexId must be all digit value.");
            },
            err => {
                console.log(">>>call api failed! ")
                throw(err)
            }
        )
    })

    it("test First + Last Chinese Name do not match to bank account name", function(){

        var idNo = IDGen.getIdentityId();
        var cardId = "6216261000000000019"
        var firstName = "验";
        var lastName = "证";
        payload = disbHelper.fillBaseInfo(payload,idNo,cardId,firstName,lastName);
        payload.beneficiary.bankDetails.accountName = firstName+lastName+"错";
        return apiUtil.createDisbursement(payload).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result.message).to.include("First + Last Chinese Name do not match to bank account name");
            },
            err => {
                console.log(">>>call api failed! ")
                throw(err)
            }
        )
    })






})

