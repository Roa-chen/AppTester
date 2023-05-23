import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableHighlight,
} from 'react-native';

const data = [
  {
    name: 'Arsène Chardon',
    occupation: 'React Native Developer',
    description:
      'azertyuiopqsdfghjklmwxcvbn azertyuiopqsdfghjklmwxcvbnazertyuiopqsdfghjklmwxcvbn',
    expose: false,
  },
  {
    name: 'Gaetan Guenat',
    occupation: 'Strong man',
    description:
      'azertyuiopqsdfghjklmwxcvbn azertyuiopqsdfghjklmwxcvbnazertyuiopqsdfghjklmwxcvbn',
    expose: false,
  },
  {
    name: 'Kilian Louis-Martens',
    occupation: 'Golfer',
    description:
      'azertyuiopqsdfghjklmwxcvbn azertyuiopqsdfghjklmwxcvbnazertyuiopqsdfghjklmwxcvbn',
    expose: false,
  },
];

class ProfileCard extends Component {
  constructor() {
    super();
  }

  render() {
    const {name, occupation, description, onPress, expose} = this.props;
    let styles = stylesReduced;

    if (expose) {
      styles = stylesWide;
    }

    return (
      <TouchableHighlight onPress={onPress} underlayColor={'rgba(0, 0, 0, 0)'}>
        <View style={styles.card}>
          <View style={styles.cardImageContainer} />
          <View>
            <Text style={styles.cardName}>{name}</Text>
          </View>
          <View style={styles.cardOccupationContainer}>
            <Text style={styles.cardOccupation}>{occupation}</Text>
          </View>
          <View>
            <Text style={styles.cardDescription}>{description}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

ProfileCard.prototype = {
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  expose: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default class ProfileCardApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {data: data};
  }

  handleProfileCardPress = index => {
    const expose = !this.state.data[index].expose;

    // eslint-disable-next-line no-shadow
    const {data} = this.state;

    data.forEach((item, i) => {
      item.expose = i === index ? expose : false;
    });

    this.setState({data});
  };

  render() {
    const list = this.state.data.map(function (item, index) {
      const {name, occupation, description, expose} = item;
      return (
        <ProfileCard
          key={index}
          name={name}
          occupation={occupation}
          description={description}
          expose={expose}
          onPress={this.handleProfileCardPress.bind(this, index)}
        />
      );
    }, this);
    return <View style={stylesReduced.container}>{list}</View>;
  }
}

const profileCardColor = 'dodgerblue';
const background = false;

const stylesWide = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 20,
    backgroundColor: profileCardColor,
    width: 300, // 300
    height: 400, // 400
    borderColor: 'black',
    borderWidth: 3, // 3
    borderStyle: 'solid',
    borderRadius: 20, // 20
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: 10},
        shadowOpacity: 1,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  cardImageContainer: {
    backgroundColor: 'white',
    width: 120, // 120
    height: 120, // 120
    borderColor: 'black',
    borderWidth: 3, // 3
    borderRadius: 60, // 60
    alignItems: 'center',
    marginTop: 30, // 30
    paddingTop: 30, // 30
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: 10},
        shadowOpacity: 1,
      },
      android: {
        borderWidth: 3, // 3
        borderColor: 'black',
        elevation: 15,
      },
    }),
  },
  cardImage: {
    width: 80, // 80
    height: 80, // 80
  },
  cardName: {
    color: 'white',
    marginTop: 30, // 30
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3, // 3
  },
  cardOccupationContainer: {
    borderColor: 'black',
    borderBottomWidth: 3, // 3
  },
  cardOccupation: {
    marginTop: 10, // 10
    marginBottom: 10, // 10
  },
  cardDescription: {
    marginTop: 10, // 10
    marginRight: 40, // 40
    marginLeft: 40, // 40
    marginBottom: 10, // 10
  },
  cardThumbnail: {
    // transform: [{scale: 0.2}],
    transform: [{scale: 5}],
  },
});

const stylesReduced = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: background ? 'black' : 'white',
  },
  card: {
    marginBottom: 20,
    backgroundColor: profileCardColor,
    width: 60, // 300
    height: 80, // 400
    borderColor: 'black',
    borderWidth: 0.6, // 3
    borderStyle: 'solid',
    borderRadius: 4, // 20
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: 10},
        shadowOpacity: 1,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  cardImageContainer: {
    backgroundColor: 'white',
    width: 24, // 120
    height: 24, // 120
    borderColor: 'black',
    borderWidth: 0.6, // 3
    borderRadius: 12, // 60
    alignItems: 'center',
    marginTop: 6, // 30
    paddingTop: 6, // 30
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: 10},
        shadowOpacity: 1,
      },
      android: {
        borderWidth: 0.6, // 3
        borderColor: 'black',
        elevation: 15,
      },
    }),
  },
  cardImage: {
    width: 16, // 80
    height: 16, // 80
  },
  cardName: {
    color: 'white',
    fontSize: 2.2, // 11 (default)
    marginTop: 0.6, // 30
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 0.6, // 3
  },
  cardOccupationContainer: {
    borderColor: 'black',
    borderBottomWidth: 0.6, // 3
  },
  cardOccupation: {
    marginTop: 2, // 10
    marginBottom: 2, // 10
    fontSize: 2.2, // 11 (default)
  },
  cardDescription: {
    marginTop: 2, // 10
    marginRight: 8, // 40
    marginLeft: 8, // 40
    marginBottom: 2, // 10
    fontSize: 2.2, // 11 (default)
  },
  cardThumbnail: {
    // transform: [{scale: 0.2}],
    transform: [{scale: 5}],
  },
});

// const styles = stylesReduced;
