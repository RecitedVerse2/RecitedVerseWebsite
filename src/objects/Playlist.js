import Recitation from './Recitation';

class Playlist {

    constructor(name) {
        this.recitations = [];
        this.name = name;
    }


    /** Adds a recitation to the playlist. */
    add(rec) {
        if(rec instanceof Recitation) {
            this.recitations.push(rec);
        }
    }


    /** Returns the Recitation at the beginning of the playlist. */
    first() {
        return this.recitations[0];
    }


    /** Returns the array of recitations. */
    getAll() {
        return this.recitations;
    }

    /** Returns the name of the playlist. */
    getName() {
        return this.name;
    }


    /** A for each loop on the playlist. */
    forEach(callback, completion) {
        for(var i = 0; i < this.recitations.length; i++) {
            callback( this.recitations[i] );
        }
        if(completion) { completion(); }
    }
    

    /** Returns the index of the recitation in this playlist. */
    indexOf(recitation) {
        if(recitation instanceof Recitation) {
            return this.recitations.indexOf(recitation);
        }
        return null;
    }


    /** Returns the length of the recitations. */
    length() {
        return this.recitations.length;
    }


    /** Returns the next recitation after the one passed into the function */
    next(recitation) {
        var index = this.indexOf(recitation);
        if(index + 1 < this.recitations.length) {
            return this.recitations[index + 1];
        }
        return null;
    }


    /** Returns the previous recitation after the one passed into the function */
    last(recitation) {
        var index = this.indexOf(recitation);
        if(index - 1 >= 0) {
            return this.recitations[index - 1];
        }
        return null;
    }
}

export default Playlist;