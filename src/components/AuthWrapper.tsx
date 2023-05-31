import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'

interface AuthWrapperProps {
  children: React.ReactNode
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
}: AuthWrapperProps) => {
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user?.role) {
          router.replace('/')
        }
      }
    }
    getUser()
  }, [])

  return <>{children}</>
}
