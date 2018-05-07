class User {

    constructor(id, photoURL, fullname) {
        this.id = id;
        this.photoURL = photoURL;
        this.fullname = fullname;
      };


    setPlaylist(pl) {
        this.playlist = pl;
    }

}

export default User;
