import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { MessageSquareQuote, ImagePlus, SendHorizontal } from 'lucide-react'

const ChatContainer = () => {
    const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
    const { authUser, onlineUsers } = useContext(AuthContext)
    const scrollEnd = useRef()
    const [input, setInput] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === "") return null;
        await sendMessage({ text: input.trim() });
        setInput("")
    }

    const handleSendImage = async (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith("image/")) {
            toast.error("Please select a valid image file")
            return;
        }
        const reader = new FileReader();
        reader.onloadend = async () => {
            await sendMessage({ image: reader.result })
            e.target.value = ""
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (selectedUser) getMessages(selectedUser._id)
    }, [selectedUser])

    useEffect(() => {
        if (scrollEnd.current && messages) {
            scrollEnd.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return selectedUser ? (
        <div className='h-full overflow-hidden flex flex-col relative bg-emerald-950/5 backdrop-blur-xl'>
            {/* Header */}
            <div className='flex items-center gap-3 py-4 px-6 border-b border-emerald-900/20 bg-emerald-900/10'>
                <div className='relative'>
                    <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-10 h-10 rounded-full object-cover border border-emerald-500/30" />
                    {onlineUsers.includes(selectedUser._id) && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0d1117]"></span>
                    )}
                </div>
                <div className='flex-1'>
                    <p className='text-lg font-bold text-white'>{selectedUser.fullName}</p>
                    <p className='text-[10px] uppercase tracking-tighter text-emerald-400/60 font-bold'>
                        {onlineUsers.includes(selectedUser._id) ? 'Secure Connection Active' : 'Offline'}
                    </p>
                </div>
                {/* Back button for mobile */}
                <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7 cursor-pointer invert opacity-70 hover:opacity-100 transition-opacity' />
            </div>

            {/* Messages Area */}
            <div className='flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar'>
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-3 ${msg.senderId === authUser._id ? 'flex-row-reverse' : 'flex-row'}`}>
                        <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-8 h-8 rounded-full border border-emerald-500/20' />

                        <div className={`flex flex-col gap-1 ${msg.senderId === authUser._id ? 'items-end' : 'items-start'}`}>
                            {msg.image ? (
                                <img src={msg.image} alt="Sent" className='max-w-[250px] border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/20' />
                            ) : (
                                <p className={`p-3 px-4 max-w-[280px] text-sm leading-relaxed rounded-[1.2rem] shadow-xl break-words ${msg.senderId === authUser._id
                                        ? 'bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-tr-none'
                                        : 'bg-slate-800/80 backdrop-blur-md text-gray-100 border border-emerald-900/30 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </p>
                            )}
                            <span className='text-[9px] text-white font-mono px-1'>{formatMessageTime(msg.createdAt)}</span>
                        </div>
                    </div>
                ))}
                <div ref={scrollEnd}></div>
            </div>

            {/* Input Area */}
            <div className='p-6 bg-transparent'>
                <div className='flex items-center gap-3 bg-emerald-900/20 backdrop-blur-2xl border border-emerald-500/20 p-2 px-3 rounded-[1.5rem] shadow-2xl focus-within:border-emerald-500/40 transition-all'>
                    
                    {/* Image Upload Icon Component */}
                    <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden />
                    <label htmlFor="image" className='hover:bg-emerald-500/10 p-3 rounded-full transition-all cursor-pointer group'>
                        <ImagePlus size={22} className='text-emerald-500/60 group-hover:text-emerald-400' />
                    </label>

                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
                        type="text"
                        placeholder="Type a secure message..."
                        className='flex-1 text-sm bg-transparent border-none outline-none text-white placeholder-emerald-900/50 py-3'
                    />

                    {/* Send Button Icon Component */}
                    <button 
                        onClick={handleSendMessage} 
                        disabled={!input.trim()}
                        className={`p-3 rounded-xl transition-all active:scale-90 flex items-center justify-center ${
                            input.trim() ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-emerald-900/20 text-emerald-900/40 cursor-not-allowed'
                        }`}
                    >
                        <SendHorizontal size={20} className='text-white' />
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className='flex-1 flex flex-col items-center justify-center gap-6 bg-[#030708]'>
            <div className='relative flex flex-col items-center group'>
                <MessageSquareQuote
                    size={100}
                    strokeWidth={1}
                    className='text-emerald-500/20 group-hover:text-white transition-all duration-700'
                />
                <div className='absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full'></div>
            </div>
            <div className='text-center'>
                <h3 className='text-3xl font-black tracking-widest bg-gradient-to-b from-white to-emerald-900 bg-clip-text text-transparent uppercase'>
                    NexusChat
                </h3>
                <p className='text-emerald-900 text-[10px] font-bold tracking-[0.3em] mt-2 uppercase opacity-60 font-mono'>
                    Protocol: Encrypted
                </p>
            </div>
        </div>
    )
}

export default ChatContainer