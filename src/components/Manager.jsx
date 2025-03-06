import React, { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);


    const getPasswords = async() => {
        let req= await fetch('http://localhost:5000/')
        let passwords = await req.json()
        
        setPasswordArray(passwords)
        
    }


    useEffect(() => {
        getPasswords();
        // let passwords = localStorage.getItem('passwords')
        // if (passwords) {
        //     setPasswordArray(JSON.parse(passwords))


        // }
        
    }, [])



    const showPassword = () => {
        const input = document.getElementById('password');
        if (input.type === 'password') {
            input.type = 'text';
            ref.current.src = 'icons/eyecross.png';
        } else {
            input.type = 'password';
            ref.current.src = 'icons/eye.png';
        }
    }
    const savePassword = async() => {
        if (!form.site || !form.username || !form.password) {
            toast.error('Please fill all the fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
            });
            return
        }
        //if any such id exist in database then delete it
        await fetch('http://localhost:5000/', {
            method: 'DELETE',headers: {
                'Content-Type': 'application/json',
                },body: JSON.stringify({ id: form.id})
        })

        setPasswordArray([...passwordArray, {...form , id: uuidv4()}])
        
        await fetch('http://localhost:5000/', {
            method: 'POST',headers: {
                'Content-Type': 'application/json',
                },body: JSON.stringify({...form , id: uuidv4()})
        })
        // localStorage.setItem('passwords', JSON.stringify([...passwordArray, {...form , id: uuidv4()}]))
        setForm({ site: '', username: '', password: '' })
        toast.success('Password saved successfully');
        // console.log(passwordArray)
    }

    const deletePassword = async(id) => {
        let cfm = confirm("Are you sure ?");
        if(cfm){
        let passwords = passwordArray.filter(password => password.id !== id);
        setPasswordArray(passwords)
        await fetch('http://localhost:5000/', {
            method: 'DELETE',headers: {
                'Content-Type': 'application/json',
                },body: JSON.stringify({ id})
        })
        // localStorage.setItem('passwords', JSON.stringify(passwords))
        toast.success('Password deleted successfully')   

        }

    }

    const editPassword = async(id) => {
        let passwords = passwordArray.filter(password => password.id !== id);
        let selectedPassword = passwordArray.find(password => password.id === id);
        setForm({...selectedPassword ,id: id})
        
        setPasswordArray(passwords)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Text copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
            });
                
          
            
            
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                // transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>


            <div className=" p-4 max-w-3xl mx-auto "> 
                <h1 className="text-4xl text font-bold text-center">
                    <span className='text-green-500'>&lt;</span>
                    Pwd
                    <span className='text-green-500'>/Mgr&gt;</span>

                </h1>
                <p className="text-green-900 text-center text-lg">Your personal password Manager</p>
                <div className="flex flex-col p-4 text-black gap-4 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full    gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />
                        <div className='relative '>
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='bg-green-400 hover:bg-green-300 flex justify-center items-center border    border-gray-900 rounded-full px-8 py-2 gap-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>

                        Save
                    </button>
                </div>
                <div className="mt-6">
                    <h1 className='font-bold py-4 text-2xl'>Your Passwords</h1>
                    {passwordArray.length === 0 ? <div> No passwords to show</div> :
                    <div className="overflow-x-auto">
                    <table className="table-auto overflow-hidden rounded-md w-full text-sm sm:text-base">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className=' py-2'>Site</th>
                                <th className=' py-2'>Username</th>
                                <th className=' py-2'>Password</th>
                                <th className=' py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((password, index) => {

                                return <tr key={index}>
                                    <td className="py-2 border border-white text-center w-32 break-words">
                                        <div className="flex items-center justify-center gap-2" >
                                            <a href={password.site} target="_blank" >{password.site}</a>
                                            <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" className="w-6 h-6 cursor-pointer" onClick={() => { copyText(password.site) }}></lord-icon>
                                        </div>
                                    </td>

                                    <td className="py-2 border border-white text-center w-32">
                                        <div className="flex items-center justify-center gap-2" >
                                            {password.username}
                                            <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" className="w-6 h-6 cursor-pointer" onClick={() => { copyText(password.username) }}></lord-icon>
                                        </div>

                                    </td>
                                    <td className="py-2 border border-white text-center w-32">
                                        <div className="flex items-center justify-center gap-2  " >
                                            {("*").repeat(password.password.length)}
                                            <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" className="w-6 h-6 cursor-pointer" onClick={() => { copyText(password.password) }}></lord-icon>
                                        </div>
                                    </td>
                                    <td className="py-2 border border-white text-center w-32">
                                        <div className="flex items-center justify-center gap-2" >
                                            
                                            <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" className="w-6 h-6 cursor-pointer" onClick={() => { editPassword(password.id) }}></lord-icon>
                                            <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" className="w-6 h-6 cursor-pointer" onClick={() => { deletePassword(password.id)}}></lord-icon>
                                        </div>
                                    </td>
                                </tr>

                            })}

                        </tbody>
                    </table>
                    </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager