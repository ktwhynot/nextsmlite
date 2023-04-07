import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';

export default function SignOutButton() {
  const supabase = useSupabaseClient()
  const router = useRouter()

  async function signOutAndRedirect(redirect_url){
    await supabase.auth.signOut();
    router.replace(redirect_url);
  }

  return (
    <div>
        <button className="button block" onClick={() => signOutAndRedirect("/")}>
            Sign Out
        </button>
    </div>
  )
}