/**
 * Created by xionghuan on 8/7/17.
 */
var moment =require('moment');
var _ = require('lodash');
var pubHolidays =require('./publicHoliday.json')
var logger = require("./logger")

exports.getNthValidDate = (aMoment, ccyPair, n) => {

    if (n < 1) {
        throw new Error('n should be at least 1');
    }

    let mmt = aMoment || moment();
    let ret = moment(mmt);
    _.times(n, function (x) {

        mmt = getNextValidDate(nextWeekday(mmt), ccyPair, pubHolidays);
        ret = moment(mmt);
        mmt = mmt.add(1, 'day');
    });
    return ret;
};

exports.getNextValidDate = (day, ccyPair, invalidDates = pubHolidays) => {
    if (!_.isArray(invalidDates)) {
        throw new Error('Should pass in array as argument');
    }

    let nextValidDay = day;

    let datetoCompare = {
        "date": day.format("YYYY-MM-DD"),
        "reason": "Currency holiday"
    };

    let ccy = {
        "currency_pair": ccyPair.substring(0, 3) + ccyPair.substring(3, 6)
    };
    let reverse_ccy = {
        "currency_pair": ccyPair.substring(3, 6) + ccyPair.substring(0, 3)
    };

    logger.debug(`ccy ${JSON.stringify(ccy)} and ${JSON.stringify(reverse_ccy)}`);

    logger.debug(`invalid dates  ${JSON.stringify(invalidDates)}`);


    let ccylist = _.find(invalidDates, ccy) || _.find(invalidDates, reverse_ccy);
    logger.debug(`ccylist ${JSON.stringify(ccylist)}`);

    var result = _.find(ccylist.invalid_conversion_dates, datetoCompare)
    while (result !== undefined) {
        nextValidDay = nextValidDay.add(1, 'days');
        nextValidDay = nextWeekday(nextValidDay);
        datetoCompare = {
            "date": nextValidDay.format("YYYY-MM-DD"),
            "reason": "Currency holiday"
        };
        result = _.find(ccylist.invalid_conversion_dates, datetoCompare);
    }
    return nextValidDay;
};


exports.nextWeekday = day => {
    if (day === null) {
        day = moment();
    }
    while (day.day() === 0 || day.day() === 6) {
        day = day.add(1, 'days');
    }
    return day;
};
