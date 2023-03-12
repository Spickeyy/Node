import { RowDataPacket } from 'mysql2';

type PrivateViewMovieModel = {
    id: number,
    title: string,
    location: {
      country: string
    },
    images: string[],
    price: number,
    rating: number,
    userId: number,
};

export type MovieViewModel = PrivateViewMovieModel & RowDataPacket;

export type MovieData = Omit<PrivateViewMovieModel, 'id'>;

export type MovieBody = Omit<MovieData, 'userId'>;

export type PartialMovieBody = Partial<MovieBody>;
