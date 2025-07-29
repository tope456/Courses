import { useState, useEffect } from 'react'
import { supabase, Course } from '../lib/supabase'

const ITEMS_PER_PAGE = 10

interface UseCoursesProps {
  searchTerm?: string
  filters?: {
    branch: string
    technology: string
    program: string
    priceRange: string
    sortBy: string
  }
}

export default function useCourses({ searchTerm = '', filters }: UseCoursesProps = {}) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  // Reset to page 1 when search term or filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filters])

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  useEffect(() => {
    fetchCourses()
  }, [currentPage, searchTerm, filters])

  useEffect(() => {
    // Set up real-time subscription
    const subscription = supabase
      .channel('courses')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'courses' },
        (payload) => {
          console.log('Real-time update:', payload)
          handleRealtimeChange(payload)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const buildQuery = () => {
    let query = supabase.from('courses').select('*', { count: 'exact' })

    // Apply search filter
    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,technology.ilike.%${searchTerm}%,tags.ilike.%${searchTerm}%`)
    }

    // Apply filters
    if (filters) {
      if (filters.branch !== 'All') {
        query = query.eq('branch', filters.branch)
      }
      if (filters.technology !== 'All') {
        query = query.eq('technology', filters.technology)
      }
      if (filters.program !== 'All') {
        query = query.eq('program', filters.program)
      }
      if (filters.priceRange !== 'All') {
        switch (filters.priceRange) {
          case '₱0-₱5,000':
            query = query.gte('price', 0).lte('price', 5000)
            break
          case '₱5,001-₱10,000':
            query = query.gt('price', 5000).lte('price', 10000)
            break
          case '₱10,001+':
            query = query.gt('price', 10000)
            break
        }
      }
    }

    return query
  }

  const getSortColumn = () => {
    if (!filters?.sortBy) return 'title'
    
    switch (filters.sortBy) {
      case 'title-asc':
      case 'title-desc':
        return 'title'
      case 'price-asc':
      case 'price-desc':
        return 'price'
      default:
        return 'title'
    }
  }

  const getSortOrder = () => {
    if (!filters?.sortBy) return true
    
    switch (filters.sortBy) {
      case 'title-asc':
      case 'price-asc':
        return true
      case 'title-desc':
      case 'price-desc':
        return false
      default:
        return true
    }
  }

  const fetchCourses = async () => {
    try {
      setLoading(true)
      
      // Build the query with filters and search
      const baseQuery = buildQuery()
      
      // Get total count
      const { count } = await baseQuery
      
      setTotalCount(count || 0)
      
      // Get paginated data with the same filters
      const { data, error } = await buildQuery()
        .order(getSortColumn(), { ascending: getSortOrder() })
        .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1)

      if (error) throw error

      setCourses(data || [])
    } catch (err) {
      console.error('Error fetching courses:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleRealtimeChange = (payload: any) => {
    // For real-time updates, we need to refetch to maintain consistency
    // since the new/updated item might not match current filters
    fetchCourses()
  }

  const nextPage = () => {
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  return { 
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
    goToPage,
    refetch: fetchCourses 
  }
}