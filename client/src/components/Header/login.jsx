import { useState } from 'react';
import { LOGIN_USER } from '../../utils/mutations'

const Login = (props) => {

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
        //define mutations first
    }

    return (
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
            <button></button>
        </form>
        )

}