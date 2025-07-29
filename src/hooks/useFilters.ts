import { useState } from 'react'

interface Filters {
  branch: string
  technology: string
  program: string
  priceRange: string
  sortBy: string
}

export default function useFilters() {
  const [filters, setFilters] = useState<Filters>({
    branch: 'All',
    technology: 'All',
    program: 'All',
    priceRange: 'All',
    sortBy: 'title-asc'
  })

  const updateFilter = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const clearFilters = () => {
    setFilters({
      branch: 'All',
      program: 'All',
      technology: 'All',
      priceRange: 'All',
      sortBy: 'title-asc'
    })
  }

  return {
    filters,
    updateFilter,
    clearFilters
  }
}