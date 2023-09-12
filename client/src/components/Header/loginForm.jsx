import { useState } from 'react';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';

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
            
        } catch (err) {
            console.log(err);
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
            <label for="exampleInputUsername1" className="form-label">Username</label>
            <input type="text" name="username" className="username-field form-control" value={formState.username} onChange={formResponse}></input>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="password" className="password-field form-control" value={formState.password} onChange={formResponse}></input>
        </div>
        <button type="submit" className="submit-button btn btn-primary">Submit</button>
        </form>
        )}
        {/* <form onSubmit={formSubmit}>
            <label>Username: </label>
            <input className='username-field'
                placeholder ='JiminiCricket'
                name = 'username'
                type = 'text'
                value = {formState.username}
                onChange = {formResponse}
            ></input>
            <label>Password: </label>
            <input className='password-field'
                placeholder='******'
                name = 'password'
                type = 'password'
                value = {formState.password}
                onChange = {formResponse}
                ></input>
            <button className = 'submit-button' type='submit'>
                Submit
            </button>
        </form> */}
        </>
    )

}

export default LoginForm;