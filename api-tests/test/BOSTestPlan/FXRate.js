/**
 * Created by xionghuan on 8/18/17.
 */

var apiUtil = require("../../helper/DSapiUtil")
var expect = require('chai').expect;

describe("FX rate query",function(){
    it("test USDCNY", function(){
        var curPair = "USDCNY";
        return apiUtil.queryFXRate(curPair).then(
            res=>{
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result[0].bid).to.be.a('Number');
                expect(result[0].bid>1).to.be.true;
                expect(result[0].currencyPair).to.equal(curPair);
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("'CNYUSD' should be different from 'USDCNY'", function(){
        var curPair = "CNYUSD";
        return apiUtil.queryFXRate(curPair).then(
            res=>{
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result[0].bid).to.be.a('Number');
                expect(result[0].bid<1).to.be.true;
                expect(result[0].currencyPair).to.equal(curPair);
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("test AUDCNY, AUD is not add to system, need PD to add", function(){
        var curPair = "AUDCNY";
        return apiUtil.queryFXRate(curPair).then(
            res=>{
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                var result = res.data.result[1];
                expect(result[0].bid).to.be.a('Number');
                expect(result[0].currencyPair).to.equal(curPair);
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("test unsupported currency，API should return error.", function(){
        var curPair = "EURCNY";
        return apiUtil.queryFXRate(curPair).then(
            res=>{
                var result = res.data.result[1];
                console.log(">>> response: " + JSON.stringify(res.data,null,2));
                expect(result.message).to.be.equal("EUR is not supported for rate query");
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })


})