import User  from './User';

class Userlist {

    constructor(name) {
        this.Users = [];
        this.name = name;
    }


    /** Adds a User to the playlist. */
    add(rec) {
        if(rec instanceof User) {
            this.Users.push(rec);
        }
    }


    /** Returns the User at the beginning of the playlist. */
    first() {
        return this.Users[0];
    }


    /** Returns the array of Users. */
    getAll() {
        return this.Users;
    }

    /** Returns the name of the playlist. */
    getName() {
        return this.name;
    }


    /** A for each loop on the playlist. */
    forEach(callback, completion) {
        for(var i = 0; i < this.Users.length; i++) {
            callback( this.Users[i] );
        }
        if(completion) { completion(); }
    }


    /** Returns the index of the User in this playlist. */
    indexOf(User) {
        if(User instanceof User) {
            return this.Users.indexOf(User);
        }
        return null;
    }


    /** Returns the length of the Users. */
    length() {
        return this.Users.length;
    }


    /** Returns the next User after the one passed into the function */
    next(User) {
        var index = this.indexOf(User);
        if(index + 1 < this.Users.length) {
            return this.Users[index + 1];
        }
        return null;
    }


    /** Returns the previous User after the one passed into the function */
    last(User) {
        var index = this.indexOf(User);
        if(index - 1 >= 0) {
            return this.Users[index - 1];
        }
        return null;
    }


    remove(id) {
        var temp = [];
        while(this.Users.length > 0) {
            var a = this.Users.pop();

            if(a.id === id) {
                continue;
            } else {
                temp.push(a);
            }
        }
        temp.forEach( (e) => {
            this.Users.push(e);
        })
        // this.Users = this.Users.filter( (e) => {
        //     return e.id !== id
        // });
        console.log(this.Users);
    }
}

export default Userlist;
