/**
 * Created by xionghuan on 9/21/17.
 */

var expect = require('chai').expect;
const _payload = require("../../data/payload/Xendit/disbursementCreateRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var payload;
var deepCopy = require("jsprim").deepCopy;

describe("Xendit disbursement query, ", function(){
    beforeEach(()=>{
        payload= deepCopy(_payload)
    })

    it("query Async disbursement", function(){
        payload.disbursementSettleMode = "GUARANTEE_RECEIVABLEY"
        payload.rpcMode = "Async"
        var disbId;
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result[1];
                expect(result.notes[0]).to.equal("Pending to execute disbursing")
                expect(result.status).to.equal("PENDING")
                expect(result.disbursementRail).to.equal("XENDIT")
                disbId = result.disbursementId
                expect(disbId).to.not.be.empty
                expect(result.sourceCurrencyCode).to.equal(payload.sourceCurrencyCode)
                expect(result.targetCurrencyCode).to.equal(payload.targetCurrencyCode)

            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        ).then(
            function(){
                return apiUtil.queryDisbursement(disbId).then(
                    res=> {
                        console.log(">>> response: " + JSON.stringify(res.data,null,2));
                        var result = res.data.result[1];
                        expect(result.notes[0]).to.equal("Disbursing")
                        expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                        expect(result.disbursementRail).to.equal("XENDIT")
                        expect(result.disbursementId).to.not.be.empty
                        expect(result.sourceCurrencyCode).to.equal(payload.sourceCurrencyCode)
                        expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                    }
                )
            }
        )
    })

    it("disbursement is not exist", function(){
        var disbId = "67404b9c-b154-4bc3-bdbe-e81fd72a7588";
        return apiUtil.queryDisbursement(disbId).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result
                expect(result[0]).to.equal("left")
                expect(result[1].message).to.be.includes("Disbursment does not exist for reference: " + disbId)
                expect(result[1].source).to.be.includes("Disbursment does not exist for reference: " + disbId)
                expect(result[1].type).to.be.includes("Disbursment does not exist for reference: " + disbId)
            },
            err => {
                console.log(">>>call api failed! ")
                throw err;
            })
    })

    it("disbursement is empty", function(){
        var disbId = "";
        return apiUtil.queryDisbursement(disbId).then(
            res => {
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result
                expect(result[0]).to.equal("left")
                expect(result[1].message).to.be.includes("Invalid UUID string:")
                expect(result[1].source).to.be.includes("Failed to process this request")
                expect(result[1].type).to.be.includes("application_failure")
            },
            err => {
                console.log(">>>call api failed! ")
                throw err;
            })
    })

})