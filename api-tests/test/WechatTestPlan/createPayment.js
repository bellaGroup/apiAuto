/**
 * Created by xionghuan on 3/2/18.
 */

var apiUtil = require("../../helper/ASapiUtil")
var account = require("./conf.json").sandbox.account
var expect = require('chai').expect;
var deepCopy = require("jsprim").deepCopy;
const _payload = require("../../data/payload/Wechat/createPaymentRequest.json");
var payload;


describe("create payment testing" , function(){
    beforeEach(()=>{
        payload= deepCopy(_payload)
    })

    before(()=>{
        var token = apiUtil.getAuthorization()
    })

    it("create payment successfully", function(){


        console.log(">>>token : " + token)
        return apiUtil.createPayment(token,payload).then(
            res=>{
                //expect(res.data.token).to.not.be.null
                console.log(">>>create response : " + JSON.stringify(res.data, null, 2))
               // return res.data.token
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })


})