import React from 'react'
import Messages from './Messages'

const MessageContainer = () => {
  return (
    <div className='md:min-w-[450px] flex flex-col'>
        <>
            {/* Header */}
            <div className='bg-slate-500 px-4 py-2 mb-2'>
                <span className='text-center text-gray-900 font-bold ' >John doe</span>
            </div>
            {/* <h1>HIHIHIH</h1> */}
            <Messages />
           
        </>
    </div>
  )
}

export default MessageContainer
