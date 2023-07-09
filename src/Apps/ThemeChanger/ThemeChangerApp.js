import React, { Component } from 'react';
import { View, Button, StyleSheet, Vibration, Dimensions, Text } from 'react-native';
import getStyles from './styles';

export default class ThemeChangerApp extends Component {
  constructor() {
    super();
    this.state = { 
      useDarkTheme: false,
      dimensions: Dimensions.get('window'),
      screen: Dimensions.get('screen'),
    };
  }

  componentDidMount() {
    const subscription = Dimensions.addEventListener(
      'change',
      (dimensions) => this.setState(dimensions)
    )
  }

  toggleTheme() {
    this.setState({ useDarkTheme: !this.state.useDarkTheme });
    Vibration.vibrate(10);
  }

  render() {
    const styles = getStyles(this.state.useDarkTheme);
    const backgroundColor = StyleSheet.flatten(
      styles.container,
    ).backgroundColor;

    return (
      <View style={styles.container}>
        <Text style={{color: 'black'}}>
          {JSON.stringify(this.state.screen)}
        </Text>
        <View style={styles.box}>
          <Button
            title={backgroundColor}
            onPress={this.toggleTheme.bind(this)}
          />
        </View>
        <Text style={{color: 'black'}}>
          {JSON.stringify(this.state.dimensions)}
        </Text>
      </View>
    );
  }
}
