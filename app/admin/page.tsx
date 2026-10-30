'use client'

import React , {useEffect}from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/admin/login')
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default page
