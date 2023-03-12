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
    user: {
      id: number,
      name: string,
      surname: string,
      email: string,
      mobile: string,
    },
};

export type MovieViewModel = PrivateViewMovieModel & RowDataPacket;

export type MovieData = Omit<PrivateViewMovieModel, 'id' | 'user'> & {
  userId: number,
};

export type MovieBody = Omit<MovieData, 'userId'>;

export type PartialMovieBody = Partial<MovieBody>;
