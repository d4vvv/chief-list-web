import { useState, FormEvent } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { Input } from './ui/input'
import { Button } from './ui/Button'
import { useToast } from './ui/toast/useToast'

interface SignUpProps {
  onBackClick: () => void
}

export const SignUp: React.FC<SignUpProps> = ({ onBackClick }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const { toast } = useToast()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        throw new Error(signUpError.message)
      }

      if (data.user) {
        const { error } = await supabase
          .from('users')
          .insert([{ id: data.user?.id, email, name }])

        if (error) {
          throw new Error(error.message)
        }
      }

      toast({
        title: 'Confirmation email has been sent',
        description: 'Please check your email to activate the account',
      })
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <div className='w-96 bg-white flex flex-col h-fit justify-center p-10 rounded-lg gap-4 justify-self-center'>
      <h1 className='text-xl'>Sign up</h1>
      <form onSubmit={handleLogin} className='flex flex-col items-center gap-4'>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type='text'
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button className='min-w-[200px]' type='submit'>
          Sign up
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
