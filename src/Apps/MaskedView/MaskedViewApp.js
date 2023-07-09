import React from 'react';
import { Text, View, Image } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import backgroundImage from './backgroundImage.jpg'

const App = () => {

  return (
    <View style={{backgroundColor: '#444', flex: 1}}>

      <MaskedView
        style={{ flexDirection: 'row', height: '100%', backgroundColor: 'black', flex: 1 }}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'rgba(0, 0, 0, 0)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 60,
                color: 'rgba(0, 0, 0, 1)',
                fontWeight: 'bold',
              }}
            >
              Basic Mask
            </Text>
          </View>
        }
      >
        <Image source={backgroundImage} style={{
          flex: 1,
          height: '100%',
        }} />
      </MaskedView>
    </View>
  );
}

export default App