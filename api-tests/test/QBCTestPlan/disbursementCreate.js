/**
 * Created by xionghuan on 3/27/18.
 */

var expect = require('chai').expect;
const _payload = require("../../data/payload/QBC/disbursementCreateRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var payload;
var deepCopy = require("jsprim").deepCopy;

describe("QBC create disbursement testing" , function(){
    beforeEach(()=>{
        payload= deepCopy(_payload)
    })

    it("C2C, check response as expected" , function(){
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.status).to.equals("EXECUTING_CANCELABLE")
                expect(result.amountTargetCurrencyReceivable).to.equals(payload.targetAmount)
                expect(result.disbursementRail).to.equals("QBC")
                expect(result.sourceCurrencyCode).to.equals("JPY")
                expect(result.targetCurrencyCode).to.equals("JPY")
                expect(result.tracingInfo.QtkId).to.not.be.null
                expect(result.tracingInfo.RtkId).to.not.be.null
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("B2B, check response as expected" , function(){
        payload.beneficiary.entityType = "COMPANY"
        payload.beneficiary.companyName = "51 talk.com"
        payload.payer.entityType = "COMPANY"
        payload.payer.companyName = "awx company.co"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.status).to.equals("EXECUTING_CANCELABLE")
                expect(result.amountTargetCurrencyReceivable).to.equals(payload.targetAmount)
                expect(result.disbursementRail).to.equals("QBC")
                expect(result.sourceCurrencyCode).to.equals("JPY")
                expect(result.targetCurrencyCode).to.equals("JPY")
                expect(result.tracingInfo.QtkId).to.not.be.null
                expect(result.tracingInfo.RtkId).to.not.be.null
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("send message to beneficiary, its optional" , function(){
        payload.messageToBeneficiary = "test MessageToBeneficiary, and length less than 60 characters."
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.status).to.equals("EXECUTING_CANCELABLE")
                expect(result.tracingInfo.QtkId).to.not.be.null
                expect(result.tracingInfo.RtkId).to.not.be.null
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("accountName mapped to QBC R_Kana field, it should be Japanese, its optional" , function(){
        payload.beneficiary.accountName = null
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.status).to.equals("EXECUTING_CANCELABLE")
                expect(result.tracingInfo.QtkId).to.not.be.null
                expect(result.tracingInfo.RtkId).to.not.be.null
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("customerId is optional, if didn't input customerId, then get from uniqueRequestId" , function(){
        payload.variation.customerId = null
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.status).to.equals("EXECUTING_CANCELABLE")
                expect(result.tracingInfo.QtkId).to.not.be.null
                expect(result.tracingInfo.RtkId).to.not.be.null
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })




})