import { ThemeSupa } from '@supabase/auth-ui-shared'
import PostDisplay from '@/components/PostDisplay';
import Link from 'next/link';
import { supabase } from './../lib/supabaseClient';

export async function getServerSideProps(){
    let {data} = await supabase.from('messagewall').select()

    return{
        props:{
            messages: data
        },
    }
}

const MessageWall = ({messages}) => {

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Link href={'/'}>Home</Link>
      <h1>Message Wall</h1>
      <div>
        {messages.map((message) => (
            <PostDisplay key={message.id} content={message.content} username={message.username} avatar={message.avatar_url} timestamp={message.created_at} />
        ))}
      </div>
    </div>
  )
}

export default MessageWall