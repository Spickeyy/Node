import { RowDataPacket } from 'mysql2';

export interface MovieModel extends RowDataPacket {
    id: number,
    title: string,
    location: {
      country: string
    },
    images: string[],
    price: number,
    rating: number
  }

export type MovieData = Omit<MovieModel, 'id'>;

export type PartialMovieData = Partial<MovieData>;
