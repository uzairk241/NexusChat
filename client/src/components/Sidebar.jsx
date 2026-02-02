import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { MessageSquareQuote, Settings, LogOut, MoreVertical, Search } from 'lucide-react'

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);
    const { logout, onlineUsers } = useContext(AuthContext)
    const [input, setInput] = useState("")
    const navigate = useNavigate();

    const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

    useEffect(() => {
        getUsers();
    }, [onlineUsers])

    return (
        <div className={`bg-[#0a0f0f] h-full p-6 border-r border-emerald-900/10 overflow-y-auto text-white ${selectedUser ? "max-md:hidden" : ''} custom-scrollbar`}>
            <div className='pb-6'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <MessageSquareQuote size={28} className='text-emerald-500' />
                        <span className='text-xl font-black tracking-tighter bg-gradient-to-r from-white to-emerald-600 bg-clip-text text-transparent'>
                            Nexus
                        </span>
                    </div>

                    {/* --- FIXED MENU SECTION --- */}
                    <div className="relative group">
                        {/* MoreVertical Button */}
                        <div className='p-2 hover:bg-emerald-500/20 rounded-full cursor-pointer transition-all flex items-center justify-center border border-transparent hover:border-emerald-500/30 active:scale-90'>
                            <MoreVertical size={20} className='text-emerald-400 opacity-100' />
                        </div>

                        {/* Dropdown Menu */}
                        <div className='absolute top-full right-0 z-50 pt-2 hidden group-hover:block'>
                            <div className='w-48 p-2 rounded-2xl bg-[#0d1313] border border-emerald-500/20 text-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col'>
                                <div
                                    onClick={() => navigate('/profile')}
                                    className='flex items-center gap-3 p-3 cursor-pointer text-xs hover:bg-emerald-500/10 rounded-xl transition-all font-bold text-slate-200 hover:text-emerald-400'
                                >
                                    <Settings size={16} /> Edit Settings
                                </div>

                                <div className='h-[1px] bg-emerald-900/20 mx-2 my-1'></div>

                                <div
                                    onClick={() => logout()}
                                    className='flex items-center gap-3 p-3 cursor-pointer text-xs hover:bg-red-500/10 text-slate-200 hover:text-red-400 rounded-xl transition-all font-bold'
                                >
                                    <LogOut size={16} /> Disconnect
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-emerald-950/20 rounded-2xl flex items-center gap-3 py-3 px-5 mt-6 border border-emerald-500/5 focus-within:border-emerald-500/30 focus-within:bg-emerald-950/40 transition-all group/search'>
                    <Search size={16} className="text-emerald-700 group-focus-within/search:text-emerald-400 transition-colors" />
                    
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className='bg-transparent border-none outline-none text-white text-[11px] placeholder-emerald-900/60 flex-1'
                        placeholder='FIND CONTACTS...'
                    />
                </div>
            </div>

            {/* --- USER LIST --- */}
            <div className='flex flex-col gap-2'>
                {filteredUsers.map((user, index) => (
                    <div
                        onClick={() => { setSelectedUser(user); setUnseenMessages(prev => ({ ...prev, [user._id]: 0 })) }}
                        key={index}
                        className={`relative flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer border ${selectedUser?._id === user._id
                                ? 'bg-emerald-500/10 border-emerald-500/20 shadow-[inset_0_0_15px_rgba(16,185,129,0.05)]'
                                : 'hover:bg-emerald-500/5 border-transparent'
                            }`}
                    >
                        <div className='relative'>
                            <img
                                src={user?.profilePic || assets.avatar_icon}
                                alt=""
                                className='w-11 h-11 rounded-full object-cover border-2 border-emerald-900/20 shadow-sm'
                            />
                            {onlineUsers.includes(user._id) && (
                                <div className='absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0a0f0f] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]'></div>
                            )}
                        </div>
                        <div className='flex-1 overflow-hidden'>
                            <p className='font-bold text-sm truncate text-slate-100'>{user.fullName}</p>
                            <p className={`text-[9px] font-black uppercase tracking-widest ${onlineUsers.includes(user._id) ? 'text-emerald-500' : 'text-slate-600'}`}>
                                {onlineUsers.includes(user._id) ? 'Live' : 'Offline'}
                            </p>
                        </div>
                        {unseenMessages[user._id] > 0 && (
                            <span className='h-5 w-5 flex justify-center items-center rounded-full bg-emerald-500 text-black text-[10px] font-black animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.4)]'>
                                {unseenMessages[user._id]}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar