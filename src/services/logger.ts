import RNFS from 'react-native-fs';
import { logger, consoleTransport, fileAsyncTransport, configLoggerType } from 'react-native-logs';

const FILENAME = `application-logs`;
const filePath = `${RNFS.DocumentDirectoryPath}/${FILENAME}`;

const defaultConfig: configLoggerType = {
  transport: (props) => {
    if (__DEV__) {
      consoleTransport(props);
    }
    fileAsyncTransport(props);
  },
  severity: __DEV__ ? 'debug' : 'info',
  transportOptions: {
    colors: 'ansi',
    FS: RNFS,
    filePath: RNFS.DocumentDirectoryPath,
    fileName: FILENAME,
  },
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  async: true,
  asyncFunc: async (cb) => {
    //log rotate if file > 10Mo
    try {
      const { size } = await RNFS.stat(filePath);
      if (parseFloat(String(size)) > 10000000) {
        await RNFS.moveFile(filePath, `${filePath}-1`);
        await RNFS.write(filePath, '');
      }
      // eslint-disable-next-line no-empty
    } catch (_) {
    } finally {
      cb();
    }
  },
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};

const log = (() => {
  let loggerInstance = undefined;

  const create = (conf: configLoggerType = defaultConfig) => {
    loggerInstance = logger.createLogger(conf);
  };

  const debug = function (...args) {
    loggerInstance?.debug(...args);
  };
  const info = function (...args) {
    loggerInstance?.info(...args);
  };
  const warn = function (...args) {
    loggerInstance?.warn(...args);
  };
  const error = function (...args) {
    loggerInstance?.error(...args);
  };

  return {
    create,
    debug,
    info,
    warn,
    error,
  };
})();

const getLogs = async () => {
  try {
    const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    for (const file of files) {
      if (file.name === FILENAME) {
        return await RNFS.readFile(file.path);
      }
    }
  } catch (e) {
    log.error('[LOGGER] Unable to get log file');
  }
};

export { log, getLogs };
