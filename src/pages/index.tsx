import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {
  const router = useRouter()
  const [users, setUsers] = useState<any[] | undefined>([])
  const [activeUser, setActiveUser] = useState()
  const testFunction = async () => {
    let { data, error } = await supabase.from('testTable').select('name')

    const users = data?.map(element => element.name)

    setUsers(users)
  }

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'r3pcak99@gmail.com',
      password: 'plzwork',
    })

    console.log({ data })
    console.log({ error })
  }

  const getSessionData = async () => {
    const { data, error } = await supabase.auth.getSession()
    console.log(data)
  }

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'r3pcak99@gmail.com',
      password: 'plzwork',
    })

    console.log({ data })
    console.log({ error })

    if (data.session) {
      supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      })
    }

    if (!error) {
      router.push('/hewwo')
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      console.log('signed out boi')
    }
  }

  const getUser = async () => {
    {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        router.push('/hewwo')
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const getActiveUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    console.log(user)
  }

  useEffect(() => {
    testFunction()
    // signUp()
    // getActiveUser()
  }, [])

  return (
    <main>
      <div className=''>
        <Button onClick={signUp}>signUp</Button>
        <Button onClick={signIn}>signIn</Button>
        <Button onClick={signOut}>signOut</Button>
      </div>
      {/* <Container>
        <Sidebar />
        <MainPage users={users} />
      </Container> */}
    </main>
  )
}
