import { useEffect, useState } from 'react'
import { MainPage } from '../../components/MainPage'
import { Container } from '../../components/ui/Container'
import { Sidebar } from '../../components/ui/Sidebar'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {
  const [users, setUsers] = useState<any[] | undefined>([])
  const testFunction = async () => {
    let { data, error } = await supabase.from('testTable').select('name')

    const users = data?.map(element => element.name)

    setUsers(users)
  }

  useEffect(() => {
    testFunction()
  }, [])

  return (
    <main>
      <Container>
        <Sidebar />
        <MainPage users={users} />
      </Container>
    </main>
  )
}
