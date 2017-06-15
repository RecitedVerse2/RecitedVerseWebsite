class Recitation {

    constructor(id, uploaderID, uploadername, image, title, author, recited_by,published, genre, description, 
                likes, plays, favorites, text, audio, timestamp, playlist) {
        this.id = id,
        this.uploaderID = uploaderID,
        this.uploaderName = uploadername,
        this.image = image,
        this.title = title,
        this.author = author,
        this.recitedBy = recited_by,
        this.published = published,
        this.genre = genre,
        this.description = description,
        this.likes = likes,
        this.plays = plays,
        this.favorites = favorites,
        this.text = text,
        this.audio = audio
        this.timestamp = timestamp;
        this.playlist = playlist;
    };
    


    
}

export default Recitation;