import decode from 'jwt-decode';

class Authenticator {
    
    login({token, user}){
        localStorage.setItem('w_token', token);
        window.location.assign(`/dashboard/${user.username}`);
    }

    getToken(){
        return localStorage.getItem('w_token');
    }

    logout(){
        localStorage.removeItem('w_token');
        window.location.assign('/')
    }

    loggedIn(){
        const token= this.getToken()
        return token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);

            if (decoded.exp < Date.now()/1000) {
                localStorage.removeItem('w_token')
            }

        } catch (err) {
            console.log(err)
        }
    }
}

export default new Authenticator();