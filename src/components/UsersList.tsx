import { Toggle } from './ui/toggle'

interface UsersListProps {
  availableUsers: { id: string; name: string | null; row: number | null }[]
  onUserClick: (id: string) => void
}

export const UsersList: React.FC<UsersListProps> = ({
  availableUsers,
  onUserClick,
}) => {
  return (
    <div className='flex gap-3'>
      {availableUsers.map(user => (
        <Toggle onClick={() => onUserClick(user.id)}>{user.name}</Toggle>
      ))}
    </div>
  )
}
