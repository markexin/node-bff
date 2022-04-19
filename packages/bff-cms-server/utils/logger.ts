import winston from 'winston';
import path from 'path';
import fs from 'fs';
// import { Context } from 'koa';
// import cookie from 'cookie';
// import moment from 'moment';
import _ from 'lodash';
const { format } = winston;
const { timestamp, printf } = format;
import { LOG_DIR } from '../config';

let LOG_DIR_ARRAY = [path.resolve('/opt/web'), path.resolve(LOG_DIR)];

// 检查日志文件目录是否存在
const mkdirSync = (flag = true): void => {
    try {
        for (let i = 0, l = LOG_DIR_ARRAY.length; i < l; i++) {
            const element = LOG_DIR_ARRAY[i];

            try {
                fs.statSync(element).isDirectory();
            } catch (err) {
                fs.mkdirSync(element);
            }
        }
    } catch (e) {
        if (flag) {
            LOG_DIR_ARRAY = [path.resolve('./logs/')];
            mkdirSync(false);
        }
    }
};

mkdirSync(true);

function stringIt(messages: any): string {
    return _.chain(messages)
        .map(function (msg) {
            if (_.isString(msg)) {
                return msg;
            } else if (_.isError(msg)) {
                return '\n' + msg.stack || msg.message || msg.toString() + '\n';
            } else {
                return JSON.stringify(msg);
            }
        })
        .value()
        .join('|');
}

const myFormat = printf((info) => {
    return `${info.timestamp.replace('.', ',')} ${info.level.toUpperCase()} ${info.message}`;
});

const infoLogger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.splat(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        myFormat,
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(LOG_DIR_ARRAY[LOG_DIR_ARRAY.length - 1], 'info.log'),
            level: 'info',
        }),
        new winston.transports.File({
            filename: path.join(LOG_DIR_ARRAY[LOG_DIR_ARRAY.length - 1], 'error.log'),
            level: 'error',
        }),
    ],
});
const info = function (...args: any[]): void {
    // level: string, message: string, ...meta: any[]
    infoLogger.log('info', args.shift(), ...args);
};

const error = function (...args: any[]): void {
    infoLogger.log('error', args.shift(), ...args);
};

export { info, error };
