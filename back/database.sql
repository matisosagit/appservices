CREATE SCHEMA IF NOT EXISTS dbappservice;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(11) NOT NULL,
);


CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    telefono VARCHAR(20),
    estado VARCHAR(20),
    listo BOOLEAN,
    codigo VARCHAR(100) NOT NULL,
    fecha DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE repuestos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    nombre VARCHAR(100) NOT NULL,
    cantidad INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
