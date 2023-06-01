import { StartPage } from '@/components/StartPage'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getActiveUser } from 'utils/getActiveUser'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (getActiveUser()) {
      router.replace('/dashboard')
    }
  }, [])

  return (
    <main>
      <StartPage />
    </main>
  )
}
