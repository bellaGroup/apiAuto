/**
 * Created by xionghuan on 3/26/18.
 */


var expect = require('chai').expect;
const _payload = require("../../data/payload/Fuiou/disbursementCreateRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var payload;
var deepCopy = require("jsprim").deepCopy;
var sleep = require("../../util/sleep")


describe("query disbursement via Tranglo channel ", function(){
    beforeEach(()=>{
        payload= deepCopy(_payload)
    })

    it("query disbursement status - EXECUTING_NOT_CANCELABLE", function(){
        payload.beneficiary.bankDetails.accountRoutingType1 = "bank_code"
        payload.beneficiary.bankDetails.accountRoutingValue1 = "0102"
        payload.beneficiary.bankDetails.accountRoutingType2 = "area_code"
        payload.beneficiary.bankDetails.accountRoutingValue2 = "1240"
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
                expect(res.data.result[1].message).to.equal("Disbursement record with this reference "+disbId +" not found")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })


})