"use client"

import { useState, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import dynamic from "next/dynamic"
import { fetchWeatherApi } from "openmeteo"
import WeatherDisplay from "./components/WeatherDisplay"
import LocationSearch from "./components/LocationSearch"
import LoadingUI from "./components/LoadingUI"
import type { WeatherData, Location } from "../types/weather"

const Earth = dynamic(() => import("./components/Earth"), { ssr: false })

export default function Home() {
  const [location, setLocation] = useState<Location>({
    lat: 31.7102,
    lon: 72.0833,
    name: "Mitha Tiwana",
  })
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true)
      const { lat, lon } = location
      const params = {
        latitude: lat,
        longitude: lon,
        hourly: "temperature_2m,precipitation_probability,weathercode,windspeed_10m",
        daily: "weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset",
        timezone: "auto",
        forecast_days: 7,
      }

      try {
        const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params)
        const response = responses[0]

        const hourly = response.hourly()
        const daily = response.daily()

        setWeatherData({
          hourly: {
            time: Array.from({ length: hourly.time().length }, (_, i) => new Date(hourly.time(i) * 1000)),
            temperature: hourly.variables(0).valuesArray(),
            precipitationProbability: hourly.variables(1).valuesArray(),
            weathercode: hourly.variables(2).valuesArray(),
            windspeed: hourly.variables(3).valuesArray(),
          },
          daily: {
            time: Array.from({ length: daily.time().length }, (_, i) => new Date(daily.time(i) * 1000)),
            weathercode: daily.variables(0).valuesArray(),
            temperatureMax: daily.variables(1).valuesArray(),
            temperatureMin: daily.variables(2).valuesArray(),
            sunrise: daily.variables(3).valuesArray(),
            sunset: daily.variables(4).valuesArray(),
          },
        })
      } catch (error) {
        console.error("Error fetching weather data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
  }, [location])

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 pb-20">
        <h1 className="text-6xl font-black text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500">
          NeoWeather
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="h-[600px] rounded-3xl overflow-hidden backdrop-blur-xl bg-black/30 border border-white/10 shadow-2xl">
            <Canvas className="w-full h-full">
              <Suspense fallback={null}>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                <Earth position={[0, 0, 0]} location={location} />
              </Suspense>
            </Canvas>
          </div>

          <div className="space-y-6">
            <LocationSearch onLocationChange={setLocation} />
            {isLoading ? <LoadingUI /> : weatherData ? <WeatherDisplay location={location} data={weatherData} /> : null}
          </div>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 text-center p-4 bg-black/50 backdrop-blur-md border-t border-white/10">
        <p className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Made with 💖 and ☕ by Saad Tiwana 🚀
        </p>
      </footer>
    </main>
  )
}

