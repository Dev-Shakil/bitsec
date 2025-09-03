"use client"

import Link from "next/link"
import { GoArrowLeft } from "react-icons/go"
import { motion, useMotionValue, useTransform } from "framer-motion"
import React, { useRef } from "react"

interface User {
  id: number
  name: string
  email: string
  username: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [15, -15])
  const rotateY = useTransform(x, [-50, 50], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const posX = e.clientX - rect.left - rect.width / 2
    const posY = e.clientY - rect.top - rect.height / 2
    x.set(posX)
    y.set(posY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="bg-gray-50 rounded-xl p-6 space-y-4 shadow-md cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, boxShadow: "0px 15px 30px rgba(0,0,0,0.15)" }}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      {children}
    </motion.div>
  )
}

const UserDetails = ({ user }: { user: User }) => {
  return (
    <motion.div
      className="container mx-auto bg-white rounded-lg px-6 md:px-12 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        variants={cardVariants}
      >
        <Link
          href="/"
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-all rounded-lg px-4 py-2 text-black font-medium shadow-sm"
        >
          <GoArrowLeft size={20} /> Back to Users
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Details</h1>
      </motion.div>

      {/* Personal + Address Info */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
        {/* Personal Info */}
        <TiltCard>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Personal Information</h2>
          {[
            { label: "Name", value: user.name },
            { label: "Username", value: `@${user.username}` },
            { label: "Email", value: user.email },
            { label: "Phone", value: user.phone },
            {
              label: "Website",
              value: (
                <Link
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.website}
                </Link>
              ),
            },
          ].map((item) => (
            <div key={item.label}>
              <label className="text-sm font-medium text-gray-500">{item.label}</label>
              <p className="text-lg font-semibold text-gray-900">{item.value}</p>
            </div>
          ))}
        </TiltCard>

        {/* Address Info */}
        <TiltCard>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Address</h2>
          {[
            { label: "Street", value: user.address.street },
            { label: "Suite", value: user.address.suite },
            { label: "City", value: user.address.city },
            { label: "Zipcode", value: user.address.zipcode },
            { label: "Geo Location", value: `${user.address.geo.lat}, ${user.address.geo.lng}` },
          ].map((item) => (
            <div key={item.label}>
              <label className="text-sm font-medium text-gray-500">{item.label}</label>
              <p className="text-lg font-semibold text-gray-900">{item.value}</p>
            </div>
          ))}
        </TiltCard>
      </motion.div>

      {/* Company Info */}
      <div className="my-4">
      <TiltCard >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Company</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Company Name", value: user.company.name },
            { label: "Catch Phrase", value: user.company.catchPhrase },
            { label: "Business", value: user.company.bs },
          ].map((item) => (
            <div key={item.label}>
              <label className="text-sm font-medium text-gray-500">{item.label}</label>
              <p className="text-lg font-semibold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      </TiltCard>
      </div>
    </motion.div>
  )
}

export default UserDetails
