import React from 'react'
import { Filter, X } from 'lucide-react'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    branch: string
    technology: string
    program: string
    priceRange: string
    sortBy: string
  }
  onFilterChange: (filterType: string, value: string) => void
  onClearFilters: () => void
}

export default function FilterSidebar({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters 
}: FilterSidebarProps) {
  const branches = ['All', 'Pasig', 'Pasay', 'Jalajala']
  const programs = ['All', '2-Year Program', 'Senior High', 'Short Courses']
  const priceRanges = ['All', '₱0-₱5,000', '₱5,001-₱10,000', '₱10,001+']
  const sortOptions = [
    { value: 'title-asc', label: 'Title A-Z' },
    { value: 'title-desc', label: 'Title Z-A' },
    { value: 'price-asc', label: 'Price Low to High' },
    { value: 'price-desc', label: 'Price High to Low' }
  ]

  // Technologies grouped by program
  const technologiesByProgram: { [key: string]: string[] } = {
    '2-Year Program': [
      'All',
      'Digital Arts & Design',
      'Information Technology',
      'Network System & Security Administrator',
      'Automotive Technology',
      'Industrial Electrical Technology',
      'Industrial Automation & Manufacturing Technology',
      'Semiconductor & Manufacturing Technology',
    ],
    'Senior High': [
      'All',
      'Computer Programming',
      'Mechatronics Servicing'
    ],
    'Short Courses': [
      'All',
      'Agriculture',
      'Automotive and Motorcycle Servicing',
      'CISCO Networking',
      'Computer-Aided Design',
      'Cyber Security',
      'Databases',
      'Digital Arts and Design',
      'Electrical',
      'Electronics',
      'Linux',
      'Machine Automation and Instrumentation (Mechatronics)',
      'Maritime-Electrotechnical',
      'Metal Trades-Welding and Pipefitting',
      'Office Productivity',
      'Process Automation (Instrumentation and Control)',
      'Programming',
      'Refrigeration and Air-conditioning Mechanic',
      'Soft Skills',
      'Web Development'
    ]
  }

  // Get technologies for current program
  const getCurrentTechnologies = () => {
    if (filters.program === 'All') {
      return ['All']
    }
    return technologiesByProgram[filters.program] || ['All']
  }

  // Handle program change - reset technology when program changes
  const handleProgramChange = (program: string) => {
    onFilterChange('program', program)
    // Reset technology to 'All' when program changes
    if (program !== filters.program) {
      onFilterChange('technology', 'All')
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:w-64 lg:h-fit lg:max-h-screen lg:sticky lg:top-8`}>
        <div className="h-full lg:h-auto flex flex-col lg:rounded-lg lg:border lg:border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <h2 className="text-base font-semibold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Clear filters button - moved to top */}
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={onClearFilters}
              className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>

          {/* Filter content */}
          <div className="flex-1 lg:flex-none overflow-y-auto p-4 space-y-4 lg:max-h-96">
            {/* Sort Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Sort By</h3>
              <div className="space-y-2">
                {sortOptions.map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="sortBy"
                      value={option.value}
                      checked={filters.sortBy === option.value}
                      onChange={(e) => onFilterChange('sortBy', e.target.value)}
                      className="h-4 w-4 flex-shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-xs text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Branch Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Branch</h3>
              <div className="space-y-2">
                {branches.map(branch => (
                  <label key={branch} className="flex items-center">
                    <input
                      type="radio"
                      name="branch"
                      value={branch}
                      checked={filters.branch === branch}
                      onChange={(e) => onFilterChange('branch', e.target.value)}
                      className="h-4 w-4 flex-shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-xs text-gray-700">{branch}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Program Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Program</h3>
              <div className="space-y-2">
                {programs.map(program => (
                  <label key={program} className="flex items-center">
                    <input
                      type="radio"
                      name="program"
                      value={program}
                      checked={filters.program === program}
                      onChange={(e) => handleProgramChange(e.target.value)}
                      className="h-4 w-4 flex-shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-xs text-gray-700">{program}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Technology Filter - Only show when a specific program is selected */}
            {filters.program !== 'All' && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Technology</h3>
                <div className="space-y-2">
                  {getCurrentTechnologies().map(tech => (
                    <label key={tech} className="flex items-center">
                      <input
                        type="radio"
                        name="technology"
                        value={tech}
                        checked={filters.technology === tech}
                        onChange={(e) => onFilterChange('technology', e.target.value)}
                        className="h-4 w-4 flex-shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-xs text-gray-700">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <label key={range} className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range}
                      checked={filters.priceRange === range}
                      onChange={(e) => onFilterChange('priceRange', e.target.value)}
                      className="h-4 w-4 flex-shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-xs text-gray-700">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}