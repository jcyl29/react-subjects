////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Need some ideas?
//
// - Cause the message list to automatically scroll as new
//   messages come in
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Group subsequent messages from the same sender
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import { login, sendMessage, subscribeToMessages } from './utils/ChatUtils'
import './styles'

/*
 Here's how to use the ChatUtils:

 login((error, auth) => {
 // hopefully the error is `null` and you have a auth.github object
 })

 sendMessage(
 auth.uid,                       // the auth.uid string
 auth.github.username,           // the username
 auth.github.profileImageURL,    // the user's profile image
 'hello, this is a message'      // the text of the message
 )

 const unsubscribe = subscribeToMessages(messages => {
 // here are your messages as an array, it will be called
 // every time the messages change
 })

 unsubscribe() // stop listening for new messages

 The world is your oyster!
 */

const Chat = React.createClass({
    getInitialState() {
        return {
            auth: null,
            numberMessages: 0,
            messages: []
        }
    },

    componentDidMount() {
        login((error,auth) => {
            this.setState({ auth })
            console.log(auth.github)
            subscribeToMessages(messages => {
                //we have messages
                this.setState({ messages })
            })
        })
    },

    onSubmit(event) {
        event.preventDefault()
        console.log("submit");
        const { auth } = this.state
        const messageText = this.refs.message.value
        if (messageText) {
            sendMessage(auth.uid,auth.github.username, auth.github.profileImageURL, messageText)
        }
        this.refs.message.value = ""
    },

    render() {
        const { auth, messages } = this.state

        if (auth == null)
            return <p>loading...</p>

        const items = messages.map((message) => {
            return <li key={message._key} className="message">{message.text}</li>
        });

        console.log(messages, items)

        return (
            <div className="chat">
                <header className="chat-header">
                    <h1 className="chat-title">HipReact</h1>
                    <p className="chat-message-count"># messages: {messages.length}.  You are logged in as {auth.github.username}</p>
                </header>
                <div className="messages">
                    <ol className = "messages">
                        { items }
                    </ol>
                </div>
                <form className="new-message-form" onSubmit={this.onSubmit}>
                    <div className="new-message">
                        <input ref="message" type="text" placeholder="say something..."/>
                    </div>
                </form>
                <pre style={{height: '100px', overflow: 'scroll'}}>{JSON.stringify(this.state.messages, null, 2)}</pre>
            </div>
        )
    }

})

render(<Chat/>, document.getElementById('app'))
