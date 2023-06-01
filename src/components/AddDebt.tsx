import { FormEvent, useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/input'
import { supabase } from 'utils/supabaseClient'
import { getActiveUser } from 'utils/getActiveUser'
import { useToast } from './ui/toast/useToast'
import { UsersList } from './UsersList'

export const AddDebt: React.FC = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState<string>('')
  const [allUsers, setAllUsers] = useState<
    { id: string; name: string | null; row: number | null }[] | null
  >(null)

  const onUserClick = (id: string) => {
    if (allUsers) {
      const updatedUsers = allUsers.map(user => {
        if (user.id === id) {
          if (user.row) {
            user.row = null
          } else {
            user.row = 1
          }
        }

        return user
      })

      setAllUsers(updatedUsers)
    }
  }

  const { toast } = useToast()

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await supabase.from('users').select('id, name')

      if (data) {
        setAllUsers(
          data
            ?.filter(user => user.id !== getActiveUser())
            .map(user => {
              return { ...user, row: null }
            })
        )
      }
    }

    getUsers()
  }, [])

  console.log({ allUsers })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const user_id = getActiveUser()
      console.log({ user_id })
      console.log({ price })
      console.log({ title })

      const { error } = await supabase
        .from('debts')
        .insert([{ user_id, price, title }])

      if (error) {
        throw new Error(error.message)
      }

      toast({
        description: 'Debt has been added',
      })
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <div className='w-96 bg-white flex flex-col h-fit justify-center p-10 rounded-lg gap-4 justify-self-center'>
      <h1 className='text-xl'>Create new debt</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center gap-4'
      >
        <Input
          type='text'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          type='number'
          placeholder='Price'
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        {allUsers && (
          <UsersList availableUsers={allUsers} onUserClick={onUserClick} />
        )}
        <Button className='min-w-[200px]' type='submit'>
          Create
        </Button>
        {/* <Button
          className='min-w-[200px]'
          variant='outline'
          onClick={onBackClick}
        >
          Go back
        </Button> */}
      </form>
    </div>
  )
}
