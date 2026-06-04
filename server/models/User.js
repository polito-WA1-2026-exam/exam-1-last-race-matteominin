import dayjs from 'dayjs';

class User {
    constructor(id, username, hash, salt, createdAt) {
        this.id = id;
        this.username = username;
        this.hash = hash;
        this.salt = salt;
    }
}

export default User;