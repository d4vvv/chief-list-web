import { AddDebt } from '@/components/AddDebt'
import { useActiveUser } from '@/hooks/useActiveUser'
import { useRouter } from 'next/router'
import { supabase } from 'utils/supabaseClient'
import { AuthWrapper } from '../components/AuthWrapper'
import { Button } from '../components/ui/Button'

export default function Home() {
  const router = useRouter()
  const activeUser = useActiveUser()

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      localStorage.removeItem('userId')
      console.log('signed out boi')
      router.push('/')
    }
  }

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
