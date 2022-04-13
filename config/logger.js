const { createLogger, transports, format } = require("winston");

const customFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({
    format: "YY-MM-DD HH:MM:SS",
  }),
  format.printf((info) => {
    return `${info.timestamp} - [${info.level}] - ${info.message}`;
  })
);

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), customFormat),
    }),
    new transports.File({ filename: "log/app.log", level: "info" }),
  ],
});

module.exports = logger;
