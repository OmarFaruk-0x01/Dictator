import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import DetailedPageHeader from '../Components/DetailedPageHeader';
import {TopBarTabs_lessInput} from '../Navigations/TopBarTabs';
import {FavouriteScreenRoutes} from '../helpers/RoutesConf';

const FavouriteItemScreen = ({navigation, route}) => {
  const {headerTitle} = route.params;
  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
      <DetailedPageHeader title={headerTitle} navigation={navigation} />
      <TopBarTabs_lessInput
        title={headerTitle}
        routes={FavouriteScreenRoutes}
        swipeEnabled={true}
      />
    </View>
  );
};

export default React.memo(FavouriteItemScreen);
