import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cfid, setCfid] = useState("")
    const [lcid, setLcid] = useState("")
    const navigate = useNavigate()

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("https://ninjax.onrender.com/server/v1/auth/register",
                {name,email,password,cfid,lcid}
            )
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }

    return (
        <Layout>
            <div className="container-fluid reg_c" style={{ backgroundColor: "white" }}>
                <form onSubmit={handleSubmit} className="mt-5 mx-5 mb-2 d-flex justify-content-center align-items-center flex-column">
                    <div className="w-100">
                        <h1 className="h3 mb-3 fw-normal">Register</h1>
                        <div className="form-floating mb-2">
                            <input onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="name" placeholder="name" required />
                            <label htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="name@example.com" required />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Password" required/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input onChange={(e)=>setCfid(e.target.value)} type="text" className="form-control" id="forces" placeholder="Codeforces ID" />
                            <label htmlFor="floatingPassword">Codeforces ID</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input onChange={(e)=>setLcid(e.target.value)} type="text" className="form-control" id="leetcode" placeholder="Leetcode ID" />
                            <label htmlFor="floatingPassword">Leetcode ID</label>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit">Sign Up</button>
                        <p className="mt-5 mb-3 text-body-secondary">© 2023–2024</p>
                    </div>
                </form>
            </div>

        </Layout>
    )
}

export default Register