SELECT m.id, m.title, l.country, i.src, m.price, m.rating, JSON_ARRAYAGG(i.src), 
JSON_OBJECT(
	'name', u.name,
	'surname', u.surname,
    'email', u.email,
    'mobile', u.mobile
) as user
FROM images as i
LEFT JOIN movies as m
ON i.movieId = m.id
LEFT JOIN locations as l
ON m.locationId = l.id
LEFT JOIN users as u
ON u.id = m.userId
GROUP BY m.id;