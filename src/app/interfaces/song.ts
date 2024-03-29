export interface Song {
    id: number;
    song: string;
    artist: string;
    album: string;
}

export interface FlaskSongDictJson {
    songs: Song[];
}

export interface AddSongResponseJson {
    message: string;
    id: number;
}

