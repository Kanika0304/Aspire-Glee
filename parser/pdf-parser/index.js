const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const fs = require("fs");
const { Parser } = require("json2csv");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static("public")); // Serve static files from the 'public' directory

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// File Upload Middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to check server status
app.get("/", (req, res) => {
    res.send("Server is running. Use POST /upload to upload PDF files.");
});

// Route to display the upload form
app.get("/upload", (req, res) => {
    res.sendFile(path.join(__dirname, "upload.html"));
});

// Route to handle file uploads
app.post("/upload", upload.array("files"), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded." });
        }

        const extractedData = [];

        for (let file of req.files) {
            const dataBuffer = file.buffer;
            const data = await pdfParse(dataBuffer);
            const extractedInfo = extractDataFromPDF(data.text);
            extractedData.push(extractedInfo);
        }

        // Save data to a JSON file
        fs.writeFileSync(
            "extractedData.json",
            JSON.stringify(extractedData, null, 2)
        );

        // Convert JSON to CSV
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(extractedData);
        fs.writeFileSync("extractedData.csv", csv);

        res.redirect("/data"); // Redirect to data page after upload
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Function to extract data from the PDF text
const extractDataFromPDF = (text) => {
    const studentName = text.match(/Name:\s*(.*)/i)?.[1] || "N/A";
    const gradesMatch = text.match(/Grade(?:s|total)?:?\s*([\d.]+)/i);
    const attendanceMatch = text.match(/Attendanc(?:e|etotal)?:?\s*(\d+)/i);
    const grades = gradesMatch ? parseFloat(gradesMatch[1]) : "N/A";
    const attendance = attendanceMatch
        ? parseInt(attendanceMatch[1], 10)
        : "N/A";

    return { studentName, grades, attendance };
};

// Route to get the data page
app.get("/data", (req, res) => {
    try {
        const jsonData = fs.readFileSync("extractedData.json");
        const data = JSON.parse(jsonData);
        res.send(`
      <html>
        <head>
          <title>Extracted Data</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f6f9;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .container {
              background: white;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              max-width: 900px;
              width: 100%;
            }
            h1 {
              color: #333;
              text-align: center;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #0096FF;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
            tr:hover {
              background-color: #e2e2e2;
            }
            a {
              display: inline-block;
              margin-top: 20px;
              text-decoration: none;
              color: #0096FF;
              font-weight: bold;
            }
            a:hover {
              text-decoration: underline;
            }
            .logo {
              display: block;
              margin: 0 auto 20px;
              max-width: 100px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://static.vecteezy.com/system/resources/previews/009/342/746/original/tick-and-cross-clipart-design-illustration-free-png.png" class="logo"/>
            <h1>Extracted Data</h1>
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Grades</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                ${data
                    .map(
                        (item) => `
                  <tr>
                    <td>${item.studentName}</td>
                    <td>${item.grades}</td>
                    <td>${item.attendance}</td>
                  </tr>
                `
                    )
                    .join("")}
              </tbody>
            </table>
            <a href="/data/csv">Download CSV</a>
          </div>
        </body>
      </html>
    `);
    } catch (err) {
        res.status(500).json({ error: "Error reading extracted data." });
    }
});

// Route to get the CSV file (optional)
app.get("/data/csv", (req, res) => {
    try {
        const csvData = fs.readFileSync("extractedData.csv");
        res.header("Content-Type", "text/csv");
        res.attachment("extractedData.csv");
        res.send(csvData);
    } catch (err) {
        res.status(500).json({ error: "Error reading CSV file." });
    }
});

// Route to delete extracted data (optional)
app.delete("/data", (req, res) => {
    try {
        if (fs.existsSync("extractedData.json")) {
            fs.unlinkSync("extractedData.json");
        }
        if (fs.existsSync("extractedData.csv")) {
            fs.unlinkSync("extractedData.csv");
        }
        res.json({ message: "Extracted data files deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: "Error deleting extracted data files." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
