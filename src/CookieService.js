import Cookie from 'universal-cookie';

const cookie = new Cookie();

class CookieService {
    get(key) {
        return cookie.get(key);
    }

    set(key, value, options) {
        cookie.set(key, value, options);
    }

    getRole() {
        if (this.get('access_token')) {
            let token = this.get('access_token');
            let roleCode = token.substr(token.length - 1);
            if (roleCode === '0') return 'admin';
            if (roleCode === '2') return 'tourguide';
        }

        return 'user';
    }

    remove(key) {
        cookie.remove(key);
    }
}

export default new CookieService();