import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'
import { MessageSquareQuote } from 'lucide-react'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (event)=>{
    event.preventDefault();
    if(currState === 'Sign up' && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }
    login(currState=== "Sign up" ? 'signup' : 'login', {fullName, email, password, bio})
  }

  return (
    <div className='min-h-screen bg-[#020606] flex items-center justify-center gap-12 sm:justify-evenly max-sm:flex-col backdrop-blur-3xl text-white'>

      {/* -------- left */}
      <div className='flex flex-col items-center gap-4'>
        <div className='relative'>
          <MessageSquareQuote 
            size={110} 
            strokeWidth={1} 
            className='text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.6)]'
          />
          <div className='absolute inset-0 bg-emerald-500/10 blur-3xl -z-10 rounded-full'></div>
        </div>
        <div className='text-center'>
            <h1 className='text-6xl font-black tracking-tight bg-gradient-to-tr from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent'>
            NexusChat
            </h1>
            <p className='text-emerald-500/50 text-xs font-bold tracking-[0.4em] uppercase mt-2'>Private Messaging</p>
        </div>
      </div>

      {/* -------- right -------- */}
      <form onSubmit={onSubmitHandler} className='border border-emerald-500/10 bg-[#0a1212]/80 backdrop-blur-xl p-10 flex flex-col gap-6 rounded-[2rem] shadow-3xl w-full max-w-md'>
        <h2 className='font-bold text-3xl tracking-tight flex justify-between items-center text-emerald-50'>
          {currState === "Sign up" ? "Join Us" : "Welcome Back"}
          {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 invert opacity-70 hover:opacity-100 transition-all'/>}
        </h2>

        <div className='flex flex-col gap-4'>
          {currState === "Sign up" && !isDataSubmitted && (
            <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
               type="text" className='p-4 bg-black/40 border border-emerald-900/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-gray-600' placeholder="Full Name" required/>
          )}

          {!isDataSubmitted && (
            <>
              <input onChange={(e)=>setEmail(e.target.value)} value={email}
               type="email" placeholder='Email Address' required className='p-4 bg-black/40 border border-emerald-900/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-gray-600'/>
              <input onChange={(e)=>setPassword(e.target.value)} value={password}
               type="password" placeholder='Password' required className='p-4 bg-black/40 border border-emerald-900/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-gray-600'/>
            </>
          )}

          {currState === "Sign up" && isDataSubmitted && (
              <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
               rows={4} className='p-4 bg-black/40 border border-emerald-900/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-gray-600' placeholder='Tell us about yourself...' required></textarea>
            )
          }
        </div>

        <button type='submit' className='py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold rounded-2xl cursor-pointer transition-all transform active:scale-95 shadow-xl shadow-emerald-900/20 uppercase tracking-widest text-sm'>
          {currState === "Sign up" ? "Get Started" : "Authenticate"}
        </button>

        <div className='flex items-center gap-2 text-[10px] text-emerald-900/60 uppercase font-bold'>
          <input type="checkbox" className='accent-emerald-500' />
          <p>I accept terms & security protocols.</p>
        </div>

        <div className='flex flex-col gap-2 pt-4 border-t border-emerald-900/20'>
          {currState === "Sign up" ? (
            <p className='text-xs text-gray-500 text-center'>Already a member? <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}} className='text-emerald-400 cursor-pointer hover:text-emerald-300 font-bold'>SIGN IN</span></p>
          ) : (
            <p className='text-xs text-gray-500 text-center'>New here? <span onClick={()=> setCurrState("Sign up")} className='text-emerald-400 cursor-pointer hover:text-emerald-300 font-bold'>REGISTER</span></p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPage