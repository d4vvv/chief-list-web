import { useState, FormEvent } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { Input } from './ui/input'
import { Button } from './ui/Button'

interface LoginProps {
  onBackClick: () => void
}

export const Login: React.FC<LoginProps> = ({ onBackClick }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw new Error(error.message)
      }

      localStorage.setItem('userId', data.user?.id ?? '')

      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <div className='w-96 bg-white flex flex-col h-fit justify-center p-10 rounded-lg gap-4 justify-self-center'>
      <h1 className='text-xl'>Login</h1>
      <form onSubmit={handleLogin} className='flex flex-col items-center gap-4'>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button className='min-w-[200px]' type='submit'>
          Login
        </Button>
        <Button
          className='min-w-[200px]'
          variant='outline'
          onClick={onBackClick}
        >
          Go back
        </Button>
      </form>
    </div>
  )
}
