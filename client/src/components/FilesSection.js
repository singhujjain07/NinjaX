import React, { useEffect, useState } from 'react'
import CompilerNavbar from '../components/Layout/CompilerNavbar'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useAuth } from '../context/auth'
import { Link, useNavigate } from 'react-router-dom';
const FilesSection = () => {
    const [auth, setAuth] = useAuth();
    const [allCodes, setAllCodes] = useState([]);
    const navigate = useNavigate();
    const toComponentB = async(c) => {
        navigate('/compiler', { state: { c:c} });
    }
    const getAllCodes = async () => {
        try {
            const { data } = await axios.post(`https://ninjax.onrender.com/server/v1/code/fetch-code/${auth?.user?._id}`)
            setAllCodes(data?.data);
        } catch (error) {
            console.log(error);
        }
    }
    // delete a product
    const handleDelete = async (id) => {
        try {
            let answer = window.prompt('Do you want to delete this code?')
            if (!answer) return;
            const { data } = await axios.delete(`https://ninjax.onrender.com/server/v1/code/delete-code/${id}`)
            toast.success('Code Deleted Successfully')
            getAllCodes();
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }
    useEffect(() => {
        getAllCodes();
    }, [auth?.user?._id])


    return (
        <div className='files_app'>
            <CompilerNavbar link_ind={1} />
            <div className='container-fluid px-5' style={{ backgroundColor: "#F4F8FC" }}>
                <div className='m-5'>
                    <div className="my-3 p-3 bg-body rounded shadow-sm">
                        <h6 className="border-bottom pb-2 mb-0">My Saved Codes</h6>
                        {allCodes.map((c, index) => (
                            <div key={index} className="d-flex text-body-secondary pt-3">
                                <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width={32} height={32} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill={index % 3 == 0 ? "#007bff" : index % 3 == 1 ? "#e83e8c" : "#6f42c1"} /></svg>
                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <strong className=" text-gray-dark">@{c.name}</strong>
                                        <div>
                                            <div  className="btn btn_files btn-success me-2"
                                                onClick={() => { toComponentB(c) }}
                                            >Edit</div>
                                            {/* <div onClick={()=>{toComponentB(c.content)}}>Component B<a/></div> */}
                                            <button type="button" className="btn btn_files btn-danger" onClick={() => { handleDelete(c._id) }}>Delete</button>
                                        </div>
                                    </div>
                                    {c.desc}
                                </div>

                            </div>

                        ))}

                        <small className="d-block text-end mt-3">
                            <Link to="/compiler">continue coding</Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilesSection