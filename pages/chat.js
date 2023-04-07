import { useEffect, useState } from "react"
import io from 'socket.io-client'
let socket;

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {socketInitializer()}, [])

    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io()

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('newIncomingMessage', (msg) => {
            console.log(msg);
            setMessages(messages => messages.concat(msg));
        })

        return () => io().disconnect();
    }

    const sendMessage = async () => {
        console.log(message);
        socket.emit("createdMessage", message);
        setMessage("");
    }

    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            <h1>Chat</h1>
            <input 
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="button primary block" onClick={() => sendMessage()}>Submit</button>
            <div>
                {messages.map((msg, i) => (
                    <p key={i}>{msg}</p>
                ))}
            </div>
        </div>
    )
}

export default Chat