var winston =require("winston");

winston.configure({
    transports: [
        new winston.transports.Console({
            colorize: true
        })
    ]
});

exports.winston = winston;
