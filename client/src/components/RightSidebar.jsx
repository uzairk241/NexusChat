import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import { ShieldAlert } from 'lucide-react'

const RightSidebar = () => {
    const {selectedUser, messages} = useContext(ChatContext)
    const {logout, onlineUsers} = useContext(AuthContext)
    const [msgImages, setMsgImages] = useState([])

    useEffect(()=>{
        setMsgImages(messages.filter(msg => msg.image).map(msg=>msg.image))
    },[messages])

  return selectedUser && (
    <div className={`bg-[#080c0c] text-white w-full relative overflow-y-auto border-l border-emerald-900/10 p-6 ${selectedUser ? "max-md:hidden" : ""}`}>
        <div className='pt-10 flex flex-col items-center text-center'>
            <div className='relative'>
                <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-28 h-28 rounded-[2rem] object-cover border-2 border-emerald-500/20 shadow-2xl' />
                {onlineUsers.includes(selectedUser._id) && <div className='absolute -top-2 -right-2 bg-emerald-500 text-black text-[9px] font-black px-2 py-1 rounded-md uppercase'>Active</div>}
            </div>
            <h1 className='mt-5 text-xl font-black text-white'>{selectedUser.fullName}</h1>
            <p className='mt-2 text-xs text-white leading-relaxed italic px-4'>"{selectedUser.bio}"</p>
        </div>

        <div className='mt-8 p-4 bg-emerald-950/10 rounded-2xl border border-emerald-500/10 flex items-center gap-3'>
            <ShieldAlert size={20} className='text-emerald-500/50'/>
            <p className='text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest'>Privacy Guard Enabled</p>
        </div>

        <div className="mt-8">
            <h2 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Shared Content</h2>
            <div className='max-h-[300px] overflow-y-auto grid grid-cols-2 gap-3 custom-scrollbar'>
                {msgImages.length > 0 ? msgImages.map((url, index)=>(
                    <div key={index} onClick={()=> window.open(url)} className='aspect-square cursor-pointer overflow-hidden rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all'>
                        <img src={url} alt="" className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500'/>
                    </div>
                )) : <p className='col-span-2 text-[10px] text-gray-600 text-center py-10 italic'>No media shared yet</p>}
            </div>
        </div>

        <button onClick={()=> logout()} className='w-full mt-10 py-3 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95'>
            Terminate Session
        </button>
    </div>
  )
}

export default RightSidebar