const express = require("express");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./models");
const insertTestData = require("./seeding/seed");
const fleurRoutes = require("./routes/fleur-route");
const bouquetRoutes = require("./routes/bouquet-route");
const userRoutes = require("./routes/user-route");
const authRoutes = require("./routes/auth-route");
const app = express();
require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

//connect to db
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");

    insertTestData().then(() => {
      console.log("Test data inserted.");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
// Get all flowers from  db
app.use(fleurRoutes);
app.use(bouquetRoutes);
app.use(userRoutes);
app.use(authRoutes);

const port = 3001;
app.use(express.static("public"));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

sequelize
  .sync()
  .then(() => {
    console.log("Les modèles ont été synchronisés avec la base de données.");
  })
  .catch((err) => {
    console.error("Erreur de synchronisation:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// const express = require("express");
// const path = require("path");
// const cors = require("cors");
// const { sequelize } = require("./models");
// const insertTestData = require("./seeding/seed");
// const fleurRoutes = require("./routes/fleur-route");
// const bouquetRoutes = require("./routes/bouquet-route");
// const userRoutes = require("./routes/user-route");
// const authRoutes = require("./routes/auth-route");
// const app = express();
// require("dotenv").config();

// // Configurer les options CORS
// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };
// app.use(cors(corsOptions));
// app.use(express.json());

// // Connexion à la base de données
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connected successfully!");
//     insertTestData().then(() => {
//       console.log("Test data inserted.");
//     });
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database:", error);
//   });

// // Routes API
// app.use(fleurRoutes);
// app.use(bouquetRoutes);
// app.use(userRoutes);
// app.use(authRoutes);

// // Servir les fichiers statiques React
// const buildPath = path.join(__dirname, "../frontend/build");
// app.use(express.static(buildPath));

// // Rediriger toutes les autres routes vers React
// app.get("*", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

// // Synchronisation avec la base de données
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Les modèles ont été synchronisés avec la base de données.");
//   })
//   .catch((err) => {
//     console.error("Erreur de synchronisation:", err);
//   });

// // Démarrage du serveur
// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
