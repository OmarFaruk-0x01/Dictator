import React from 'react';
import {View, Text, TouchableOpacity, Linking, Share} from 'react-native';
import HeaderWithOutState from '../Components/HeaderWithOutState';
import AppHeaderIcon from '../Components/SvgIcons/AppHeaderIcon';
import AppSubIcon from '../Components/SvgIcons/SubIcon';

export const AboutApp = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderWithOutState headerTitle={'About us'} navigation={navigation} />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <AppHeaderIcon
          width={200}
          height={100}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            left: 8,

          }}
        />
        <AppSubIcon style={{left: 5}} />
      </View>
      <Text style={{
        color: '#000',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 15,
        fontFamily: 'relRegular'
      }}>
        Powerd By
      </Text>
      <Text style={{
        color: '#2CBC70',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 22,
        fontFamily: 'relBold'
      }}>
        Hostever<Text style={{
        color: '#000',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 10,
        fontFamily: 'relBold',
        textAlignVertical: 'bottom'
      }}>Code For Host</Text>
      </Text>
      <Text style={{
        color: '#000',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 13,
        fontFamily: 'relBold',
        textAlignVertical: 'bottom'
      }}>www.hostever.com</Text>
      <Text
        style={{
          paddingHorizontal: 10,
          textAlign: 'center',
          marginTop: 10,
          fontSize: 13,
          fontFamily: 'relRegular',
          color: '#000'
        }}>
        Dictator is a Word Search Engine. In saa Allah, This app will help you
        to make your IELTS preparation better. This app is specially designed
        for IELTS students but anyone can use this app for increasing their
        vocabulary knowledge. This app will provide you a bunch of Eng to Eng
        definition, examples, synonyms, and antonyms with offline saving
        features. You can export them as a pdf.
      </Text>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          marginVertical: 5,
          paddingHorizontal: 5,
        }}>
        <Text style={{marginRight: 6, fontFamily: 'relBold', fontSize: 14, color: '#000'}}>
          App Version:{' '}
        </Text>
        <Text style={{fontSize: 13, fontFamily: 'relSemiBold', color: '#666'}}>
          1.4
        </Text>
      </View>
      <View
        style={{  
          flexDirection: 'row',
          marginVertical: 5,
          paddingHorizontal: 5,
        }}>
        <Text style={{marginRight: 6, fontFamily: 'relBold', fontSize: 14, color: '#000'}}>
          Developer Contact:{' '}
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={async () => {
            await Linking.openURL('mailto:programmer.omar.dev@gmail.com');
          }}>
          <Text
            style={{fontSize: 13, fontFamily: 'relSemiBold', color: '#666'}}>
            programmer.omar.dev@gmail.com
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          position: 'absolute',
          bottom: 10,
          textAlign: 'center',
          width: '100%',
          color: '#666',
          fontSize: 12,
        }}>
        Copyright &copy; 2021{'\n'}@programer.omar.dev, All rights reserved
      </Text>
    </View>
  );
};
