const SELECT = `
  SELECT 
    m.id, 
    m.title, 
    JSON_OBJECT('country', l.country) as location,
    m.price, 
    m.rating, 
    IF(COUNT(i.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(i.src)) as images
  FROM movies as m
  LEFT JOIN images as i
  ON i.movieId = m.id
  LEFT JOIN  locations as l
  ON m.locationId = l.id`;
  const GROUP = 'GROUP BY m.id;';

const SQL = {
  SELECT,
  GROUP,
} as const;

export default SQL;
