import { createLogger, format, transports, addColors } from 'winston';
const { colorize, simple } = format;
const { Console, File } = transports;

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 };
const colors = { FATAL: 'red', ERROR: 'red', INFO: 'green', HTTP: 'blue' };
addColors(colors);

const logger = createLogger({
    levels,
    format: colorize(),
    transports: [{
        levels: ['FATAL', 'ERROR'],
        format: simple(),
        filename: 'error.log',
}],
    }); 