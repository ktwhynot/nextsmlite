import { useUser } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { useRouter } from 'next/router';

export default function PostForm({ session }) {
  const user = useUser()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [waiting, setWaiting] = useState(false)

  async function makePost(){
    if(!waiting){
        setWaiting(true);
        console.log(message);
        console.log(user.id);

        const data = {
            postcontent: message
        }

        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/postmessage';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const response = await fetch(endpoint, options);
        const result = await response.json();

        console.log('Server responded with: ' + result.statusmessage);
        if(result.success){
            alert('Success');
            setWaiting(false);
            router.replace('/account');
        }else{
            alert('Failed to post')
            setWaiting(false);
        }
    }
  }

  return (
    <div className="form-widget">
        <label htmlFor='message'>Message</label>
        <textarea style={{color: 'black'}} rows='8' cols='100' placeholder='Enter your message' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

        <button className="button primary block" onClick={() => makePost()} disabled={waiting}>
          {waiting ? 'Sending...' : 'Submit'}
        </button>
    </div>
  )
}