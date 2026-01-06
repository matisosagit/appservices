import express from "express";

import sequelize from "./conexion.js";
import sesion from "./sesion.js";
import rutasUsuario from "./rutas/usuarios.js";
import router from "./rutas/clientes.js";

import cors from "cors";

const app = express();
app.set("trust proxy", 1);
app.use(cors({
  origin: process.env.FRONT_URL,  
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sesion);

app.use("/api/usuarios", rutasUsuario);
app.use("/api/clientes", router);


(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Servidor escuchando en puerto ${PORT}`)
    );
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();


