import { useMemo, useState } from 'react'
import { Input } from './ui/input'
import { UsersList } from './UsersList'

interface DebtRowProps {
  allUsers: { id: string; name: string | null; row: number }[] | null
  onUserClick: (id: string, rowNumber: number) => void
  rowNumber: number
  setPrices: any
  prices: number[]
}

export const DebtRow: React.FC<DebtRowProps> = ({
  allUsers,
  onUserClick,
  rowNumber,
  setPrices,
  prices,
}) => {
  const [price, setPrice] = useState('')

  const filteredUsers = useMemo(
    () => allUsers?.filter(user => [rowNumber, 0].includes(user.row)),
    [allUsers, rowNumber]
  )

  const updatePrices = (rowNumber: number) => {
    let updatedPrices = prices
    updatedPrices[rowNumber] = +price
    setPrices(updatedPrices)
    console.log('here')
    console.log(prices)
  }

  return (
    <div className='w-full bg-white p-4 rounded-lg flex flex-col gap-4'>
      <Input
        type='number'
        placeholder='Price'
        value={price}
        className='bg-white'
        onChange={e => setPrice(e.target.value)}
        onBlur={() => updatePrices(rowNumber - 1)}
      />
      {filteredUsers && (
        <UsersList
          availableUsers={filteredUsers}
          onUserClick={onUserClick}
          rowNumber={rowNumber}
        />
      )}
    </div>
  )
}
