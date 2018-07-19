/**
 * Created by xionghuan on 9/21/17.
 */


var expect = require('chai').expect;
const _payload = require("../../data/payload/Xendit/disbursementCreateRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var payload;
var deepCopy = require("jsprim").deepCopy;

describe("Xendit disbursement, positive cases", function(){
    beforeEach(()=>{
        payload= deepCopy(_payload)
    });

    it("disbursementSettleMode is 'PAYUP', rpcMode is 'Sync' ", function(){
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result[1];
                expect(result.notes[0]).to.equal("Disbursing")
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.disbursementRail).to.equal("XENDIT")
                expect(result.disbursementId).to.not.be.empty
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
                // when "xendit.enable.fx" is on, only need to check fx
                // var fxRate = result.fxRate
                // expect(result.fxRate).to.be.a('Number')
                // var amountSource = result.amountSourceCurrencyPayable
                // var amountTarget = result.amountTargetCurrencyReceivable
                // expect(amountSource).to.equal(payload.sourceAmount)
                // expect(amountTarget).to.equal(Math.round(amountSource*fxRate))
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })


    it("disbursementSettleMode is 'GUARANTEE_RECEIVABLEY'，rpcMode is 'Sync'", function(){
        payload.disbursementSettleMode = "GUARANTEE_RECEIVABLEY"

        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result[1];
                expect(result.notes[0]).to.equal("Disbursing")
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.disbursementRail).to.equal("XENDIT")
                expect(result.disbursementId).to.not.be.empty
                expect(result.sourceCurrencyCode).to.equal(payload.sourceCurrencyCode)
                expect(result.targetCurrencyCode).to.equal(payload.targetCurrencyCode)
                expect(result.amountTargetCurrencyReceivable).to.equal(payload.targetAmount)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("rpcMode is 'Async'", function(){
        payload.disbursementSettleMode = "GUARANTEE_RECEIVABLEY"
        payload.rpcMode = "Async"
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result[1];
                expect(result.notes[0]).to.equal("Pending to execute disbursing")
                expect(result.status).to.equal("PENDING")
                expect(result.disbursementRail).to.equal("XENDIT")
                expect(result.disbursementId).to.not.be.empty
                expect(result.sourceCurrencyCode).to.equal(payload.sourceCurrencyCode)
                expect(result.targetCurrencyCode).to.equal(payload.targetCurrencyCode)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })


    it("bankName is SINARMAS", function(){
        payload.beneficiary.bankDetails.bankName = "SINARMAS"
        payload.beneficiary.bankDetails.accountName = "Roseanne Tati"
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result[1];
                expect(result.notes[0]).to.equal("Disbursing")
                expect(result.status).to.equal("EXECUTING_NOT_CANCELABLE")
                expect(result.disbursementRail).to.equal("XENDIT")
                expect(result.disbursementId).to.not.be.empty
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

})




describe("Xendit disbursement, negative cases", function(){
    beforeEach(()=>{
        payload= deepCopy(_payload)
    });

    it("targetCurrencyCode should be IDR", function(){
        payload.targetCurrencyCode= "CNY"
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                expect(res.data.result[0]).to.equal("left")
                expect(res.data.result[1].message).to.equal("sourceCurrencyCode and targetCurrencyCode must be IDR")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("sourceCurrencyCode must be IDR", function(){
        payload.sourceCurrencyCode = "USD"
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                expect(res.data.result[0]).to.equal("left")
                expect(res.data.result[1].message).to.equal("sourceCurrencyCode and targetCurrencyCode must be IDR")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("accountName is not matched", function(){
        payload.beneficiary.bankDetails.accountName= "xiong bella"
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result[1];
                expect(result.notes[0]).to.equal("Name validation failed")
                expect(result.notes[1]).to.be.includes("Name Validation failed, disbursment request name is: xiong bella but Xendit return account name is")
                expect(result.status).to.equal("ERROR_RECOVERABLE_NEED_OPS")
                expect(result.disbursementRail).to.equal("XENDIT")
                expect(result.upstreamSystem).to.equal(payload.upstreamSystem)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("accountName format is invalid ", function(){
        payload.beneficiary.bankDetails.accountNumber = "1111abc"
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result[1];
                expect(result.notes[0]).to.equal("Name validation failed")
                expect(result.notes[1]).to.be.includes("XenditExecError")
                expect(result.status).to.equal("ERROR_RECOVERABLE_NEED_OPS")
                expect(result.disbursementRail).to.equal("XENDIT")
                expect(result.upstreamSystem).to.equal(payload.upstreamSystem)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("BCA account numbers must be 10 digits long ", function(){
        payload.beneficiary.bankDetails.accountNumber = "123456789012"
        payload.beneficiary.bankDetails.accountName= "Ellene Tutto"
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result[1];
                expect(result.notes[0]).to.equal("Disburse failed")
                expect(result.notes[1]).to.be.includes("statusCode=400, error_code=RECIPIENT_ACCOUNT_NUMBER_ERROR, message=BCA account numbers must be 10 digits long")
                expect(result.status).to.equal("ERROR_RECOVERABLE_NEED_OPS")
                expect(result.disbursementRail).to.equal("XENDIT")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("Missing source Amount when disbursementSettleMode: PAYUP ", function(){
        payload.sourceAmount = ""
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result;
                expect(result[0]).to.equal("left")
                expect(result[1].message).to.be.includes("Missing source Amount when disbursementSettleMode: PAYUP")
                expect(result[1].source).to.be.includes("Missing source Amount when disbursementSettleMode: PAYUP")
                expect(result[1].type).to.be.includes("Missing source Amount when disbursementSettleMode: PAYUP")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("Missing target Amount when disbursementSettleMode: GUARANTEE_RECEIVABLEY ", function(){
        payload.disbursementSettleMode = "GUARANTEE_RECEIVABLEY"
        payload.targetAmount = ""
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result;
                expect(result[0]).to.equal("left")
                expect(result[1].message).to.be.includes("Missing target Amount when disbursementSettleMode: GUARANTEE_RECEIVABLEY")
                expect(result[1].source).to.be.includes("Missing target Amount when disbursementSettleMode: GUARANTEE_RECEIVABLEY")
                expect(result[1].type).to.be.includes("Missing target Amount when disbursementSettleMode: GUARANTEE_RECEIVABLEY")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("bankName is unsupport", function(){
        payload.beneficiary.bankDetails.bankName = "ABCDEF"
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result[1];
                expect(result.notes[0]).to.equal("Name validation failed")
                expect(result.notes[1]).to.be.includes("statusCode=404, error_code=UNSUPPORTED_BANK_CODE_ERROR, message=This bank code is not supported")
                expect(result.status).to.equal("ERROR_RECOVERABLE_NEED_OPS")
                expect(result.disbursementRail).to.equal("XENDIT")
                expect(result.disbursementId).to.not.be.empty
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("bankName is empty", function(){
        payload.beneficiary.bankDetails.bankName = ""
        return apiUtil.createDisbursement(payload).then(
            res=>{
                console.log(">>>response : "+ JSON.stringify(res.data,null,2))
                var result = res.data.result[1];
                expect(result.notes[0]).to.equal("Name validation failed")
                expect(result.notes[1]).to.be.includes("\"bank_code\" is not allowed to be empty]")
                expect(result.status).to.equal("ERROR_RECOVERABLE_NEED_OPS")
                expect(result.disbursementRail).to.equal("XENDIT")
                expect(result.disbursementId).to.not.be.empty
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })



})


