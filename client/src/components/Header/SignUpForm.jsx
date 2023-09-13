import { useState } from 'react';
import { CREATE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import Swal from 'sweetalert2';

export default function SignUpForm() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [createUser] = useMutation(CREATE_USER)

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

        try {
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
        } catch(err) {
            Swal.fire(
                'Duplicate user!',
                'Could not signup',
                'error'
              )
        }

    }

    return (
        <div>
        <form className="signup-form" onSubmit={handleFormSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                <input type="text" name="username" className="signup-username form-control" onChange={handleFormData} value={formData.username}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="signup-email form-control" onChange={handleFormData} value={formData.email}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="signup-password form-control" onChange={handleFormData} value={formData.password}></input>
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    </div>
)
}