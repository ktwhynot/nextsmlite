import Image from 'next/image';
import Date from './Date';
import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import styles from '/styles/front.module.css'

export default function PostDisplay({content, username, avatar, timestamp}) {
    const supabase = useSupabaseClient()
    const size = 50
    const [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(() => {
        if (avatar) downloadImage(avatar)
    }, [avatar])

    async function downloadImage(path) {
        try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
            throw error
        }
        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
        } catch (error) {
        console.log('Error downloading image: ', error)
        }
    }
  
    return (
      <div className={styles.messageblock}>
          <div className={styles.username} style={{height:size}}>
            <div className={styles.left}>
                {avatarUrl ? (
                    <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="avatar image"
                    style={{ height: size, width: size }}
                    />
                ) : (
                    <div className="avatar no-image" style={{ height: size, width: size, marginRight: '10px' }} />
                )}
            </div>
            <div>{username ? username : "Anonymous"}</div>
          </div>
          <p>{content}</p>
          <div className={[styles.smalltext, styles.faded].join(" ")}><Date dateString={timestamp} /></div>
      </div>
    )
  }