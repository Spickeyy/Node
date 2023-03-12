const SELECT = `
  SELECT 
    m.id, 
    m.title, 
    JSON_OBJECT('country', l.country) as location,
    m.price, 
    m.rating, 
    IF(COUNT(i.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(i.src)) as images,
    JSON_OBJECT(
      'name', u.name,
      'surname', u.surname,
      'email', u.email,
      'mobile', u.mobile
    ) as user
  FROM movies as m
  LEFT JOIN images as i
  ON i.movieId = m.id
  LEFT JOIN locations as l
  ON m.locationId = l.id
  LEFT JOIN users as u
  ON u.id = m.userId
  `;
  const GROUP = 'GROUP BY m.id;';

const SQL = {
  SELECT,
  GROUP,
} as const;

export default SQL;
