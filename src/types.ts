export type ID = {
    date: string;
    timestamp: number
}

export type Review = {
    body: string;
    id: ID;
}

export type Movie = {
    backdrops: [string];
    genres: [string];
    id: ID;
    imdbId: string;
    poster: string;
    releaseDate: string;
    reviewIds: [Review];
    title: string;
    trailerLink: string;
}