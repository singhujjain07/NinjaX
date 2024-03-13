import React, { useState,useRef, useEffect } from 'react'
import Header from '../components/Layout/Header'
import { useForces } from '../context/forces'
import { useLc } from '../context/lc'
import { useAuth } from '../context/auth'
import Heatmap from '../components/Layout/Heatmap'
import axios from 'axios'
import { toast } from 'react-toastify'
const ProfilePage = () => {
    const [selectedItem, setSelectedItem] = useState("current");
    const [color, setColor] = useState('success');
    const [auth,setAuth] = useAuth();
    const handleItemClick = (value, color) => {
        setSelectedItem(value);
        setColor(color);
    };
    const [forces] = useForces([]);
    const [lc] = useLc();

    const [combinedData, setCombinedData] = useState([]);
    const [totalProblemsSolved,setTotalProblemsSolved] = useState(0)

    const combineData = (data1, data2) => {
        const combinedData = {};
        let x=0;
        data1.forEach(item => {
            const date = item.date;
            x+=item.count;
            combinedData[date] = (combinedData[date] || 0) + item.count;
        });
        data2.forEach(item => {
            const date = item.date;
            combinedData[date] = (combinedData[date] || 0) + item.count;
        });
        setTotalProblemsSolved(x+lc.solved);
        return Object.keys(combinedData).map(date => ({ date, count: combinedData[date] }));
    };
    useEffect(() => {
        setCombinedData(combineData(forces, lc.calendar));
    }, [lc, forces])

    const closeRef = useRef();
    const [newName,setNewName] = useState("");
    const [newLcid,setNewLcid] = useState("");
    const [newCfid,setNewCfid] = useState("");
    const [newAboutMe,setNewAboutMe] = useState("");
    const [newEmail,setNewEmail] = useState("");

    useEffect(()=>{
        const {name,email,cfid,lcid,about} = auth?.user || {};
        setNewAboutMe(about);
        setNewCfid(cfid);
        setNewEmail(email);
        setNewLcid(lcid);
        setNewName(name);
    },[auth?.user])

    const handleSave = async () => {
        try {
            const { data } = await axios.put('/server/v1/auth/update-profile', { name: newName, email: newEmail, about: newAboutMe, cfid: newCfid,lcid: newLcid })
            if (data?.success) {
                setAuth({...auth,user:data?.updatedUser})
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth',JSON.stringify(ls))
                toast.success('Profile Updated Successfully')
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
    const handleBTN = async () => {
        handleSave();
        closeRef.current.click();
    }
    return (
        <div className='profilePg' >
            <Header />
            <section className='mt-5' style={{ backgroundColor: '#F4F8FC' }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card profile_card mb-4">
                                <div className="card-body text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                                    <h5 className="my-3">
                                        {auth?.user ? auth?.user?.name : 'Harsh Singh'}
                                    </h5>
                                    <p className="text-muted mb-1">Full Stack Developer</p>
                                    <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        {/* <button type="button" className="btn btn-primary">Follow</button> */}
                                        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editprofile">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card profile_card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <img style={{ height: '20px' }} src="images/codeforces.svg" alt="lc_img" />
                                            <p className="mb-0">
                                                {(auth?.user && auth?.user?.cfid) ? auth?.user?.cfid : 'NA'}
                                            </p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <img style={{ height: '20px' }} src="images/leetcode.svg" alt="lc_img" />
                                            <p className="mb-0">
                                                {(auth?.user && auth?.user?.lcid) ? auth?.user?.lcid : 'NA'}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card profile_card mb-4" style={{ width: "100%" }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9 text-end">
                                            <p className="text-muted mb-0">{auth?.user?.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9 text-end">
                                            <p className="text-muted mb-0">{auth?.user?.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Problems Solved</p>
                                        </div>
                                        <div className="col-sm-9 text-end">
                                            <p className="text-muted mb-0">{totalProblemsSolved} {"(all time)"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3>Combined Heatmap</h3>
                            <div className="dropdown-center text-end">
                                <button className="btn btn-outline-dark btn-sm dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className={`d-inline-block bg-${color} rounded-circle p-1 me-1 gap-2`} />
                                    {selectedItem}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2022', 'danger')}>
                                        <span className="d-inline-block bg-danger rounded-circle p-1" />
                                        2022
                                    </div></li>
                                    <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2023', 'warning')}>
                                        <span className="d-inline-block bg-warning rounded-circle p-1" />
                                        2023
                                    </div></li>
                                    <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2024', 'primary')}>
                                        <span className="d-inline-block bg-primary rounded-circle p-1" />
                                        2024
                                    </div></li>
                                    <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('current', 'success')}>
                                        <span className="d-inline-block bg-success rounded-circle p-1" />
                                        current
                                    </div></li>
                                </ul>
                            </div>
                            
                            <Heatmap data={combinedData} year={selectedItem} />
                            {/* <div className="row">
                                <div className="col-md-6">
                                    <div className="card mb-4 mb-md-0">
                                        <div className="card-body">
                                            <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                            </p>
                                            <p className="mb-1" style={{ fontSize: '0.77rem' }}>Web Design</p>
                                            <div className="progress rounded" style={{ height: '5px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '0.77rem' }}>Website Markup</p>
                                            <div className="progress rounded" style={{ height: '5px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '0.77rem' }}>One Page</p>
                                            <div className="progress rounded" style={{ height: '5px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '0.77rem' }}>Mobile Template</p>
                                            <div className="progress rounded" style={{ height: '5px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '0.77rem' }}>Backend API</p>
                                            <div className="progress rounded mb-2" style={{ height: '5px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card mb-4 mb-md-0">
                                        <div className="card-body">
                                            <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                            </p>
                                            <p className="mb-1" style={{ fontSize: '0.77rem' }}>Web Design</p>
                                            <div className="progress rounded" style={{ height: '5px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '0.77rem' }}>Website Markup</p>
                                            <div className="progress rounded" style={{ height: '5px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '0.77rem' }}>One Page</p>
                                            <div className="progress rounded" style={{ height: '5px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '0.77rem' }}>Mobile Template</p>
                                            <div className="progress rounded" style={{ height: '5px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '0.77rem' }}>Backend API</p>
                                            <div className="progress rounded mb-2" style={{ height: '5px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <div>
            <div className="modal fade" id="editprofile" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-dark modal-dialog-centered">
                        <div className="modal-content bg-dark text-light">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Details
                                </h1>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="full-name" className="col-form-label text-light">
                                            Fullname:
                                        </label>
                                        <input value={newName} onChange={(e) => setNewName(e.target.value)} type="text" className="form-control bg-dark text-light" id="full-name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="new-email" className="col-form-label text-light">
                                            Email:
                                        </label>
                                        <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="text" className="form-control bg-dark text-light" id="new-email" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="about-me" className="col-form-label">
                                            About Me:
                                        </label>
                                        <textarea value={newAboutMe} onChange={(e) => setNewAboutMe(e.target.value)} className="form-control bg-dark text-light" id="about-me"  />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="new-lc" className="col-form-label">
                                            Leetcode ID:
                                        </label>
                                        <textarea value={newLcid} onChange={(e) => setNewLcid(e.target.value)} className="form-control bg-dark text-light" id="new-lc" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="new-cf" className="col-form-label">
                                            Codeforces ID:
                                        </label>
                                        <textarea value={newCfid} onChange={(e) => setNewCfid(e.target.value)} className="form-control bg-dark text-light" id="new-cf" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => handleBTN()}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage