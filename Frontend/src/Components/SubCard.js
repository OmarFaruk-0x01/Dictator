import React, {useContext, memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

import DefinationList from './DefinationList';

const SubCard = ({lang, info, limit}) => {
  const theme = useContext(ThemeContext);

  const isHasEmpty = info?.part_of_speech?.filter(
    (pos) => Object.entries(pos.info).length !== 0,
  );
  if (isHasEmpty?.length > 0 || lang !== 'en') {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
          }}>
          <View
            style={{
              paddingHorizontal: 10,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              marginRight: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 50,
                backgroundColor: theme.primaryColor,
                marginRight: 5,
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                color: '#000',
                fontSize: 17,
                top: -2,
                fontFamily: lang == 'en' ? 'relSemiBold' : 'relSemiBold',
              }}>
              {lang == 'en' ? info.type + ' English' : 'বাংলা'}
            </Text>
          </View>
          <Text
            style={{
              alignSelf: 'center',
              color: theme.textPlaceHolder,
              fontFamily: 'relRegular',
            }}>
            By {lang == 'en' ? 'Cambridge' : 'Google'}
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}>
          {lang !== 'en' ? (
            <View
              style={{
                paddingLeft: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 15,
                  marginRight: 4,
                  height: 3,
                  backgroundColor: theme.primaryColor,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: '#000',
                  fontFamily: 'relSemiBold',
                  top: -2,
                }}>
                {info.bn ? info.bn.bn : null}
              </Text>
            </View>
          ) : (
            <DefinationList limit={limit || false} defInfo={info} />
          )}
        </View>
      </View>
    );
  }
  return null;
};

export default React.memo(SubCard);
