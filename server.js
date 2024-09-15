const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// MongoDB connection string
const uri =
  "mongodb+srv://barnibot2:hmikOkFlCPRrNfdV@cluster0.jeiy1.mongodb.net/test"; // Database name is 'test'

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from 'public' directory

// MongoDB connection
let db;
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db("test"); // Use 'test' as the database name
    console.log("Connected to Database");
  })
  .catch((error) => console.error(error));

// Endpoint to handle song play
app.post("/play", async (req, res) => {
  const { song } = req.body;
  try {
    const result = await db
      .collection("songs")
      .updateOne({ sid: "1" }, { $set: { song: song } });

    if (result.matchedCount === 0) {
      res.json({ message: "Valami hiba történt, sajnáljuk!" });
    } else {
      res.json({ message: `Az új dal: ${song}` });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Hiba történt, sajnáljuk, próbálja újra." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
