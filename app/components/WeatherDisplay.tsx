"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import CurrentWeather from "./CurrentWeather"
import HourlyForecast from "./HourlyForecast"
import DailyForecast from "./DailyForecast"

const tabs = [
  { id: "current", label: "Current" },
  { id: "hourly", label: "Hourly" },
  { id: "daily", label: "7 Days" },
]

export default function WeatherDisplay({ location, data }) {
  const [activeTab, setActiveTab] = useState("current")

  return (
    <Card className="backdrop-blur-xl bg-black/30 border border-white/10 shadow-2xl overflow-hidden rounded-3xl">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            {location.name}
          </h2>
          <div className="flex gap-2 p-1 backdrop-blur-3xl bg-white/5 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "current" && <CurrentWeather data={data} />}
          {activeTab === "hourly" && <HourlyForecast data={data.hourly} />}
          {activeTab === "daily" && <DailyForecast data={data.daily} />}
        </motion.div>
      </div>
    </Card>
  )
}

