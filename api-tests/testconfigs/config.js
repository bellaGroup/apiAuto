/**
 * Created by xionghuan on 7/12/17.
 */
var  configuration = require('./config.json');
var logger = require('../util/logger')

const DEFAULT_ENV = 'Tranglo';
let env = process.env.NODE_ENV || DEFAULT_ENV;

if (!configuration.endpoints[env]) {
    logger.error(`'${env}' is not a valid/supported environment, use one of [${Object.keys(configuration.endpoints)}] instead.`);
    logger.warn(`Using default env: ${DEFAULT_ENV}`);
    env = DEFAULT_ENV;
}

let ENDPOINTS = configuration.endpoints[env];
let PATHS = configuration.paths;

console.log(`Currently running against: ${env}`);


const config = {
    host: ENDPOINTS.host,
    baseURL: ENDPOINTS.baseURL,

};
exports.config=config;
