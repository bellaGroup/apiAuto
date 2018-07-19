/**
 * Created by xionghuan on 2/1/18.
 */


var expect = require('chai').expect;
const _payload = require("../../data/payload/Tranglo/disbursementCreateRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var payload;
var deepCopy = require("jsprim").deepCopy;

describe("create disbursement via Tranglo channel",function () {
 beforeEach(()=>{
     payload= deepCopy(_payload)
 })

    it("remit USD-IDR", function(){
        payload.targetAmount = 139280
        return apiUtil.createDisbursement(payload).then(

            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                //expect(result.amountSourceCurrencyPayable).to.equal(Math.round(result.amountTargetCurrencyReceivable/result.fxRate*100)/100)
                expect(result.fxRate).to.not.be.null
                expect(result.feeAmount).to.equal(1)
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.sourceCurrencyCode).to.equal("USD")
                expect(result.targetCurrencyCode).to.equal("IDR")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )




    })

    it("remit USD-MYR", function(){
        payload.targetCurrencyCode = "MYR"
        payload.beneficiary.bankDetails.bankCountryCode = "MY"
        payload.beneficiary.bankDetails.swiftCode = "AISLMYKL"
        payload.beneficiary.bankDetails.accountNumber = "8881011274866"
        payload.beneficiary.bankDetails.accountName  = "Ashley Rogers"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                expect(result.fxRate).to.not.be.null
                expect(result.feeAmount).to.equal(1)//2
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.notes[0]).to.equal("968:Transaction Pending")
                expect(result.sourceCurrencyCode).to.equal("USD")
                expect(result.targetCurrencyCode).to.equal("MYR")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-PHP", function(){
        payload.targetCurrencyCode = "PHP"
        payload.beneficiary.bankDetails.bankCountryCode = "PH"
        payload.beneficiary.bankDetails.swiftCode = "PNBMPHMM"
        payload.beneficiary.bankDetails.accountNumber = "376800000000877"
        payload.beneficiary.bankDetails.accountName = "Frank Oppo"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                // var v1 = Math.round(result.amountTargetCurrencyReceivable/result.fxRate*100)
                // var v2 = parseFloat(Number(v1*0.01).toFixed(2))   //=v1/100
                // console.log("value1 is " +v1)
                // console.log("value2 is " + v2)
                // expect(result.amountSourceCurrencyPayable).to.equal(v2)
                expect(result.fxRate).to.not.be.null
                expect(result.feeAmount).to.equal(1.8)
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.sourceCurrencyCode).to.equal("USD")
                expect(result.targetCurrencyCode).to.equal("PHP")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-THB", function(){
        payload.targetCurrencyCode = "THB"
        payload.beneficiary.bankDetails.bankCountryCode = "TH"
        payload.beneficiary.bankDetails.swiftCode = "BKKBTHBK"
        payload.beneficiary.bankDetails.accountNumber = "37680000000088811"
        payload.beneficiary.bankDetails.accountName = "Frank Oppo"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                expect(result.fxRate).to.not.be.null
                expect(result.feeAmount).to.equal(3)
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.sourceCurrencyCode).to.equal("USD")
                expect(result.targetCurrencyCode).to.equal("THB")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-VND", function(){
        payload.targetCurrencyCode = "VND"
        payload.beneficiary.bankDetails.bankCountryCode = "VN"
        payload.beneficiary.bankDetails.swiftCode = "SGTTVNVX"
        payload.beneficiary.bankDetails.accountNumber = "376800000000888"
        payload.beneficiary.bankDetails.accountName = "Frank Oppo"
        payload.targetAmount = 229280

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                expect(result.fxRate).to.not.be.null
                expect(result.feeAmount).to.equal(2.5)
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.sourceCurrencyCode).to.equal("USD")
                expect(result.targetCurrencyCode).to.equal("VND")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-INR", function(){
        payload.targetCurrencyCode = "INR"
        payload.beneficiary.bankDetails.bankCountryCode = "IN"
        payload.beneficiary.bankDetails.swiftCode = "BBKUINBB"
        payload.beneficiary.bankDetails.accountRoutingType1 = "bank_code"
        payload.beneficiary.bankDetails.accountRoutingValue1 = "BKID0008091"
        payload.beneficiary.bankDetails.accountNumber = "9170000917"
        payload.beneficiary.bankDetails.accountName = "Mahdan Tejas"
        payload.targetAmount = 100.99

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
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-IDR, B2B, companyName max length is 100 chars", function(){
        payload.payer.entityType = "COMPANY"
        payload.beneficiary.entityType = "COMPANY"
        payload.beneficiary.additionalInfo.businessRegistrationNumber = "376800000000222"
        payload.beneficiary.bankCountryCode = "ID"
        payload.beneficiary.bankDetails.accountName = "Mohamad Ridwan"
        payload.payer.additionalInfo.businessRegistrationNumber = "00987236464"
        payload.payer.address.countryCode = "DE"
        payload.payer.companyName = "tew RIDWAN.cot.tew RIDWAN.cot.tew RIDWAN.cot.tew RIDWAN.cot.tew RIDWAN.cot.tew RIDWAN.cot."
        payload.targetAmount = 139280
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                expect(result.feeAmount).to.equal(1)
                expect(result.fxRate).to.not.be.null
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.sourceCurrencyCode).to.equal("USD")
                expect(result.targetCurrencyCode).to.equal("IDR")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-IDR, C2C", function(){
        payload.payer.entityType = "PERSONAL"
        payload.beneficiary.entityType = "PERSONAL"
        payload.targetAmount = 139280
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                expect(result.feeAmount).to.equal(1)
                expect(result.fxRate).to.not.be.null
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.sourceCurrencyCode).to.equal("USD")
                expect(result.targetCurrencyCode).to.equal("IDR")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("BankBranchCode is mandatory for INR", function(){
        payload.targetCurrencyCode = "INR"
        payload.beneficiary.bankDetails.bankCountryCode = "IN"
        payload.beneficiary.bankDetails.swiftCode = "BBKUINBB"
        payload.beneficiary.bankDetails.accountNumber = "9170000917"
        payload.beneficiary.bankDetails.accountName = "Mahdan Tejas"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                expect(res.data.result[0]).to.equal("left")
                expect(res.data.result[1].message).to.equal("field_required: beneficiary.bankDetails.accountRoutingValue1")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-IDR, invalid swiftCode", function(){
        payload.beneficiary.bankDetails.swiftCode = "123456789"
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                expect(res.data.result[0]).to.equal("left")
                expect(res.data.result[1].message).to.equal("can't get issuer id by swiftCode: 123456789")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-IDR, dismatched Name/ because move out IDR validation, so no check on name", function(){
        payload.beneficiary.bankDetails.accountName = "abc"
        payload.targetAmount = 139280
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.feeAmount).to.equal(1)
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-IDR, invalid accountNumber/ because move out IDR validation, so no check on accountNumber", function(){
        payload.beneficiary.bankDetails.accountNumber = "123456789"
        payload.targetAmount = 139280
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.feeAmount).to.equal(1)
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-IDR, invalid bankCountryCode", function(){
        payload.beneficiary.bankDetails.bankCountryCode = "PH"
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.feeAmount).to.equal(0)
                expect(result.status).to.equal("ERROR_NOT_RECOVERABLE_NEED_OPS")
                expect(result.notes[0]).to.contain("902:Invalid Beneficiary Currency")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-MYR, dismatched bankCountryCode and targetCurrencyCode", function(){
        payload.targetCurrencyCode = "MYR"
        payload.beneficiary.bankDetails.bankCountryCode = "PH"
        payload.beneficiary.bankDetails.swiftCode = "AISLMYKL"
        payload.beneficiary.bankDetails.accountNumber = "8881011274866"
        payload.beneficiary.bankDetails.accountName = "Ashley Rogers"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.feeAmount).to.equal(0)
                expect(result.status).to.equal("ERROR_NOT_RECOVERABLE_NEED_OPS")
                expect(result.notes[0]).to.contain("902:Invalid Beneficiary Currency")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("remit USD-PHP, invalid swiftCode", function(){
        payload.targetCurrencyCode = "PHP"
        payload.beneficiary.bankDetails.bankCountryCode = "PH"
        payload.beneficiary.bankDetails.swiftCode = "123456789"
        payload.beneficiary.bankDetails.accountNumber = "376800000000877"
        payload.beneficiary.bankDetails.accountName = "Frank Oppo"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                expect(res.data.result[0]).to.equal("left")
                expect(res.data.result[1].message).to.equal("can't get issuer id by swiftCode: 123456789")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("personalMobileNumber is optional, if it is empty, we will pass sContactNum=60123456789 to tranglo", function(){
        payload.payer.additionalInfo.personalMobileNumber = ""
        payload.targetAmount = 139280

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("Tranglo just support numeric, can not contain '+', '-',' ' and so on. what our disbursement service do for that is we will help to remove '+'",
        function(){
        payload.payer.additionalInfo.personalMobileNumber = "+8612345123451"
        payload.targetCurrencyCode = "THB"
        payload.beneficiary.bankDetails.bankCountryCode = "TH"
        payload.beneficiary.bankDetails.swiftCode = "BKKBTHBK"
        payload.beneficiary.bankDetails.accountNumber = "37680000000088811"
        payload.beneficiary.bankDetails.accountName = "Frank Oppo"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("valid paymentReason", function(){
            payload.payer.additionalInfo.personalMobileNumber = "+8612345123451"
            payload.targetCurrencyCode = "THB"
            payload.beneficiary.bankDetails.bankCountryCode = "TH"
            payload.beneficiary.bankDetails.swiftCode = "BKKBTHBK"
            payload.beneficiary.bankDetails.accountNumber = "37680000000088811"
            payload.beneficiary.bankDetails.accountName = "Frank Oppo"
            payload.paymentReason = "claim_settlements_on_other_general_insurance"

            return apiUtil.createDisbursement(payload).then(
                res=>{
                    console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                    var result = res.data.result[1]
                    expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                },
                err=>{
                    console.log(">>>call api failed! ")
                    throw err;
                }
            )
        })

    it("invalid paymentReason", function(){
        payload.payer.additionalInfo.personalMobileNumber = "+8612345123451"
        payload.targetCurrencyCode = "THB"
        payload.beneficiary.bankDetails.bankCountryCode = "TH"
        payload.beneficiary.bankDetails.swiftCode = "BKKBTHBK"
        payload.beneficiary.bankDetails.accountNumber = "37680000000088811"
        payload.beneficiary.bankDetails.accountName = "Frank Oppo"
        payload.paymentReason = "claim_123"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                expect(res.data.result[0]).to.equal("left")
                expect(res.data.result[1].message).to.equal("Can't find purpose code for paymentReason:claim_123")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("Invalid Beneficiary Country", function(){
        payload.targetCurrencyCode = "MYR"
        payload.beneficiary.bankDetails.bankCountryCode = "IT"
        payload.beneficiary.bankDetails.swiftCode = "AISLMYKL"
        payload.beneficiary.bankDetails.accountNumber = "8881011274866"
        payload.beneficiary.bankDetails.accountName = "Ashley Rogers"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result.fxRate).to.equal(0)
                expect(result.feeAmount).to.equal(0)
                expect(result.status).to.equal("ERROR_NOT_RECOVERABLE_NEED_OPS")
                expect(result.notes[0]).to.equal("917:Invalid Beneficiary Country")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("Exceed Per Transaction Amount Limit", function(){
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
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })



})