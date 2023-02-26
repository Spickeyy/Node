SELECT m.id, m.title, l.country, i.src, m.price, m.rating, JSON_ARRAYAGG(i.src)
FROM images as i
LEFT JOIN movies as m
ON i.movieId = m.id
LEFT JOIN locations as l
ON m.locationId = l.id
GROUP BY m.id;