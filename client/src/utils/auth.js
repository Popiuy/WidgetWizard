import decode from 'jwt-decode';

class Authenticator {
    
    login(user, token){
        localStorage.setItem('token', token);
        window.location.assign(`/dashboard/:${user._id}`)
    }

    getToken(){
        return localStorage.getItem('token');
    }

    logout(){
        localStorage.removeItem('token');
        window.location.assign('/');
    }

    loggedIn(){
        const token = this.getToken();
        return token && !this.isTokenExpired(token) 
    }

    isTokenExpired(){
        if (decode(token).exp < Date.now()/1000 ){
            localStorage.removeItem('token');
            return true;
        } else {
            return false
        }
    }
}

export default new Authenticator();