import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req, res) {
    const supabase = createServerSupabaseClient({req, res});
    const message = req.body.postcontent;

    const {
        data: { session },
      } = await supabase.auth.getSession();
    
    if (!session)
      return res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated',
    })

    const userid = session.user.id;

    if(message == ''){
        return res.status(400).json({statusmessage: 'Empty Message', success: false})
    }

    const {data, error} = await supabase.from('Posts').insert({content: message, author: userid});

    if(error){
        return res.status(400).json({statusmessage: 'Failed to insert', success: false})
    }

    res.status(200).json({ statusmessage: 'Success', success: true })
  }