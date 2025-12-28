import session from 'express-session';

const sesion = session({
  name: "sid",
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: ".tuserviceonline.uy",
    maxAge: 24 * 60 * 60 * 1000
  }

});

export default sesion;


