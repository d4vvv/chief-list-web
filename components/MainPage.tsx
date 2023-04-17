interface MainPageProps {
  users: string[] | undefined
}

export const MainPage: React.FC<MainPageProps> = ({ users }) => {
  return (
    <div className='max-w-7xl flex-1 bg-blue-200'>
      {users && users.map(user => user)}
    </div>
  )
}
