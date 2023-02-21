type MovieModel = {
    id: string,
    title: string,
    location: {
      country: string
    },
    images: string[],
    price: string,
    rating: number
  };

export default MovieModel;
