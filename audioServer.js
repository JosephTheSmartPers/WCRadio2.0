const http = require("http");
const fs = require("fs");
const path = require("path");

// Path to the audio file (MP3 or WAV)
const audioFilePath = path.join(__dirname, "audio.mp3");

const server = http.createServer((req, res) => {
  // Serve the audio file on '/audio' route
  if (req.url === "/audio") {
    fs.stat(audioFilePath, (err, stats) => {
      if (err) {
        console.error("Audio file not found:", err);
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Audio file not found");
        return;
      }

      // Send headers to indicate the type of content
      res.writeHead(200, {
        "Content-Type": "audio/mpeg",
        "Content-Length": stats.size,
      });

      // Create a readable stream and pipe it to the response
      const readStream = fs.createReadStream(audioFilePath);
      readStream.pipe(res);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

// Start the server on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/audio`);
});
