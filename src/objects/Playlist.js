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


    /** Returns the name of the playlist. */
    getName() {
        return this.name;
    }


    /** A for each loop on the playlist. */
    forEach(callback) {
        for(var i = 0; i < this.recitations.length; i++) {
            callback( this.recitations[i] );
        }
    }
    
}

export default Playlist;