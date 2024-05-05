import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Logique de connexion
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).send("Une erreur est survenue lors de la connexion.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
