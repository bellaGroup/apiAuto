// var guid =require('guid');
// var axios = require('axios')
// var chai = require('chai');
// var dateTime = require('./util/dateTime');
// var logger = './util/logger';
// var forEach =require('mocha-each');
// var chaiJWT = require('chai-jwt');
// var { config } =require( '../testconfigs/config.js');
// var _ = require('lodash');
// var { configure, ClientApiClient } =require('./helper/index');
//
// global.Guid = guid;
// global.axios = axios;
// chai.config.includeStack = true;
// chai.use(chaiJWT)
// global.expect = chai.expect;
// global.Assertion = chai.Assertion;
// global.AssertionError = chai.AssertionError;
// global.assert = chai.assert;
// global.chai = chai;
// global.dateTime = dateTime;
// global.nextWeekday = dateTime.nextWeekday;
// global.getNextValidDate = dateTime.getNextValidDate;
// global.getNthValidDate = dateTime.getNthValidDate;
// global.logger = logger;
// global.config = config;
// global.paths = config.paths;
// global.baseUrl = config.baseUrl;
// global.forEach = forEach;
// global._ = _;
// global.ClientApiClient = ClientApiClient;
//
// configure({
//     clientApiUrl: config.baseUrl
//
// });
//
// if (!global.Promise) {
//     global.Promise = require('q');
// }
//
// let testContext = {};
// testContext.testDir = require('path').resolve(`${__dirname}/..`);
// global.testContext = testContext;
//
