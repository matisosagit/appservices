import session from 'express-session';

const sesion = session({
  secret: process.env.SESSION_SECRET || 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,         // HTTPS obligatorio
    httpOnly: true,
    sameSite: "none",     // cross-domain
    maxAge: 24 * 60 * 60 * 1000 // 1 día
  }
});

export default sesion;


