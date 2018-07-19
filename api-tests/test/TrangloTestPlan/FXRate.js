/**
 * Created by xionghuan on 2/2/18.
 */
var apiUtil = require("../../helper/DSapiUtil")
var expect = require('chai').expect;

describe("query tranglo fx rate", function(){

    it("query USDIDR" , function(){
        var currPair = "USDIDR"
        return apiUtil.queryFXRate(currPair).then(
            res=>{
                console.log(">>>create response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result[0].bid).to.not.be.null
                expect(result[0].currencyPair).to.equal(currPair)
                expect(result[0].liquidityProvider).to.equal("TRANGLO")
                expect(result[0].tradable).to.equal(true)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("query USDMYR" , function(){
        var currPair = "USDMYR"
        return apiUtil.queryFXRate(currPair).then(
            res=>{
                console.log(">>>create response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result[0].bid).to.not.be.null
                expect(result[0].currencyPair).to.equal(currPair)
                expect(result[0].liquidityProvider).to.equal("TRANGLO")
                expect(result[0].tradable).to.equal(true)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("query USDTHB" , function(){
        var currPair = "USDTHB"
        return apiUtil.queryFXRate(currPair).then(
            res=>{
                console.log(">>>create response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result[0].bid).to.not.be.null
                expect(result[0].currencyPair).to.equal(currPair)
                expect(result[0].liquidityProvider).to.equal("TRANGLO")
                expect(result[0].tradable).to.equal(true)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("query USDPHP" , function(){
        var currPair = "USDPHP"
        return apiUtil.queryFXRate(currPair).then(
            res=>{
                console.log(">>>create response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result[0].bid).to.not.be.null
                expect(result[0].currencyPair).to.equal(currPair)
                expect(result[0].liquidityProvider).to.equal("TRANGLO")
                expect(result[0].tradable).to.equal(true)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("query USDVND" , function(){
        var currPair = "USDVND"
        return apiUtil.queryFXRate(currPair).then(
            res=>{
                console.log(">>>create response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result[0].bid).to.not.be.null
                expect(result[0].currencyPair).to.equal(currPair)
                expect(result[0].liquidityProvider).to.equal("TRANGLO")
                expect(result[0].tradable).to.equal(true)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("query USDINR" , function(){
        var currPair = "USDINR"
        return apiUtil.queryFXRate(currPair).then(
            res=>{
                console.log(">>>create response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result[0].bid).to.not.be.null
                expect(result[0].currencyPair).to.equal(currPair)
                expect(result[0].liquidityProvider).to.equal("TRANGLO")
                expect(result[0].tradable).to.equal(true)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("query REVERSE IDRUSD" , function(){
        var currPair = "IDRUSD"
        return apiUtil.queryFXRate(currPair).then(
            res=>{
                console.log(">>>create response : " + JSON.stringify(res.data, null, 2))
                var result = res.data.result[1]
                expect(result[0].bid).to.not.be.null
                expect(result[0].currencyPair).to.equal(currPair)
                expect(result[0].liquidityProvider).to.equal("TRANGLO")
                expect(result[0].tradable).to.equal(true)
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })

    it("invalid currency pair" , function(){
        var currPair = "USDAUD"
        return apiUtil.queryFXRate(currPair).then(
            res=>{
                console.log(">>>create response : " + JSON.stringify(res.data, null, 2))
                expect(res.data.result[0]).to.equal("left")
                expect(res.data.result[1].message).to.contain(currPair+" is not a supported currency pair for rate query")
            },
            err=>{
                console.log(">>>call api failed! ")
                throw err;
            }
        )
    })


})