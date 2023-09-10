import { useState } from 'react';
import { LOGIN_USER } from '../../utils/mutations';
import Auth  from '../../utils/auth';
import { useMutation, useQuery } from '@apollo/client';

const LoginForm = (props) => {

    const [formState, setFormState] = useState({ username: '', password: ''});
    const [login, {error, data}] = useMutation(LOGIN_USER);

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

        console.log(formState)
        
        try {
            const { user, token } = await login({
                variables: {...formState}
            })

            Auth.login(user, token);
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
        </form>
        )}
        </>
    )

}

export default LoginForm;