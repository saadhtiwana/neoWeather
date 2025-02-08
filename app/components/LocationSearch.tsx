"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { motion } from "framer-motion"

export default function LocationSearch({ onLocationChange }) {
  const [query, setQuery] = useState("")

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`,
      )
      const data = await res.json()
      if (data.results && data.results.length > 0) {
        const location = data.results[0]
        onLocationChange({ lat: location.latitude, lon: location.longitude, name: location.name })
      }
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }

  return (
    <motion.form
      onSubmit={handleSearch}
      className="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl text-white hover:opacity-90 transition-opacity"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute inset-0 -z-10 blur-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-violet-500/30 rounded-2xl"></div>
      </div>
    </motion.form>
  )
}

