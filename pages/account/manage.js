import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../../components/Account'
import Link from 'next/link';

const AccountManagement = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <div>
            <h1>Account Management</h1>
            <Account session={session} />
            <Link className='button block' style={{ margin: '6px 0 100px 0'}} href={"/account"}>&larr; Go Back</Link>
        </div>
      )}
    </div>
  )
}

export default AccountManagement