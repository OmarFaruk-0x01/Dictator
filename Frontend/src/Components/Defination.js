import React, {useContext, useState} from 'react';
import {View, Text, Modal} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

import DefinationInfoView from './DefinationInfoVIew';
import WordNotation from './WordNotation';

const Defination = ({defObj, defType, posType}) => {
  const theme = useContext(ThemeContext);
  const [modalShow, setModalShow] = useState(false);

  return !defObj.defination ? null : (
    <>
      <Modal
        animationType={'slide'}
        visible={modalShow}
        onRequestClose={(e) => {
          setModalShow(false);
        }}
        transparent>
        <DefinationInfoView
          defObj={defObj}
          defType={defType}
          posType={posType}
          closeFunc={setModalShow}
        />
      </Modal>
      <View
        style={{
          marginBottom: 5,
          padding: 2,
          paddingVertical: 3,
          borderLeftWidth: 3.5,
          borderLeftColor: theme.primaryColor,
          paddingLeft: 5,
          marginVertical: 5,
        }}>

        <WordNotation
          defType={defType}
          posType={posType}
          label={defObj.label}
          openFunc={setModalShow}
        />

        <View>
          <Text
            style={{
              color: '#000',
              fontFamily: 'relSemiBold',
              fontSize: 21,
              margin: 0,
              padding: 0,
              paddingTop: 0,
              paddingBottom: 3,
            }}>
            {defObj.defination.trim()}
          </Text>
        </View>
      </View>
    </>
  );
};

export default React.memo(Defination);
