import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img alt='Tailwind CSS chat bubble component' src={ "https://www.iconfinder.com/search?q=avatar&price=free"
                }/>
            </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500`}>Hi!</div>
		<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>19:57</div>
      {/* <h1>jidfhioshf</h1> */}
    </div>
  )
}

export default Message
