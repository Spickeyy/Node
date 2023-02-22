type MovieModel = {
    id: string,
    title: string,
    location: {
      country: string
    },
    images: string[],
    price: number,
    rating: number
  };

export default MovieModel;
