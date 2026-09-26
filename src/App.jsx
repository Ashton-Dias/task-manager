import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Auth from './components/Auth'
import Tasks from './components/Tasks'
import './App.css'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) return null

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tasks</h1>
        {session && (
          <button type="button" className="btn-secondary" onClick={() => supabase.auth.signOut()}>
            Log out
          </button>
        )}
      </header>
      <main>{session ? <Tasks user={session.user} /> : <Auth />}</main>
    </div>
  )
}

export default App
