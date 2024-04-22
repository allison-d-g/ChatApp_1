import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from "../skeletons/MessageSkeleton";

const Messages = () => {
  const {messages, loading} = useGetMessages();

  //the scroll bar auto roll to the last message position
  const lastMessage = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 50)
  }, [messages])

  console.log("messages: ", messages);
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessage}>
						<Message message={message} />
					</div>
				))}

      {loading && [...Array(0)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {/* <h1>Message</h1> */}
      {/* <Message /> */}
    </div>
  )
}

export default Messages
