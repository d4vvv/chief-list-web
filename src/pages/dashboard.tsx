import { User, createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '../components/ui/Button'
import { AuthWrapper } from '../components/AuthWrapper'
import { AddDebt } from '@/components/AddDebt'
import { getAllUsers } from 'utils/getAllUsers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {
  const router = useRouter()
  const [activeUser, setActiveUser] = useState<User | null>(null)

  const getUser = async () => {
    {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setActiveUser(user)
      }
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      localStorage.removeItem('userId')
      console.log('signed out boi')
      router.push('/')
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <AuthWrapper>
      <main>
        <p>Hewwo: </p>
        <p className=''>{activeUser?.email}</p>
        <AddDebt />
        <Button onClick={signOut}>Log out</Button>
      </main>
    </AuthWrapper>
  )
}
