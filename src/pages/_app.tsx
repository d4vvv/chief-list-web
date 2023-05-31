import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from '../components/ui/toast/Toaster'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  )
}
