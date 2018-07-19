/**
 * Created by xionghuan on 3/2/18.
 */
var apiUtil = require("../../helper/ASapiUtil")
var expect = require('chai').expect

describe("get token testing" , function(){

    it("input valid value, and get the token successfully", function(){
        return apiUtil.getToken().then(
            res=>{
                expect(res.data.token).to.not.be.null
                console.log(">>>create response : " + JSON.stringify(res.data, null, 2))

            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

})

