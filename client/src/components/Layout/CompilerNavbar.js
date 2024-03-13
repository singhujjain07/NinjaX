import React, { useRef, useState } from 'react';
import Select from 'react-select';
import '../../styles/CompilerNavbar.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Navbar = ({ userLang, setUserLang, userTheme,
    setUserTheme, content, c, fontSize, setFontSize, onFileInputChange, link_ind }) => {

    const [auth, setAuth] = useAuth();
    const [filename, setFilename] = useState(c ? c.name : "NinjaX");
    const [desc, setDesc] = useState(c ? c.desc : "");
    const closeRef = useRef();
    const owner = auth?.user?._id;
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python3", label: "Python" },
        { value: "java", label: "Java" },
        { value: "csharp", label: "C#" },
        { value: "kotlin", label: "Kotlin" },
        { value: "nodejs", label: "NodeJS" },
        { value: "ruby", label: "Ruby" },
        { value: "rust", label: "RUST" },
        { value: "verilog", label: "VERILOG" },

    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },        
    ]

    // Function to handle file input change
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                onFileInputChange(contents); // Pass the file contents to the parent component
            };
            reader.readAsText(file);
        }
    };
    const handleSave = async () => {
        try {
            if (content == "") {
                toast.error("Code is empty");
                return;
            }
            if (c) {
                const { data } = await axios.put(`/server/v1/code/update-code/${c._id}`, { content: content });
                if (data?.success) {
                    toast.success(data?.message);
                    console.log(data?.newCode)
                } else {
                    toast.error(data?.message);
                }
                return;
            }
            const { data } = await axios.post('/server/v1/code/save-code', { owner: owner, name: filename, desc: desc, content: content })
            if (data?.success) {
                toast.success(data?.message);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
    const handleBTN = async () => {
        if (!filename || !desc) {
            toast.error("Filename and Desc are required fields!")
        } else {
            handleSave();
        }
        closeRef.current.click();
    }

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth');
        toast.success('Logged Out Successfully')
    }

    return (
        // <div className="compiler-navbar">
        //     <h1>Babadon Code Compiler</h1>
        //     <Select options={languages} value={userLang}
        //         onChange={(e) => setUserLang(e.value)}
        //         placeholder={userLang} />
        //     <Select options={themes} value={userTheme}
        //         onChange={(e) => setUserTheme(e.value)}
        //         placeholder={userTheme} />
        //     <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileInputChange} />
        //     <button onClick={() => document.getElementById('fileInput').click()}>Import</button>
        //     <label>Font Size</label>
        //     <input type="range" min="18" max="30"
        //         value={fontSize} step="2"
        //         onChange={(e) => { setFontSize(e.target.value) }} />
        // </div>
        // <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid m-2">
                {/* Toggle button */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Navbar brand */}
                <Link className="navbar-brand mt-2 mt-lg-0 me-5" to="/">
                    <div className='d-flex align-items-center justify-content-center flex-row'>
                        <img className='me-2' src="images/brand.png" height={45} alt="MDB Logo" loading="lazy" />
                        <h3 className='mb-0'>NinjaX</h3>
                    </div>

                </Link>
                {/* Collapsible wrapper */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left links */}
                    {
                        link_ind == 1 ? (
                            <div className='me-auto'></div>
                        ) : (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                                <li className="nav-item me-3">
                                    <Select options={languages} value={userLang}
                                        onChange={(e) => setUserLang(e.value)}
                                        placeholder={userLang} />
                                </li>
                                <li className="nav-item me-3">
                                    <Select options={themes} value={userTheme}
                                        onChange={(e) => setUserTheme(e.value)}
                                        placeholder={userTheme == "light" ? "Light" : "Dark" } />
                                </li>
                                <li className="nav-item me-3">
                                    <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileInputChange} />
                                    <button style={{ borderRadius: "20px" }} className='btn btn-warning' onClick={() => document.getElementById('fileInput').click()}>
                                        Import
                                    </button>
                                </li>
                                <li className="nav-item me-3">
                                    <button style={{ borderRadius: "20px" }} className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Save
                                    </button>
                                </li>
                                <li className="nav-item me-3">
                                    <label className='me-3' style={{ color: "#afec3f" }}>Font Size</label>
                                    <input type="range" min="12" max="30"
                                        value={fontSize} step="2"
                                        onChange={(e) => { setFontSize(e.target.value) }} />
                                </li>
                            </ul>
                        )
                    }

                    {/* Right elements */}
                    <div className="d-flex align-items-center">
                        {/* Home */}
                        {
                            link_ind == 1 ? (
                                <Link style={{ borderRadius: "20px" }} className='btn btn-warning me-5' to={"/compiler"}>
                                    Compiler
                                </Link>
                            ) : (
                                <Link style={{ borderRadius: "20px" }} className='btn btn-warning me-5' to={"/"}>
                                    Home
                                </Link>
                            )
                        }
                        {/* Avatar */}
                        <div className="dropdown">
                            <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" className="rounded-circle bg-warning"  height={25} alt="Black and White Portrait of a Man" loading="lazy" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                                <li>
                                    <Link className="dropdown-item" to="/profile">
                                        Profile
                                    </Link>                                </li>
                                <li>
                                    <Link onClick={handleLogout} className="dropdown-item" to="/login">
                                        Logout
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to={"/files"}>Saved Files</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Right elements */}
                </div>
                {/* Collapsible wrapper */}
            </div>
            <div>
                {/* Button trigger modal */}
                {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button> */}
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <label htmlFor="code-name" className="col-form-label text-light">
                                            Fileame:
                                        </label>
                                        <input value={filename} onChange={(e) => setFilename(e.target.value)} type="text" className="form-control bg-dark text-light" id="code-name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="code-desc" className="col-form-label">
                                            Description:
                                        </label>
                                        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control bg-dark text-light" id="code-desc" required />
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

        </nav>

    )
}

export default Navbar