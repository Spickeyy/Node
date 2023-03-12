const SELECT = `
    SELECT id, name, surname, email, password, role, mobile
    FROM users
`;

const GROUP = 'GROUP BY m.id;';

const SQL = {
  SELECT,
  GROUP,
} as const;

export default SQL;
