import session from 'express-session';

const sesion = session({
    secret: 'tu_secreto_aqui',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,  // Cambiar a true si usas HTTPS
        httpOnly: true, // Protege la cookie de acceso desde el frontend
        maxAge: 24 * 60 * 60 * 1000  // 1 día
    }
});

export default sesion;

