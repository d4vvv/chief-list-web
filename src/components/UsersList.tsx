import { Toggle } from './ui/toggle'

interface UsersListProps {
  availableUsers: { id: string; name: string | null; row: number }[]
  onUserClick: (id: string, rowNumber: number) => void
  rowNumber: number
}

export const UsersList: React.FC<UsersListProps> = ({
  availableUsers,
  onUserClick,
  rowNumber,
}) => {
  return (
    <div className='flex gap-3'>
      {availableUsers.map(user => (
        <Toggle
          variant={'outline'}
          key={user.id}
          onClick={() => onUserClick(user.id, rowNumber)}
        >
          {user.name}
        </Toggle>
      ))}
    </div>
  )
}
