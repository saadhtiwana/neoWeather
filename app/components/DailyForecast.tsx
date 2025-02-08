import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react"
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

export default function DailyForecast({ data }) {
  return (
    <div className="space-y-4">
      {data.time.map((day, index) => {
        const WeatherIcon = weatherIcons[data.weathercode[index]] || Cloud
        return (
          <motion.div
            key={index}
            className="flex items-center justify-between backdrop-blur-3xl bg-white/5 rounded-2xl p-4 border border-white/10"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4">
              <p className="text-lg font-medium w-24">{day.toLocaleDateString([], { weekday: "short" })}</p>
              <WeatherIcon className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex items-center gap-4">
              <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                {Math.round(data.temperatureMax[index])}°
              </p>
              <p className="text-lg text-white/70">{Math.round(data.temperatureMin[index])}°</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

