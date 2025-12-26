import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import conectarBD from "./conexion.js";
import sesion from "./sesion.js";
import rutasUsuario from "./usuarios.js";
import router from "./clientes.js";

const app = express();
app.set("trust proxy", 1);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sesion);

app.use("/api/usuarios", rutasUsuario);
app.use("/api/clientes", router);


(async () => {
  try {
    const sequelize = await conectarBD();
    await sequelize.sync({ force: false });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Servidor escuchando en puerto ${PORT}`)
    );
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();


