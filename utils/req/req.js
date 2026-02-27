import { Logger } from '../../services/logger/logger.js';

/**
 * @param {*} req
 * @param {number} code
 */
const showLog = (req, code) => {
  if (code < 400) {
    Logger.log('info', `[${req.ip}] ${req.method} ${req.originalUrl} ${code}`);
  } else {
    Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} ${code}`);
  }
};

/**
 * @description
 * - Informational responses (100 – 199)
 * - Successful responses (200 – 299)
 * - Redirection messages (300 – 399)
 * - Client error responses (400 – 499)
 * - Server error responses (500 – 599)
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
const buildResSuccess = (code) => {
  return code < 400;
};

/**
 * @description
 * The key of the response data is 'data' if the data is not an error, otherwise it is 'error'.
 */
const buildResKey = (data) => {
  return data instanceof Error ? 'error' : 'data';
};

/**
 * @description
 * Returns an object with the code and message if the data is an error, otherwise it returns the data itself.
 */
const buildResData = (code, data) => {
  return data instanceof Error ? { code, message: data.message } : data;
};

/**
 * @description
 * Returns a JSON response with the given code and data. The success field is determined by the code, and the key of the data is determined by whether the data is an error or not.
 */
const resJSON = (req, res, code, data) => {
  showLog(req, code);

  res.status(code).json({
    success: buildResSuccess(code),
    [buildResKey(data)]: buildResData(code, data),
  });
};

/**
 * @description
 * Returns a response with the given code and data. The data is sent as is, without any modification.
 */
const resSend = (req, res, code, data) => {
  showLog(req, code);

  res.status(code).send(data);
};

export { resJSON, resSend };
