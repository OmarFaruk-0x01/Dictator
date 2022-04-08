import React, {useCallback, useContext, useState} from 'react';
import {View, StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import {
  getAndroidId,
  getApiLevel,
  getBrand,
  getDeviceId,
  getModel,
  getSystemName,
  getSystemVersion,
} from 'react-native-device-info';
import HeaderWithOutState from '../Components/HeaderWithOutState';
import ThemeContext from '../contexts/ThemeContext';
import FeedBackInput from '../Components/FeedBackInput';
import FeedbackBtn from '../Components/FeedBackBtn';
import {
  CheckValidEmail,
  LOG,
  LOGFILENAME,
  OUTPUT_PATH,
} from '../helpers/config';
import CheckBoxText from '../Components/CheckBoxText';
import axios from 'axios';
import {env} from '../helpers/environment';
import RNFS from 'react-native-fs';
const BaseURL = __DEV__ ? env.d.BaseURL : env.p.BaseURL;

const FeedBackScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [userName, setUserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [feedbackDetails, setFeedbackDetails] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isWithCred, setIsWithCred] = useState(false);
  const [isProgress, setIsProgress] = useState(false);

  const resetInp = useCallback(() => {
    setUserName('');
    setuserEmail('');
    setFeedbackDetails('');
    setIsValidEmail(true);
    setIsWithCred(false);
    setIsProgress(false);
  });

  const sendLogFile = async () => {
    var folderItems = await RNFS.readDir(OUTPUT_PATH);
    var LOGFILEItem = folderItems.filter((e) => e.name === LOGFILENAME);
    try {
      console.log(LOGFILEItem);
      if (LOGFILEItem.length === 0) {
        await RNFS.appendFile(OUTPUT_PATH + '/' + LOGFILENAME, 'APP START ');
        folderItems = await RNFS.readDir(OUTPUT_PATH);
        LOGFILEItem = folderItems.filter((e) => e.name === LOGFILENAME);
      }
      const logFileSendResp = await RNFS.uploadFiles({
        method: 'POST',
        files: [
          {
            name: 'logFile',
            filename: LOGFILEItem[0].name + '#' + (await getAndroidId()) + '.txt',
            filepath: LOGFILEItem[0].path,
            filetype: 'txt',
          },
        ],
        toUrl: BaseURL + 'sendfeedback_attachment',
        headers: {
          Accept: 'application/json',
        },
      }).promise;
      console.log(logFileSendResp);
      if (logFileSendResp.statusCode === 200) {
        console.log(logFileSendResp);
        return {ok: true};
      } else {
        return {ok: false};
      }
    } catch (e) {
      LOG.error('Log File Send Error | ' + String(e));
      return {ok: false};
    }
  };
  const onBtnPress = async () => {
    setIsProgress(true);
    if (!CheckValidEmail(userEmail)) return setIsValidEmail(false);
    try {
      const deviceInfo = {};
      deviceInfo['androidId'] = await getAndroidId();
      if (isWithCred) {
        deviceInfo['apiLevel'] = await getApiLevel();
        deviceInfo['brand'] = await getBrand();
        deviceInfo['deviceId'] = await getDeviceId();
        deviceInfo['model'] = await getModel();
        deviceInfo['systemName'] = await getSystemName();
        deviceInfo['systemVersion'] = await getSystemVersion();
      }
      const logFileSend = await sendLogFile();
      if (logFileSend.ok) {
        const feedBackResp = await axios({
          method: 'post',
          url: BaseURL + 'sendfeedback',
          headers: {
            'Content-Type': 'application/multi-part',
            'x-auth-token-key': 'Allahis1',
          },
          data: JSON.stringify({
            userName,
            userEmail,
            feedbackDetails,
            deviceInfo,
          }),
        });
        if (feedBackResp.data.ok) {
          ToastAndroid.show(
            'Reported Your Feedback To Developer',
            ToastAndroid.LONG,
          );
          resetInp();
        } else {
          LOG.error(
            'FeedBack Send Error | ' + JSON.stringify(feedBackResp.data),
          );
          ToastAndroid.show(feedBackResp.data.error, ToastAndroid.LONG);
          setIsProgress(false);
        }
      } else {
        ToastAndroid.show('Something is wrong', ToastAndroid.LONG);
        setIsProgress(false);
      }
    } catch (e) {
      LOG.error('FeedBack Send Error | ' + String(e));
      ToastAndroid.show('Something is wrong', ToastAndroid.LONG);
      setIsProgress(false);
    }
  };

  return (
    <View style={[StyleSheet.absoluteFillObject, {backgroundColor: '#fff'}]}>
      <HeaderWithOutState headerTitle={'FeedBack'} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FeedBackInput
          theme={theme}
          row={true}
          inpPlaceHolder={'Name'}
          inpTitle={'Your Name'}
          value={userName}
          onChangeEvent={setUserName}
        />
        <FeedBackInput
          theme={theme}
          email={true}
          inpPlaceHolder={'Email'}
          inpTitle={'Your Email'}
          value={userEmail}
          onChangeEvent={setuserEmail}
          isValidEmail={isValidEmail}
          setIsValidEmail={setIsValidEmail}
        />
        <FeedBackInput
          theme={theme}
          multiline={true}
          inpPlaceHolder={'Details'}
          inpTitle={'Feedback / Issue'}
          value={feedbackDetails}
          onChangeEvent={setFeedbackDetails}
        />
        <CheckBoxText
          text={'With your device info'}
          setChecked={setIsWithCred}
          checked={isWithCred}
        />
      </ScrollView>
      <FeedbackBtn
        disabled={!isValidEmail || userName === '' || feedbackDetails === ''}
        onPress={onBtnPress}
        isProgress={isProgress}
      />
    </View>
  );
};
export default FeedBackScreen;
