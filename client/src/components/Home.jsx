import React from 'react'
import { ClipboardList, CheckCircle2, Clock } from 'lucide-react'
import Login from './Login'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center py-12 px-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
      
        <div className="flex flex-col items-center mb-6">
          <ClipboardList className="w-14 h-14 text-orange-500 mb-3" />
          <h1 className="text-4xl font-bold text-orange-600 text-center">
            Task Manager
          </h1>
        </div>

        <p className="text-gray-600 mb-10 text-center text-base leading-relaxed tracking-wide">
          Stay organized and boost your productivity with our intuitive task manager.  
          Track your daily goals, manage priorities, and achieve more effortlessly.
        </p>

        <div className="flex justify-center gap-10 mb-10">
          <div className="flex flex-col items-center text-gray-700">
            <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-sm font-medium">Track Tasks</span>
          </div>
          <div className="flex flex-col items-center text-gray-700">
            <Clock className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm font-medium">Meet Deadlines</span>
          </div>
        </div>
        <div className="px-8">
          <Login />
        </div>
      </div>
    </div>
  )
}

export default Home
