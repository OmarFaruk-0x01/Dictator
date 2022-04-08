import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const NymsSubCard = ({all_nyms, wordInfo, routeName, limit}) => {
  const theme = useContext(ThemeContext);
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
              fontFamily: 'relSemiBold',
            }}>
            Definition
          </Text>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            color: theme.textPlaceHolder,
            fontFamily: 'relRegular',
          }}>
          By Synonyms.com
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 5,
        }}>
        <View
          style={{
            paddingLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 10,

              marginRight: 7,
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
            {wordInfo.definition}
          </Text>
        </View>
      </View>

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
              fontFamily: 'relSemiBold',
            }}>
            Part of Speech
          </Text>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            color: theme.textPlaceHolder,
            fontFamily: 'relRegular',
          }}>
          By Synonyms.com
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 5,
        }}>
        <View
          style={{
            paddingLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 10,

              marginRight: 7,
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
            {wordInfo.part_of_speech}
          </Text>
        </View>
      </View>
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
              fontFamily: 'relSemiBold',
            }}>
            {routeName}
          </Text>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            color: theme.textPlaceHolder,
            fontFamily: 'relRegular',
          }}>
          By Synonyms.com
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 5,
        }}>
        <View
          style={{
            paddingLeft: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          {all_nyms.slice(0, limit || all_nyms.length).map((nym) => (
            <Text
              key={Math.random().toString()}
              style={{
                fontSize: 18,
                color: theme.primaryColor,
                fontFamily: 'relSemiBold',
                backgroundColor: theme.wordBodyColor,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 20,
                marginHorizontal: 5,
                marginBottom: 5,
              }}>
              {nym}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default React.memo(NymsSubCard);
