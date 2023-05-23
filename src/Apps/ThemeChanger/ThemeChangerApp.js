import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import getStyles from './styles';

export default class ThemeChangerApp extends Component {
  constructor() {
    super();
    this.state = { useDarkTheme: false };
  }

  toggleTheme() {
    this.setState({ useDarkTheme: !this.state.useDarkTheme });
  }

  render() {
    const styles = getStyles(this.state.useDarkTheme);
    const backgroundColor = StyleSheet.flatten(
      styles.container,
    ).backgroundColor;

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Button
            title={backgroundColor}
            onPress={this.toggleTheme.bind(this)}
          />
        </View>
      </View>
    );
  }
}
