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
}

export default Playlist;