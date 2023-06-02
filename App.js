import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native';



const API_KEY = '7477b380a332d39bede2d6bd4b25255e';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&lang=pt_br&units=metric`
      );
      const data = await response.json();
      setWeatherData({ ...data, main: { ...data.main, temp: parseFloat(data.main.temp) } });
    } catch (error) {
      console.error(error);
    }
  };

  const [city, setCity] = useState('');

  const handleCityChange = (text) => {
    setCity(text);
  };


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.ah1}>
          Previsão do Tempo
        </Text>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/010/892/343/original/sun-transparent-background-free-png.png' }}
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite o nome de uma cidade"
          value={city}
          onChangeText={handleCityChange}
        />
        <TouchableOpacity onPress={fetchWeatherData} style={styles.button}>
          <Text style={styles.buttonText}>Obter Informações sobre o Tempo</Text>
        </TouchableOpacity>
      </View>
      {weatherData && (
        <View>
          <Text style={styles.weatherText}>
            Cidade: {weatherData.name}
          </Text>
          <Text style={styles.weatherText}>
            Temperatura: {weatherData.main.temp.toFixed(1)}°C
          </Text>
          <Text style={styles.weatherText}>
            Condição: {weatherData.weather[0].description}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6FA70'
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  ah1: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginLeft: 60,
  },
});

export default App;


