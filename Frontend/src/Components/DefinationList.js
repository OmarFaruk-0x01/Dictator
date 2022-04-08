import React from 'react';
import {View, Text} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

import Defination from './Defination';
const DefinationList = ({defInfo, limit}) => {
  if (defInfo == undefined) {
    return null;
  }

  const renderDefination = () => {
    return defInfo.part_of_speech
      .slice(0, limit || defInfo.part_of_speech.length + 1)
      .map((pos) => {
        return Object.entries(pos.info)
          .slice(0, limit || Object.entries(pos.info).length + 1)
          .map(([defType, defValue]) => {
            defValue = defValue.slice(
              0,
              limit || Object.entries(pos.info).length + 1,
            );
            return defValue.map((def) => (
              <Defination
                defObj={{...def, word: defInfo.word, type: defInfo.type}}
                defType={defType}
                posType={pos.pos_type}
                key={Math.random()}
              />
            ));
          });
      });
  };

  return <View style={{paddingLeft: 17}}>{renderDefination()}</View>;
};
export default React.memo(DefinationList);
