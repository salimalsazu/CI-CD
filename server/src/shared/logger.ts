/* eslint-disable no-undef */
import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = format;

// Custom Log Format

const myFormat = printf(({ level, message, timestamp }) => {
  const date = new Date(timestamp);
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: true,
  });

  return `📅${date.toDateString()}  ⏲${formattedTime} ▶ ${level}: ${message} `;
});
const errorFormat = printf(({ level, message, timestamp, ...srv }) => {
  const date = new Date(timestamp);
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: true,
  });

  return `📅${date.toDateString()}  ⏲${formattedTime} ▶ ${level}: ${message} 😟 statusCode: ${srv?.statusCode || '400'}`;
});

const successLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'ET-HOME' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'winston', 'successes', 'ET-HOME-%DATE%-success.log'),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
});

const infoLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'ET-HOME' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'winston', 'info', 'ET-HOME-%DATE%-info.log'),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'ET-HOME' }), timestamp(), errorFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(), 'logs', 'winston', 'errors', 'ET-HOME-%DATE%-error.log'),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
});

export { successLogger, errorLogger, infoLogger };
