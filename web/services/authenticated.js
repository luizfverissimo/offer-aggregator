import jwt from 'jsonwebtoken';

export const authenticated = (fn) => async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    if (decoded) {
      return await fn(req, res);
    }

    res.statusCode = 401;
    res.json({ error: 'você não está autenticado' });
    return;
  } catch (err) {
    res.statusCode = 401;
    res.json({ error: err });
    return;
  }
};