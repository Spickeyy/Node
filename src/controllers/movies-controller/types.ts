import { RowDataPacket } from 'mysql2';

type PrivateMovieModel = {
    id: number,
    title: string,
    location: {
      country: string
    },
    images: string[],
    price: number,
    rating: number
};

export type MovieModel = PrivateMovieModel & RowDataPacket;

export type MovieData = Omit<PrivateMovieModel, 'id'>;

export type PartialMovieData = Partial<MovieData>;
