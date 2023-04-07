import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import UserInfo from '@/components/UserInfo';
import SignOutButton from '@/components/SignOutButton';
import Link from 'next/link';

const AccountHome = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const user = useUser()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <div>
            <h1>Account Page</h1>
            <UserInfo session={session} />
            <Link href={"/account/manage"} className='button primary block'>Manage Account</Link>
            <Link href={"/account/post"} className='button primary block'>Make a Post</Link>
            <SignOutButton />
        </div>
      )}
    </div>
  )
}

export default AccountHome