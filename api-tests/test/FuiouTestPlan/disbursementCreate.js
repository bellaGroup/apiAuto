/**
 * Created by xionghuan on 3/15/18.
 */

var expect = require('chai').expect;
const _payload = require("../../data/payload/Fuiou/disbursementCreateRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var payload;
var deepCopy = require("jsprim").deepCopy;


describe("Fuiou create disbursement testing", function(){

    beforeEach(()=>{
        payload= deepCopy(_payload)
    })

   it("cnaps, check response elements as expected",function () {
       return apiUtil.createDisbursement(payload).then(
           res=>{
               console.log(">>>response : " + JSON.stringify(res.data, null, 2))
               var result = res.data.result[1]
               expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
               var expected = parseFloat((payload.targetAmount*1.0015+2).toFixed(2))
               expect(result.amountSourceCurrencyPayable).to.equal(expected)
               expect(result.fxRate).to.equals(1)
               expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
               expect(result.sourceCurrencyCode).to.equal("CNY")
               expect(result.targetCurrencyCode).to.equal("CNY")
           },
           err=>{
               console.log(">>>call api failed! ")
               throw err;
           }
       )
   })

    it("bank_code+area_code, check response elements as expected",function () {
        payload.beneficiary.bankDetails.accountRoutingType1 = "bank_code"
        payload.beneficiary.bankDetails.accountRoutingValue1 = "0102"
        payload.beneficiary.bankDetails.accountRoutingType2 = "area_code"
        payload.beneficiary.bankDetails.accountRoutingValue2 = "1240"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                var expected = parseFloat((payload.targetAmount*1.0015+2).toFixed(2))
                expect(result.amountSourceCurrencyPayable).to.equal(expected)
                expect(result.fxRate).to.equals(1)
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.sourceCurrencyCode).to.equal("CNY")
                expect(result.targetCurrencyCode).to.equal("CNY")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })


    it("invalid personalIdNumber, check ERROR as expected",function () {
        payload.beneficiary.additionalInfo.personalIdNumber = "320400198902250000"
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.status).to.equal("ERROR_NOT_RECOVERABLE_NEED_OPS")
                expect(result.notes[0]).to.contain("9999")
                expect(result.notes[0]).to.contain("参数不正确")
                expect(result.notes[0]).to.contain("身份证格式不正确")

            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })




})