import React from 'react'
import { MapPin, Tag, GraduationCap } from 'lucide-react'
import { Course } from '../lib/supabase'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getBranchColor = (branch: string) => {
    switch (branch.toLowerCase()) {
      case 'pasig':
        return 'bg-purple-100 text-purple-800'
      case 'pasay':
        return 'bg-teal-100 text-teal-800'
      case 'jalajala':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgramColor = (program: string) => {
    switch (program.toLowerCase()) {
      case '2-year program':
        return 'bg-purple-100 text-purple-800'
      case 'senior high':
        return 'bg-orange-100 text-orange-800'
      case 'short courses':
        return 'bg-cyan-100 text-cyan-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Course Image */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-teal-500 overflow-hidden">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Tag className="h-16 w-16 text-white opacity-50" />
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProgramColor(course.program)}`}>
            <GraduationCap className="h-3 w-3 mr-1" />
            {course.program}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBranchColor(course.branch)}`}>
            <MapPin className="h-3 w-3 mr-1" />
            {course.branch}
          </span>
        </div>

        {/* Technology */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            <Tag className="h-4 w-4 mr-1" />
            {course.technology}
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(course.price)}
          </span>
          {course.link ? (
            <a
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              View Details
            </a>
          ) : (
            <button className="px-3 py-1.5 bg-gray-400 text-white text-xs font-medium rounded-md cursor-not-allowed">
              No Link
            </button>
          )}
        </div>
      </div>
    </div>
  )
}