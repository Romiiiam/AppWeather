import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';

state = {
  value: "test"
};

search = () =>{
  console.log(this.state.value);
}

changeHandler = (e) =>{
  let value= e.target.value;
  console.log(value);
}


const Weather = ({ weather, temperature, town }) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[weather].color }
      ]}
    >
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={{uri: weatherConditions[weather].img}}>
      <View style={{marginTop: 80 ,flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
        <Text>Search by location </Text>
        <TextInput
          style={{width : 200,height:50, borderColor: 'gray', borderWidth: 1, borderRadius: 10,backgroundColor: 'white'}}
          onChangeText={(value) => this.changeHandler(value)}
          value=""
        />
        <Button
          onPress={changeHandler}
          title={this.state.value}
          color="#841584"
        />
      </View>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={72}
          name={weatherConditions[weather].icon}
          color={'#fff'}
        />
        <Text style={styles.tempText}>{temperature}˚</Text>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.title_town}>{town}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
      </View>
      </ImageBackground>
    </View>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tempText: {
    fontSize: 72,
    color: '#fff'
  },
  centerContainer: {
    alignItems:'center'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
  title_town: {
    fontSize: 50,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff'
  },
  title: {
    fontSize: 50,
    color: '#fff'
  },
});

export default Weather;
