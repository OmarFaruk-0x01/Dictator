import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const ExamplesSubCard = ({text, isFav}) => {
  const theme = useContext(ThemeContext);

  return (
    <View>
      <View
        style={{
          paddingHorizontal: !isFav ? 5 : 0,
          paddingVertical: 5,
          paddingRight: isFav ? 10 : 0,
        }}>
        <View
          style={{
            paddingLeft: !isFav ? 10 : 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 3,
              marginRight: 4,
              height: '100%',
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
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ExamplesSubCard);
