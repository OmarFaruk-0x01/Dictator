import React from 'react';
import {View, Text} from 'react-native';
import WordScreen from '../Screens/WordScreen';
import ExamplesTab from '../Screens/ExamplesTab';
import SynonymsTab from '../Screens/SynonymsTab';
import AntonymsTab from '../Screens/AntonymsTab';
import FevouriteDetailsScreen from '../Screens/FavouiteDetailsScreen';
import FavouriteExamplesScreen from '../Screens/FavouriteExamplesScreen';
import FavouriteNymsScreen from '../Screens/FavouriteNymsScreen';

const DiscoverScreenRoutes = [
  {name: 'Definition', component: WordScreen},
  {name: 'Examples', component: ExamplesTab},
  {name: 'Synonyms', component: SynonymsTab},
  {name: 'Antonyms', component: AntonymsTab},
];

const FavouriteScreenRoutes = [
  {name: 'Definition', component: FevouriteDetailsScreen},
  {name: 'Examples', component: FavouriteExamplesScreen},
  {
    name: 'Synonyms',
    component: (props) => (
      <FavouriteNymsScreen {...props} routeName={'Synonyms'} />
    ),
  },
  {
    name: 'Antonyms',
    component: (props) => (
      <FavouriteNymsScreen {...props} routeName={'Antonyms'} />
    ),
  },
];
export {DiscoverScreenRoutes, FavouriteScreenRoutes};
