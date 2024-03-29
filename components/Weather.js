import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button, Alert, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';


export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      temperature: this.props.temperature,
      weather: this.props.weather,
      town: this.props.town
    };
    console.log(this.state);
  }

  _onPressButton() {
    fetch(
      `https://openweathermap.org/data/2.5/find?q=${this.state.value}&type=like&sort=population&cnt=30&appid=b6907d289e10d714a6e88b30761fae22&_=1554296103692`
    )
      .then(res => res.json())
      .then(json => {
        let new_val = Math.round(json.list[0].main.temp - 273.15) ;
        this.setState({
          temperature: new_val,
          weather: json.list[0].weather[0].main,
          town: json.list[0].name,
          isLoading: false
        });
        console.log(this.state);
      });
  }

  Hide_Soft_Keyboard=()=>{

    Keyboard.dismiss();

  }

  functionCombined() {
    this._onPressButton();
    this.Hide_Soft_Keyboard();
}

render(){
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[this.state.weather].color }
      ]}
    >
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={{uri: weatherConditions[this.state.weather].img}}>
      <View style={{marginTop: 10 ,flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
        <TextInput
          style={{width : '60%',height:40, paddingLeft:10, borderColor: 'gray', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
          onChangeText={(value) => this.setState({value})}
          value={this.state.value}
        />
        <Button

          onPress={() => this.functionCombined()}
          title="Recherche"
          style={styles.buttonStyle}
        />
      </View>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={72}
          name={weatherConditions[this.state.weather].icon}
          color={'#fff'}
        />
        <Text style={styles.tempText}>{this.state.temperature}˚</Text>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.title_town}>{this.state.town}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[this.state.weather].title}</Text>
      </View>
      </ImageBackground>
    </View>
  );
};

}

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  buttonStyle: {
    color: 'red',
    marginTop: 20,
    padding: 20,
    backgroundColor: 'green'
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
