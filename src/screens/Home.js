import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { List } from 'react-native-paper';

import ProfileCardApp from '../Apps/ProfileCard/ProfileCard';
import ThemeChangerApp from '../Apps/ThemeChanger/ThemeChangerApp';
import CardViewerApp from '../Apps/CardViewer/CardViewerApp';

const Home = ({ navigation }) => {

  const [expanded, setExpanded] = useState(true);

  const navigate = (route) => (navigation.navigate(route))

  return (
    <List.Accordion title="Applications" left={props => <List.Icon {...props} icon="folder" />} expanded={expanded} onPress={() => setExpanded(!expanded)}  >
      <List.Item title="ProfileCardApp" left={props => <List.Icon {...props} icon="folder" />} style={{ paddingLeft: 20 }} onPress={() => (navigate(ProfileCardApp))}  />
      <List.Item title="ThemeChangerApp" left={props => <List.Icon {...props} icon="folder" />} style={{ paddingLeft: 20 }} onPress={() => (navigate(ThemeChangerApp))} />
      <List.Item title="CardViewerApp" left={props => <List.Icon {...props} icon="folder" />} style={{ paddingLeft: 20 }} onPress={() => (navigate(CardViewerApp))} />
      <List.Item title="ChartApp" left={props => <List.Icon {...props} icon="folder" />} style={{ paddingLeft: 20 }} onPress={() => (navigate("ChartApp"))} />
      <List.Item title="MaskedView" left={props => <List.Icon {...props} icon="folder" />} style={{ paddingLeft: 20 }} onPress={() => (navigate("MaskedViewApp"))} />
      <List.Item title="CarouselApp" left={props => <List.Icon {...props} icon="folder" />} style={{ paddingLeft: 20 }} onPress={() => (navigate("CarouselApp"))} />
      <List.Item title="Block creator" left={props => <List.Icon {...props} icon="folder" />} style={{ paddingLeft: 20 }} onPress={() => (navigate("SliderApp"))} />
    </List.Accordion>
  )
}

export default Home;