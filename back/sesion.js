import session from 'express-session';

const sesion = session({
  secret: process.env.SESSION_SECRET || 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
  }
});

export default sesion;


