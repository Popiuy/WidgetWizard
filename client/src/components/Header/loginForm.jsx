import { useState } from 'react';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

const LoginForm = () => {

    const [formState, setFormState] = useState({ username: '', password: ''});
    const [login, {data}] = useMutation(LOGIN_USER);

    const formResponse = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value
        })

        console.log(formState);
    }

    const formSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await login(
                {
                    variables: {...formState}
                }
            )
            Auth.login(
                {
                    token: data.login.token, 
                    user: data.login.user
                }
            );
            Swal.fire(
                'User has been logged in!',
                'Success!',
                'success'
              )
            
        } catch (err) {
            console.log(err);
            Swal.fire(
                'User does not exist!',
                'Could not login',
                'error'
              )
        }
    }

    return (
        <>
        {data ? (
            <div>
                <div>You have been logged in!</div>
            </div>
        ): (
        <form onSubmit={formSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
            <input type="text" name="username" className="username-field form-control" value={formState.username} onChange={formResponse}></input>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="password" className="password-field form-control" value={formState.password} onChange={formResponse}></input>
        </div>
        <button type="submit" className="submit-button btn btn-primary">Submit</button>
        </form>
        )}
        </>
    )

}

export default LoginForm;