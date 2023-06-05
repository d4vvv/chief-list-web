import { FormEvent, useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/input'
import { supabase } from 'utils/supabaseClient'
import { getActiveUser } from 'utils/getActiveUser'
import { useToast } from './ui/toast/useToast'
import { DebtRow } from './DebtRow'

export const AddDebt: React.FC = () => {
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [prices, setPrices] = useState<number[]>([0])
  const [rows, setRows] = useState(1)
  const [allUsers, setAllUsers] = useState<
    { id: string; name: string | null; row: number }[] | null
  >(null)

  const onUserClick = (id: string, rowNumber: number) => {
    if (allUsers) {
      const updatedUsers = allUsers.map(user => {
        if (user.id === id) {
          if (user.row) {
            user.row = 0
          } else {
            user.row = rowNumber
          }
        }

        return user
      })

      setAllUsers(updatedUsers)
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await supabase.from('users').select('id, name')

      if (data) {
        setAllUsers(
          data
            ?.filter(user => user.id !== getActiveUser())
            .map(user => {
              return { ...user, row: 0 }
            })
        )
      }
    }

    getUsers()
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const user_id = getActiveUser()

      if (user_id) {
        const { data, error } = await supabase
          .from('debts')
          .insert([{ user_id, title }])
          .select()

        if (error) {
          throw new Error(error.message)
        }

        if (data) {
          prices.forEach((price, idx) => {
            allUsers?.forEach(async user => {
              if (user.row === idx + 1) {
                const { error: debtUserError } = await supabase
                  .from('debt_users')
                  .insert([{ user_id: user.id, price, debt_id: data[0].id }])

                if (debtUserError) {
                  throw new Error(debtUserError.message)
                }
              }
            })
          })
        }

        toast({
          description: 'Debt has been added',
        })
      }
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <div className='w-96 bg-sky-100 flex flex-col h-fit justify-center p-10 rounded-lg gap-4 justify-self-center'>
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
        {Array.from(Array(rows).keys()).map(row => (
          <DebtRow
            allUsers={allUsers}
            onUserClick={onUserClick}
            key={`row-${row}`}
            rowNumber={row + 1}
            setPrices={setPrices}
            prices={prices}
          />
        ))}
        <Button
          type='button'
          className='self-end'
          onClick={() => setRows(state => state + 1)}
        >
          Add next row +
        </Button>
        {rows > 1 && (
          <Button
            type='button'
            className='self-end'
            onClick={() => setRows(state => (state > 1 ? state - 1 : state))}
          >
            Remove row -
          </Button>
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
