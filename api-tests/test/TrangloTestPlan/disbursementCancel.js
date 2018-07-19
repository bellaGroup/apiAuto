/**
 * Created by xionghuan on 3/21/18.
 */

var expect = require('chai').expect;
const _payload = require("../../data/payload/Tranglo/disbursementCreateRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var payload;
var deepCopy = require("jsprim").deepCopy;
var sleep = require("../../util/sleep")
var disbId0

describe("cancel disbursement via Tranglo channel ", function(){
    beforeEach(()=>{
        payload= deepCopy(_payload)
    })

    it("Can be cancelled, 982:Exceed Per Transaction Amount Limit", function(){
        payload.targetCurrencyCode = "MYR"
        payload.beneficiary.bankDetails.bankCountryCode = "MY"
        payload.beneficiary.bankDetails.swiftCode = "AISLMYKL"
        payload.beneficiary.bankDetails.accountNumber = "8881011274866"
        payload.beneficiary.bankDetails.accountName = "Ashley Rogers"
        payload.targetAmount = 550000

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.fxRate).to.equal(0)
                expect(result.feeAmount).to.equal(0)
                expect(result.status).to.equal("ERROR_NOT_RECOVERABLE_NEED_OPS")
                expect(result.notes[0]).to.equal("982:Exceed Per Transaction Amount Limit")
                disbId0 = result.disbursementId
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        ).then(
            async function(){
                await sleep.timeOut(1000)
                return apiUtil.cancelDisbursement(disbId0).then(
                    res=>{
                        console.log(">>>cancel response : " + JSON.stringify(res.data, null, 2))
                        var result = res.data.result[1]
                        expect(result.status).to.equal("CANCELLED")
                        expect(result.notes).to.contain("982:Exceed Per Transaction Amount Limit")
                    }
                )
            }
        )
    })

    it("cancelled disbursement can not be cancel again.", function(){

                return apiUtil.cancelDisbursement(disbId0).then(
                    res=>{
                        console.log(">>>cancel response : " + JSON.stringify(res.data, null, 2))
                        expect(res.data.result[0]).to.equal("left")
                        expect(res.data.result[1].message).to.contain("Current status is CANCELLED, can't be Cancelled")
                    }
                )
            })


    it("disbursement ID is invalid", function(){
        var disbId = "1234567890"
        return apiUtil.cancelDisbursement(disbId).then(
            res=>{
                console.log(">>>query response : " + JSON.stringify(res.data, null, 2))
                expect(res.data.result[0]).to.equal("left")
                expect(res.data.result[1].message).to.equal("No record found for id : "+disbId)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })


})