import { useState } from 'react'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { Button } from './ui/Button'
import { StartPageState } from '../../types/StartPage'

export const StartPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<null | StartPageState>(null)

  const renderContent = () => {
    if (activeTab === StartPageState.LOGIN) {
      return <Login onBackClick={() => setActiveTab(null)} />
    }

    if (activeTab === StartPageState.SIGNUP) {
      return <SignUp onBackClick={() => setActiveTab(null)} />
    }

    return (
      <>
        <Button
          className='w-60'
          onClick={() => setActiveTab(StartPageState.LOGIN)}
        >
          I already am a chief
        </Button>
        <Button
          className='w-60'
          onClick={() => setActiveTab(StartPageState.SIGNUP)}
        >
          I want to become a chief
        </Button>
      </>
    )
  }

  return (
    <div className='bg-red-100 py-10 h-screen'>
      <h1 className='text-center text-3xl'>Chief list</h1>
      <div className='w-full h-full flex items-center flex-col justify-center gap-4'>
        {renderContent()}
      </div>
    </div>
  )
}
