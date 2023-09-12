import { useState } from 'react';
import { CREATE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';




export default function SignUpForm() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [createUser, { error, data }] = useMutation(CREATE_USER)

    const handleFormData = (e) => {
        const { name, value } = e.target;
        console.log(name)
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const { data } = await createUser({
            variables: { ...formData }
        });

        Auth.login(
            {
                token: data.createUser.token,
                user: data.createUser.user
            }
        );

        setFormData({
            username: '',
            email: '',
            password: '',
        })
    }

    return (
        <div>
{/* /* // <form className="signup-form" onSubmit={handleFormSubmit}>
//     <label>Username: </label>
//     <input className="signup-username" type='text' name="username" onChange={handleFormData} value={formData.username} placeholder='MikeWazowski'></input>
//     <label>Email: </label>
//     <input className="signup-email" type="email" name="email" onChange={handleFormData} value={formData.email} placeholder="greenmamba@monster.inc"></input>
//     <label>Password: </label>
//     <input className="signup-password" type="password" name="password" onChange={handleFormData} value={formData.password} placeholder="password"></input>
//     <button type="submit">Sign Up</button>
// </form> */}

        <form className="signup-form" onSubmit={handleFormSubmit}>
            <div className="mb-3">
                <label for="exampleInputUsername1" className="form-label">Username</label>
                <input type="text" name="username" className="signup-username form-control" onChange={handleFormData} value={formData.username}></input>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="signup-email form-control" onChange={handleFormData} value={formData.email}></input>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="signup-password form-control" onChange={handleFormData} value={formData.password}></input>
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    </div>
)
}