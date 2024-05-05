import express from "express";
import cors from "cors";
import path from "path";
import ip from "ip";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Importez les modules ES ici
import roots from "./roots/start.mjs";

// Créez une instance de l'application Express
const app = express();
const port = 3000;

// Obtenez l'adresse IP de l'hôte
const ipAddr = ip.address();

// Utilisez CORS pour autoriser les requêtes de différents domaines
app.use(cors());

// Utilisez bodyParser pour analyser les demandes POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/house", (req, res) => {
  prisma.house
    .findUnique({
      where: {
        id: 1,
      },
    })
    .then((e) => {
      res.json({ house: e.house });
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/house", (req, res) => {
  console.log("ok");
  prisma.house
    .update({
      where: {
        id: 1,
      },
      data: req.body,
    })
    .then((e) => {
      res.json({ house: e.house });
    })
    .catch((error) => {
      res.json(error);
    });
});

// Définit le dossier "front" comme un répertoire de fichiers statiques
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, "front")));

// Utilisez les routes définies dans le module roots
app.use("/", roots);

// Démarrez le serveur
app.listen(port, () => {
  console.log("Server run https://" + ipAddr + ":" + port);
});
