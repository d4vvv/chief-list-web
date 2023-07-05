import { useActiveUser } from '@/hooks/useActiveUser'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from 'utils/supabaseClient'
import { AuthWrapper } from '../components/AuthWrapper'
import { Button } from '../components/ui/Button'
import { userDebts } from 'types/Response'

export default function Debts() {
  const router = useRouter()
  const activeUser = useActiveUser()
  const [userDebts, setUserDebts] = useState<userDebts[] | undefined>()

  const getUserDebts = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data } = await supabase
        .from('debt_users')
        .select('price, debts (title, closed), users (name)')
        .eq('user_id', user.id)

      if (data) {
        setUserDebts(data as userDebts[])
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
    getUserDebts()
  }, [])

  return (
    <AuthWrapper>
      <main className='bg-white h-screen'>
        <p>Hewwo: {activeUser?.name}</p>
        <p className=''>{activeUser?.email}</p>
        <div className='flex flex-col gap-2 px-2'>
          {userDebts &&
            userDebts.map(debt => {
              return (
                <div className='bg-white shadow-xl p-4 rounded-xl flex'>
                  <div className='flex-1'>
                    <p>{debt.users.name}</p>
                    <p>{debt.debts.title}</p>
                    <p>{debt.price}</p>
                  </div>
                  <Button className='self-center'>Done</Button>
                </div>
              )
            })}
        </div>
        <Button onClick={signOut}>Log out</Button>
      </main>
    </AuthWrapper>
  )
}
