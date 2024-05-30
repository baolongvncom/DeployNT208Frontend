import React, { useContext } from 'react'
import './Chat.css'
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import AdminIcon from '../Assets/admin_icon.png'
import {MainContainer, ChatContainer, MessageList, MessageInput, ConversationHeader, Avatar, Message} from '@chatscope/chat-ui-kit-react'
import { MessageContext } from '../../Context/MessageContext';


const Chat = () => {
    const {addMessage, allMessages} = useContext(MessageContext);

function sendMessage(e){
    // Check for login
    if (!localStorage.getItem('auth-token')) {
        alert('You need to login to chat');
        window.location.href = '/login';
        return;
    }
    console.log(e);
    addMessage(e, true, localStorage.getItem('auth-token'));
}
  return (
    <div className='chatPage-div'> 
       <MainContainer>
        <ChatContainer>
            <ConversationHeader>
                <Avatar>
                    <img src={AdminIcon} className='admin-icon' alt="" />
                </Avatar>
                <ConversationHeader.Content userName='Admin'>

                </ConversationHeader.Content>

            </ConversationHeader>
                
            <MessageList>
                {allMessages.length > 0?allMessages.map((e,index)=>{
                    return <Message key={index} model={
                        {
                            message: e.content,
                            sentTime: e.timeStamp,
                            sender: 'admin',
                            direction: e.userMessage?'outgoing':'incoming',
                            position: 'single',
                        }
                    }>
                    </Message>
                }):null}
            </MessageList>
            <MessageInput placeholder='Type your message here !' onSend={sendMessage}>
            </MessageInput>
        </ChatContainer>
       </MainContainer>
    </div>
  )
}

export default Chat