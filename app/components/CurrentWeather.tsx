import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets } from "lucide-react"
import { motion } from "framer-motion"

const weatherIcons = {
  0: Sun,
  1: Sun,
  2: Cloud,
  3: Cloud,
  45: Cloud,
  48: Cloud,
  51: CloudRain,
  53: CloudRain,
  55: CloudRain,
  56: CloudRain,
  57: CloudRain,
  61: CloudRain,
  63: CloudRain,
  65: CloudRain,
  66: CloudRain,
  67: CloudRain,
  71: CloudSnow,
  73: CloudSnow,
  75: CloudSnow,
  77: CloudSnow,
  80: CloudRain,
  81: CloudRain,
  82: CloudRain,
  85: CloudSnow,
  86: CloudSnow,
  95: CloudLightning,
  96: CloudLightning,
  99: CloudLightning,
}

export default function CurrentWeather({ data }) {
  const currentHour = new Date().getHours()
  const WeatherIcon = weatherIcons[data.hourly.weathercode[currentHour]] || Cloud

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-3xl"></div>
      <motion.div
        className="relative backdrop-blur-3xl rounded-3xl p-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <WeatherIcon size={80} className="text-blue-400" />
            </motion.div>
            <div>
              <motion.h3
                className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {Math.round(data.hourly.temperature[currentHour])}°C
              </motion.h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="flex items-center gap-2 bg-white/5 p-4 rounded-2xl"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Droplets className="text-blue-400" />
              <div>
                <p className="text-sm text-white/70">Precipitation</p>
                <p className="text-lg font-semibold">{data.hourly.precipitationProbability[currentHour]}%</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 bg-white/5 p-4 rounded-2xl"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Wind className="text-violet-400" />
              <div>
                <p className="text-sm text-white/70">Wind Speed</p>
                <p className="text-lg font-semibold">{Math.round(data.hourly.windspeed[currentHour])} km/h</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

