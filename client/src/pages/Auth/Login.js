import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout/Layout'
import "../../styles/Login.css"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://ninjax.onrender.com/server/v1/auth/login",
                { email, password }
            )
            if(res && res.data.success){
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/')
                
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong!!')
        }
    }
    return (
        <Layout>
            <div className="container-fluid reg_c" style={{ backgroundColor: "white" }}>
                <form onSubmit={handleSubmit} className="mt-5 mx-5 mb-2 d-flex justify-content-center align-items-center flex-column">
                    <div className="w-100">
                        <h1 className="h3 mb-3 fw-normal">Login</h1>
                        <div className="form-floating mb-2">
                            <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="name@example.com" />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Password" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit">Sign In</button>
                        <p className="mt-5 mb-3 text-body-secondary">© 2023–2024</p>
                    </div>
                </form>
            </div>

        </Layout>
    )
}

export default Login