import { useEffect, useState } from 'react'
import { ActiveUser } from 'types/ActiveUser'
import { supabase } from 'utils/supabaseClient'

export const useActiveUser = () => {
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
  useEffect(() => {
    getUser()
  }, [])

  return activeUser
}
