import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

import conectarBD from "./conexion.js";
import sesion from "./sesion.js";
import rutasUsuario from "./usuarios.js";
import router from "./clientes.js";



const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sesion);

app.use("/api/usuarios", rutasUsuario);
app.use("/api/clientes", router);

app.use(express.static(path.join(__dirname, "../front/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build", "index.html"));
}); 

(async () => {
  try {
    const sequelize = await conectarBD();
    await sequelize.sync({ force: false });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();




