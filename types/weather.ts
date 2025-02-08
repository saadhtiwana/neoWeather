export interface WeatherData {
  hourly: {
    time: Date[]
    temperature: Float32Array
    precipitationProbability: Float32Array
    weathercode: Float32Array
    windspeed: Float32Array
  }
  daily: {
    time: Date[]
    weathercode: Float32Array
    temperatureMax: Float32Array
    temperatureMin: Float32Array
    sunrise: Float32Array
    sunset: Float32Array
  }
}

export interface Location {
  lat: number
  lon: number
  name: string
}

