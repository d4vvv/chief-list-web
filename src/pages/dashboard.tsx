import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '../components/ui/Button'
import { AuthWrapper } from '../components/AuthWrapper'
import { AddDebt } from '@/components/AddDebt'
import { supabase } from 'utils/supabaseClient'

interface ActiveUser extends User {
  name: string | null
}

export default function Home() {
  const router = useRouter()
  const [activeUser, setActiveUser] = useState<ActiveUser | null>(null)

  const getUser = async () => {
    {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: name } = await supabase
          .from('users')
          .select('name')
          .eq('id', user.id)

        if (name) {
          setActiveUser({ ...user, name: name[0].name })
        }
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
      <main className='bg-red-100 h-screen'>
        <p>Hewwo: {activeUser?.name}</p>
        <p className=''>{activeUser?.email}</p>
        <AddDebt />
        <Button onClick={signOut}>Log out</Button>
      </main>
    </AuthWrapper>
  )
}
