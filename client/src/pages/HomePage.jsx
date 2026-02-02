import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {
  const {selectedUser} = useContext(ChatContext)

  return (
    <div className='bg-[#030708] w-full h-screen sm:p-6 lg:p-10'>
      <div className={`bg-[#0d1117]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden h-full grid grid-cols-1 relative shadow-[0_30px_100px_rgba(0,0,0,0.4)] ${selectedUser ? 'md:grid-cols-[1.1fr_2fr_1.1fr]' : 'md:grid-cols-2'}`}>
        <Sidebar />
        <ChatContainer />
        <RightSidebar/>
      </div>
    </div>
  )
}

export default HomePage