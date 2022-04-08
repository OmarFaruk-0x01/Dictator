import {
  GenaretExampleHtml,
  GenaretHtml,
  GenaretNymsHtml,
} from './HtmlGenaretions';
import RNHtmlToPDf from 'react-native-html-to-pdf';
import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import RNFS from 'react-native-fs';

const isPermitted = async () => {
  console.log(Platform.OS);
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

async function MKDIR(word) {
  const BasePath =
    RNFS.ExternalStorageDirectoryPath + '/Documents/Dictator/' + word;
  if (!RNFS.exists(BasePath)) {
    RNFS.mkdir(BasePath);
  }
  return BasePath;
}

export const CreatePDF = async (data, word) => {
  if (await isPermitted()) {
    let GenarationHtml = await GenaretHtml(data, word);

    let opt = {
      html: GenarationHtml.html,
      fileName: `${word}_Defination`,
      directory: `file:///storage/emuleted/0/Documents/Dictator`,
    };
    ToastAndroid.showWithGravityAndOffset(
      `Exporting`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100.0,
    );
    let file = await RNHtmlToPDf.convert(opt);
    ToastAndroid.showWithGravityAndOffset(
      `PDF exported to ${file.filePath}`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100.0,
    );
  }
};
export const CreateExamplePDF = async (exmpList, word) => {
  if (await isPermitted()) {
    if (exmpList.length > 0) {
      let GenarationHtml = await GenaretExampleHtml(exmpList, word);

      let opt = {
        html: GenarationHtml,
        fileName: `${word}-ExtraExamples`,
        directory: `file:///storage/emuleted/0/Documents/Dictator`,
      };
      ToastAndroid.showWithGravityAndOffset(
        `Exporting`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100.0,
      );
      let file = await RNHtmlToPDf.convert(opt);
      ToastAndroid.showWithGravityAndOffset(
        `PDF exported to ${file.filePath}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100.0,
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'No Data Found',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100.0,
      );
    }
  }
};
export const CreateNymsPDF = async (nymsData, word, _type) => {
  if (await isPermitted()) {
    if (nymsData.length > 0) {
      let GenarationHtml = await GenaretNymsHtml(nymsData, word);

      let opt = {
        html: GenarationHtml,
        fileName: `${word}-${_type}`,
        directory: `file:///storage/emuleted/0/Documents/Dictator`,
      };
      ToastAndroid.showWithGravityAndOffset(
        `Exporting`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100.0,
      );
      let file = await RNHtmlToPDf.convert(opt);
      ToastAndroid.showWithGravityAndOffset(
        `PDF exported to ${file.filePath}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100.0,
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'No Data Found',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100.0,
      );
    }
  }
};
