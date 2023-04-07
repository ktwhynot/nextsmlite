import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import PostForm from '@/components/PostForm';
import Link from 'next/link';

const Post = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const user = useUser()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <div>
            <h1>Make a Post</h1>
            <PostForm session={session}></PostForm>
            <Link href={"/account"} className='button primary block'>Cancel</Link>
        </div>
      )}
    </div>
  )
}

export default Post