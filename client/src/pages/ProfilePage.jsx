import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import { UserRoundPen } from 'lucide-react';

const ProfilePage = () => {
  const {authUser, updateProfile} = useContext(AuthContext)
  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName: name, bio});
      navigate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async ()=>{
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image, fullName: name, bio});
      navigate('/');
    }
  }

  return (
    <div className='min-h-screen bg-[#05080a] flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl bg-[#0d1317] text-slate-300 border border-slate-800 flex items-center justify-between max-sm:flex-col-reverse rounded-3xl overflow-hidden shadow-2xl'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-12 flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">Account Settings</h3>
          <label htmlFor="avatar" className='flex items-center gap-4 cursor-pointer group'>
            <input onChange={(e)=>setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            <div className='relative'>
                <img src={selectedImg ? URL.createObjectURL(selectedImg) : (authUser?.profilePic || assets.avatar_icon)} alt="" className={`w-16 h-16 object-cover border-2 border-emerald-500/50 ${selectedImg || authUser?.profilePic ? 'rounded-full' : 'rounded-xl'}`}/>
                <div className='absolute inset-0 bg-black/40 items-center justify-center hidden group-hover:flex rounded-full'>
                    <span className='text-[10px]'>Change</span>
                </div>
            </div>
            <span className='text-sm text-slate-400 hover:text-emerald-400 transition-colors'>Update profile picture</span>
          </label>
          
          <input onChange={(e)=>setName(e.target.value)} value={name}
           type="text" required placeholder='Your name' className='p-3 bg-black/20 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all'/>
          
           <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder="Tell the world about you..." required className="p-3 bg-black/20 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" rows={4}></textarea>

           <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 mt-2">Update Profile</button>
        </form>

        <div className="bg-[#121a1f] w-1/3 h-full flex items-center justify-center p-10 max-sm:w-full max-sm:py-10">
          {selectedImg || authUser?.profilePic ? (
            <div className='p-1 border-2 border-emerald-500/30 rounded-full shadow-2xl shadow-emerald-500/10'>
                <img 
                className="w-32 h-32 object-cover rounded-full" 
                src={selectedImg ? URL.createObjectURL(selectedImg) : authUser.profilePic} 
                alt="Profile" 
                />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <UserRoundPen size={60} className="text-emerald-500/80" />
              <p className="text-xs font-black tracking-widest text-white uppercase">Nexus ID</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage