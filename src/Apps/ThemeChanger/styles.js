import { StyleSheet } from 'react-native';

export const colors = {
  light: 'white',
  dark: 'black',
};

const baseStyles = StyleSheet.create({
  baseContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseBoxStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    width: 150,
    height: 150,
  },
});

const lightStyles = StyleSheet.create({
  container: {
    ...baseStyles.baseContainerStyle,
    backgroundColor: colors.light,
  },
  box: {
    ...baseStyles.baseBoxStyle,
    borderColor: colors.dark,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    ...baseStyles.baseContainerStyle,
    backgroundColor: colors.dark,
  },
  box: {
    ...baseStyles.baseBoxStyle,
    borderColor: colors.light,
  },
});

export default function getStyleSheet(useDarkTheme) {
  return useDarkTheme ? darkStyles : lightStyles;
}
