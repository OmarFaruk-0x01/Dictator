import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import {logger, consoleTransport, fileAsyncTransport} from 'react-native-logs';
import RNFS from 'react-native-fs';

const OUTPUT_PATH = __DEV__
  ? RNFS.ExternalDirectoryPath
  : RNFS.DocumentDirectoryPath;
const LOGFILENAME = 'com-dictionary-log.txt';
const FVWORDS = '/FV_WORDS';
const FVWORDWPATH = OUTPUT_PATH + FVWORDS;

const config = {
  transport: __DEV__ ? consoleTransport : fileAsyncTransport,
  severity: __DEV__ ? 'debug' : 'error',
  transportOptions: {
    FS: RNFS,
    colors: 'ansi',
    filePath: OUTPUT_PATH,
    fileName: 'com-dictionary-log.txt',
    fileLogName: 'com-dictionary-log.txt',
  },
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  dateFormate: 'time',
  printLevel: true,
  printDate: true,
  enable: true,
  async: true,
};

const LOG = logger.createLogger(config);

const IsFileOrDirExists = async (path) => {
  try {
    return await RNFS.exists(path);
  } catch (e) {
    LOG.error('File or Dir Exists error: ' + String(e));
    return false;
  }
};
const RemoveWord = async (word) => {
  try {
    await RNFS.unlink(FVWORDWPATH + `/${word.toUpperCase()}`);
    ToastAndroid.showWithGravityAndOffset(
      `${word} removed `,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100.0,
    );
  } catch (e) {
    LOG.error('Remove Favourite Error: ', String(e));
    ToastAndroid.showWithGravityAndOffset(
      'Somthing went worng',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100.0,
    );
  }
};

const ReadWord = async (word, Key) => {
  try {
    const fileResp = await RNFS.readFile(
      FVWORDWPATH + `/${word.toUpperCase()}`,
    );
    return JSON.parse(fileResp)[Key];
  } catch (e) {
    LOG.error('Read Favourite Error: ', String(e));
    ToastAndroid.showWithGravityAndOffset(
      'Somthing went worng',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100.0,
    );
    return {};
  }
};
const ReadWord_All_Info = async (word) => {
  try {
    const fileResp = await RNFS.readFile(
      FVWORDWPATH + `/${word.toUpperCase()}`,
    );
    return JSON.parse(fileResp);
  } catch (e) {
    LOG.error('Read Favourite Error: ', String(e));
    ToastAndroid.showWithGravityAndOffset(
      'Somthing went worng',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100.0,
    );
    return {};
  }
};

const WriteWord = async (word, wordInfo, key) => {
  word = word.toUpperCase();
  const WordFilePath = FVWORDWPATH + `/${word}`;
  try {
    if (await IsFileOrDirExists(WordFilePath)) {
      const fileContentJSON = await ReadWord_All_Info(word);
      fileContentJSON[key] = wordInfo;
      LOG.info(fileContentJSON);
      await RNFS.writeFile(WordFilePath, JSON.stringify(fileContentJSON));
      ToastAndroid.showWithGravityAndOffset(
        `${word}'s ${key} added to offline`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100.0,
      );
    } else {
      var tmp = {
        definition: {},
        examples: [],
        synonyms: [],
        antonyms: [],
      };
      tmp[key] = wordInfo;
      await RNFS.writeFile(WordFilePath, JSON.stringify(tmp));
      ToastAndroid.showWithGravityAndOffset(
        `${word}'s ${key} added to offline`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100.0,
      );
    }
  } catch (e) {
    ToastAndroid.showWithGravityAndOffset(
      'Somthing went worng',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100.0,
    );
    LOG.error('Add to favourite Error : ' + String(e));
  }
};

const ReadAllWords = async () => {
  try {
    await RNFS.mkdir(FVWORDWPATH);
    const allFiles = await RNFS.readDir(FVWORDWPATH);
    const allWordsFile = allFiles.filter((file) => file.isFile());
    return allWordsFile;
  } catch (e) {
    LOG.error('Read All Words Error : ' + String(e));
    ToastAndroid.showWithGravityAndOffset(
      'Somthing went worng',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100.0,
    );
    return [];
  }
};

const isPermitted = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App Need to access you storage.',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      ToastAndroid.showWithGravityAndOffset(
        'Failed to access your storage',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100.0,
      );
      return false;
    }
  } else {
    return true;
  }
};

const CheckValidEmail = (e) => {
  if (!e.includes('@')) return false;
  return true;
};

const ShareMessage =
  'Dictator. A word search engine app. Extend your vocabulary knowladge with dictator. \nApp Link: play.google.com/store/apps/details?id=com.dictator';

export {
  LOG,
  CheckValidEmail,
  isPermitted,
  WriteWord,
  ReadWord,
  FVWORDWPATH,
  LOGFILENAME,
  FVWORDS,
  OUTPUT_PATH,
  ReadAllWords,
  RemoveWord,
  ShareMessage,
};
