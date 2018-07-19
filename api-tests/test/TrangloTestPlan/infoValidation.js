/**
 * Created by xionghuan on 5/31/18.
 */

var expect = require('chai').expect;
const _payload = require("../../data/payload/Tranglo/infoValidationRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var payload;
var deepCopy = require("jsprim").deepCopy;


describe("test api of validation beneficiary info", function(){

    beforeEach(()=>{
        payload= deepCopy(_payload)
    })

    it("correct info, validation success", function(){
        return apiUtil.infoValidation(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.probeStatus).to.equal("COMPLETED")
                expect(result.bankAccountValidity).to.equal("VALID")
                expect(result.logs[0]).to.equal("000-Transaction is Successful")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("incorrect info, validation failed", function(){
        payload.accountName = "abc123"
        return apiUtil.infoValidation(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.probeStatus).to.equal("COMPLETED")
                expect(result.bankAccountValidity).to.equal("INVALID")
                expect(result.logs[0]).to.equal("104-Beneficiary Name Mismatched or Empty")
                expect(result.logs[1]).to.equal("name should be:LUSI MARIYANTI")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })



})