/**
 * Created by xionghuan on 3/28/18.
 */

var expect = require('chai').expect;
const _payload = require("../../data/payload/QBC/disbursementCreateRequest.json");
var apiUtil = require("../../helper/DSapiUtil");
var payload;
var deepCopy = require("jsprim").deepCopy;
var sleep = require("../../util/sleep")
var disbId0

describe("QBC cancel disbursement testing", function(){
    forEach(()=>{

    })

    it("cancel EXECUTING_CANCELLABLE status disbursement", function(){
        return apiUtil.createDisbursement(payload).then(
            res=>{

            },
            err=>{

            }

        )

    })

})
