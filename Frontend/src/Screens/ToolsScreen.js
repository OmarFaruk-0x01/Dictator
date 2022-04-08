import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import DetailedPageHeader from '../Components/DetailedPageHeader';
import ExportContext from '../contexts/ExportContext';
import ExportedWordChip from '../Components/MarkedWordChip';
import ToolsSection from '../Components/ToolsSection';
import ToolsOptionsCard from '../Components/ToolsOptions';
import SwitchText from '../Components/SwitchText';
import ToolsBtn from '../Components/ToolsBtn';
import { CreateExamplePDF, CreateNymsPDF, CreatePDF } from '../helpers/CreatPDF';

const ExportScreen = ({route, navigation}) => {
  const {exportState, exportDispatch} = useContext(ExportContext);
  const [isSinglePDF, setIsSinglePDF] = useState(false);

  function ExportPDF(){
    exportState.markedWords.forEach(item => {
      console.log(item.definition);
      if (item.definition){
        CreatePDF(item.definition, item.word)
      }
      if (item.examples){
        CreateExamplePDF(item.examples, item.word)
      }
      if (item.synonyms){
        CreateNymsPDF(item.synonyms, item.word, 'Synonyms')
      }
      if (item.antonyms){
        CreateNymsPDF(item.antonyms, item.word, 'Antonyms')
      }
    })


  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <DetailedPageHeader navigation={navigation} title={'Tools'} />
      <View style={styles.container}>
        <ToolsSection title={'Marked Word As Export'}>
          {exportState.markedWords.length === 0 ? (
            <Text style={styles._404_text}>No word for export</Text>
          ) : (
            <View style={[styles.markedExportContainer]}>
              {exportState.markedWords.map(w => (<ExportedWordChip 
              key={w.word} 
              word={w.word}
              isExsits={{
                defination: w.definition ? true : false,
                examples: w.examples ? true : false,
                synonyms: w.synonyms ? true : false,
                antonyms: w.antonyms ? true : false,
              }}
              />))}
              {/* <ExportedWordChip  word={'Value'}/> */}
            </View>
          )}
        </ToolsSection>
      
       
      </View>
      <SwitchText
          setChecked={setIsSinglePDF}
          checked={isSinglePDF}
          text={'Single PDF for each word'}
        />
      <ToolsBtn underDev onPress={ExportPDF}/>
    </SafeAreaView>
  );
};

export default ExportScreen;
const styles = StyleSheet.create({
  container: {
    // padding: 10,
    flex: 1,
    paddingTop: 10,
  },
  markedExportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 4,
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exportOptionView: {},
  _404_text: {
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 6,
    fontFamily: 'relRegular',
    color: '#000'
  },
});
