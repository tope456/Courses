import React, { useState } from 'react'
import { Menu, GraduationCap, Database } from 'lucide-react'
import SearchBar from './components/SearchBar'
import FilterSidebar from './components/FilterSidebar'
import CourseGrid from './components/CourseGrid'
import Pagination from './components/Pagination'
import useCourses from './hooks/useCourses'
import useFilters from './hooks/useFilters'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { filters, updateFilter, clearFilters } = useFilters()
  const { 
    courses, 
    loading, 
    error, 
    currentPage,
    totalPages,
    totalCount,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage
  } = useCourses({ searchTerm, filters })

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Database className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Database Connection Error</h1>
          <p className="text-gray-600 mb-4">Please connect to Supabase to continue.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and title */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CourseHub</h1>
                <p className="text-sm text-gray-500">Real-time Course Listings</p>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Discover Your Next Course
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of technology and design courses. 
              Filter by location, technology, duration, and price to find the perfect fit.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
          </div>

          {/* Results summary */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} • {totalCount} courses found
              {searchTerm && (
                <span> for "{searchTerm}"</span>
              )}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex lg:space-x-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            filters={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
          />

          {/* Course Grid */}
          <div className="flex-1 min-w-0">
            <CourseGrid courses={courses} loading={loading} />
            
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={nextPage}
              onPrevPage={prevPage}
              onGoToPage={goToPage}
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default App