import session from "express-session";

app.set("trust proxy", 1); // necesario en Render

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,         // HTTPS obligatorio
    httpOnly: true,
    sameSite: "none",     // clave: cross-domain
    maxAge: 24 * 60 * 60 * 1000 // 1 día
  }
}));


