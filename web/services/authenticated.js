import jwt from 'jsonwebtoken';

export const authenticated = (fn) => async (req, res) => {
  try {
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          res.statusCode = 401;
          res.json({ error: 'você não está autenticado' });
          return;
        }
        return await fn(req, res);
      }
    );
  } catch (err) {
    res.statusCode = 401;
    res.json({ error: err });
    return;
  }
};
