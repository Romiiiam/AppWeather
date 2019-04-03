import React from 'react';
import { StyleSheet, View, Animated, Image, Text, AppState, TextInput, Button } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { API_KEY } from './utils/WeatherAPIKey';

import Weather from './components/Weather';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    appState: AppState.currentState,
    error: null,
    value: ""
  };


  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    navigator.geolocation.getCurrentPosition(
      position => {
        this.interval = setInterval(() => {
          this.fetchWeather(position.coords.latitude, position.coords.longitude)
        }, 5000);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  fetchWeather(lat, lon) {
    fetch(
      `https://openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metrics`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          town: json.name,
          isLoading: false
        });
      });
  }

  _handleAppStateChange = (nextAppState) => {
   if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.interval = setInterval(() => {
          this.fetchWeather(position.coords.latitude, position.coords.longitude)
        }, 5000);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
   } else {
     clearInterval(this.interval);
   }
   this.setState({appState: nextAppState});
 };

  search = () =>{
    console.log(this.state.value);
  }

  changeHandler = (e) =>{
    let value= e.target.value;
    console.log(value);
  }

  render() {
    const { isLoading, weatherCondition, temperature, town } = this.state;
    const temp = Math.round(this.state.temperature);
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Image
                 style={{width: 300, height: 200}}
                 source={{uri: 'https://i.pinimg.com/originals/ea/ed/af/eaedaf4b07d22cbb239d4d47b5613c63.gif'}} />
            </View>
          ) : (
              <Weather weather={weatherCondition} town={town} temperature={temp} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF'
  },
  loadingText: {
    fontSize: 30
  }
});
