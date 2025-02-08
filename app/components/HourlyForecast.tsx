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

export default function HourlyForecast({ data }) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4">
          {data.time.slice(0, 24).map((time, index) => {
            const WeatherIcon = weatherIcons[data.weathercode[index]] || Cloud
            return (
              <motion.div
                key={index}
                className="flex-shrink-0 w-24 backdrop-blur-3xl bg-white/5 rounded-2xl p-4 border border-white/10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <p className="text-sm text-white/70 mb-2">
                  {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
                <WeatherIcon className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                  {Math.round(data.temperature[index])}°
                </p>
                <p className="text-sm text-white/70">{data.precipitationProbability[index]}%</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

