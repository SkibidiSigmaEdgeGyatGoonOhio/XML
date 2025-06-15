const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;
// Enable CORS
app.use(cors());
// Serve static files from the public directory
app.use(express.static('public'));
// Route to serve the books XML
app.get('/api/books', (req, res) => {
const filePath = path.join(__dirname, 'public', 'books.xml');
fs.readFile(filePath, 'utf8', (err, data) => {
if (err) {
console.error('Error reading XML file:', err);
return res.status(500).send('Error reading book data');}
res.set('Content-Type', 'application/xml');
res.send(data);
});
});
// Route to serve filtered books based on query parameters
app.get('/api/books/filter', (req, res) => {
const { genre, yearMin, yearMax } = req.query;
const filePath = path.join(__dirname, 'public', 'books.xml');
fs.readFile(filePath, 'utf8', (err, data) => {
if (err) {
console.error('Error reading XML file:', err);
return res.status(500).send('Error reading book data');
}
// Parse the XML
const parser = new (require('xmldom')).DOMParser();
const xmlDoc = parser.parseFromString(data, 'text/xml');
// Create a new XML document for the filtered results
const serializer = new (require('xmldom')).XMLSerializer();
const resultDoc = parser.parseFromString('<library></library>',
'text/xml');
const resultRoot = resultDoc.documentElement;
// Get all books
const books = xmlDoc.getElementsByTagName('book');
for (let i = 0; i < books.length; i++) {
const book = books[i];
const bookGenre = book.getElementsByTagName('genre')[0].textContent;
const bookYear = parseInt(book.getElementsByTagName('publishedyear')[0].textContent);
// Apply filters
const genreMatch = !genre || bookGenre === genre;
const yearMinMatch = !yearMin || bookYear >= parseInt(yearMin);
const yearMaxMatch = !yearMax || bookYear <= parseInt(yearMax);
if (genreMatch && yearMinMatch && yearMaxMatch) {
// Clone the book node for the result
const importedNode = resultDoc.importNode(book, true);
resultRoot.appendChild(importedNode);
}}
// Send the filtered XML
res.set('Content-Type', 'application/xml');
res.send(serializer.serializeToString(resultDoc));
});
});
// Start the server
app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});