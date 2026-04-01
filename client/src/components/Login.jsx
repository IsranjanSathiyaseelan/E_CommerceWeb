import React from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext()

  const [state, setState] = React.useState("login")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name, email, password
      })
      if (data.success) {
        navigate('/')
        setUser(data.user)
        setShowUserLogin(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="login-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        onClick={() => setShowUserLogin(false)}
        className="fixed inset-0 z-30 flex items-center justify-center text-sm text-gray-600"
        style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,0.45)' }}
      >
        {/* Form card */}
        <motion.form
          key="login-form"
          onSubmit={onSubmitHandler}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 items-start p-8 py-12 w-80 sm:w-[352px] rounded-2xl shadow-2xl border border-white/20 bg-white relative"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setShowUserLogin(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none cursor-pointer"
          >
            ✕
          </button>

          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
          </p>

          {state === "register" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full overflow-hidden"
            >
              <p>Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="type here"
                className="border border-gray-200 rounded-lg w-full p-2 mt-1 outline-primary focus:border-primary transition-colors"
                type="text"
                required
              />
            </motion.div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="type here"
              className="border border-gray-200 rounded-lg w-full p-2 mt-1 outline-primary focus:border-primary transition-colors"
              type="email"
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="type here"
              className="border border-gray-200 rounded-lg w-full p-2 mt-1 outline-primary focus:border-primary transition-colors"
              type="password"
              required
            />
          </div>

          {state === "register" ? (
            <p>
              Already have account?{' '}
              <span onClick={() => setState("login")} className="text-primary cursor-pointer hover:underline">
                click here
              </span>
            </p>
          ) : (
            <p>
              Create an account?{' '}
              <span onClick={() => setState("register")} className="text-primary cursor-pointer hover:underline">
                click here
              </span>
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2.5 rounded-lg cursor-pointer font-medium"
          >
            {state === "register" ? "Create Account" : "Login"}
          </motion.button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  )
}

export default Login