/**
 * Created by xionghuan on 2/2/18.
 */

var expect = require('chai').expect;
const _payload = require("../../data/payload/Tranglo/disbursementCreateRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var payload;
var deepCopy = require("jsprim").deepCopy;
var sleep = require("../../util/sleep")


describe("query disbursement via Tranglo channel ", function(){
    beforeEach(()=>{
        payload= deepCopy(_payload)
    })

    it("query disbursement status - EXECUTING_NOT_CANCELABLE", function(){
        payload.targetCurrencyCode = "THB"
        payload.beneficiary.bankDetails.bankCountryCode = "TH"
        payload.beneficiary.bankDetails.swiftCode = "BKKBTHBK"
        payload.beneficiary.bankDetails.accountNumber = "37680000000088811"
        payload.beneficiary.firstName = "Frank"
        payload.beneficiary.lastName = "Oppo"
        var disbId
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>create response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                disbId = result.disbursementId
        },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        ).then(
            async function(){
                await sleep.timeOut(1000)
                return apiUtil.queryDisbursement(disbId).then(
                    res=>{
                        console.log(">>>query response : " + JSON.stringify(res.data, null, 2))
                        var result = res.data.result[1]
                        expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                        expect(result.notes).to.contain("968:Transaction Pending")
                    }
                )
            }
        )
    })

    it("below test account will receive COMPLETED status", function(){
        payload.targetCurrencyCode = "PHP"
        payload.beneficiary.bankDetails.bankCountryCode = "PH"
        payload.beneficiary.bankDetails.swiftCode = "BNORPHMM"
        payload.beneficiary.bankDetails.accountNumber = "000990000666"
        payload.beneficiary.bankDetails.accountName = "Sheok Chin Lau"
        var disbId
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                expect(result.fxRate).to.not.be.null
                expect(result.feeAmount).to.equal(1.8)
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.sourceCurrencyCode).to.equal("USD")
                expect(result.targetCurrencyCode).to.equal("PHP")
                disbId = result.disbursementId
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        ).then(
            async function(){
                await sleep.timeOut(3000)
                return apiUtil.queryDisbursement(disbId).then(
                    res=>{
                        console.log(">>>query response : " + JSON.stringify(res.data, null, 2))
                        var result = res.data.result[1]
                        expect(result.status).to.equal("COMPLETED")
                        expect(result.notes).to.contain("000:Transaction is Successful")
                    }
                )
            }
        )
    })

    it("below test account will receive FAILED status", function(){
        payload.targetCurrencyCode = "INR"
        payload.beneficiary.bankDetails.bankCountryCode = "IN"
        payload.beneficiary.bankDetails.swiftCode = "BCEYIN5M"
        payload.beneficiary.bankDetails.accountNumber = "9100000910"
        payload.beneficiary.bankDetails.accountRoutingType1 = "bank_code"
        payload.beneficiary.bankDetails.accountRoutingValue1 = "BCEY0000001"
        payload.beneficiary.bankDetails.accountName = "Trisha Abhinav"
        var disbId
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                expect(result.fxRate).to.not.be.null
                expect(result.feeAmount).to.equal(1.25)
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.sourceCurrencyCode).to.equal("USD")
                expect(result.targetCurrencyCode).to.equal("INR")
                disbId = result.disbursementId
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        ).then(
            async function(){
                await sleep.timeOut(3000)
                return apiUtil.queryDisbursement(disbId).then(
                    res=>{
                        console.log(">>>query response : " + JSON.stringify(res.data, null, 2))
                        var result = res.data.result[1]
                        expect(result.status).to.equal("FAILED")
                        expect(result.notes).to.contain("930:Transaction Rejected")
                    }
                )
            }
        )
    })

    it("disbursement ID is invalid", function(){
        var disbId = "1234567890"
        return apiUtil.queryDisbursement(disbId).then(
            res=>{
                console.log(">>>query response : " + JSON.stringify(res.data, null, 2))
                expect(res.data.result[0]).to.equal("left")
                expect(res.data.result[1].message).to.equal("No record found for: "+disbId)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })


})