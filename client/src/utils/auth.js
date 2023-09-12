import decode from 'jwt-decode';

class Authenticator {
    
    login(token){
        localStorage.setItem('token', token);
        //redirect user to appropriate dashboard
    }

    getToken(){
        return localStorage.getItem('token');
    }

    logout(){
        localStorage.removeItem('token');
        //redirect user to homepage
    }

    loggedIn(){
        return this.getToken()
    }
}

export default new Authenticator;