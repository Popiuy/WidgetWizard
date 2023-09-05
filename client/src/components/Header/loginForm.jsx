import { useState } from 'react';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

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

    const formSubmit = (e) => {
        try {
            const { data } = login({
                variables: {...formState}
            })
            Auth.login(data.login.token);
        } catch (err) {

        }
    }

    return (
        <>
        {data ? (
            <div>
                <div>You have been logged in!</div>
            </div>
        ): (
            <form>
            <input className='username-field'
                placeholder ='JiminiCricket'
                name = 'username'
                type = 'text'
                value = {formState.username}
                onChange = {formResponse}
            ></input>
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