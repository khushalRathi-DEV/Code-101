const express = require('express');
const fs = require('fs');
const app = express();

// Enable JSON body parsing
app.use(express.json());

// Route: GET /
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Initialize todos array
let todos = [];

app.get("/view-todo", function(req, res) {
  fs.readFile("a.txt", "utf-8", function(err, data) {
    if (err) {
      res.json({ msg: err });
    } else {
      const content = JSON.parse(data || '[]'); // Parse data or set to empty array if no data
      res.json(content);
    }
  });
});

// Route: POST /save-data
// Save a todo to the todos array and write it to the file
app.post('/save-data', (req, res) => {
  const dataToSave = {
    "todo": req.body.todo, // Accepts todo content from request body
    "id": todos.length      // Assigns an ID based on array length
  };

  todos.push(dataToSave); // Adds the new todo to the array

  const dataString = JSON.stringify(todos, null, 2); // Converts the array to a formatted JSON string

  // Write to file asynchronously
  fs.writeFile("a.txt", dataString, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ message: 'Error saving data' });
    } else {
      console.log("Data saved successfully to a.txt");
      res.json({ message: 'Data saved successfully' });
    }
  });
});

// Route: DELETE /delete-todo (deletes all todos)
app.delete('/delete-todo', (req, res) => {
  todos.splice(0, todos.length); // Clears the todos array

  // Clears the content of the file
  fs.writeFile("a.txt", '', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('File contents deleted successfully.');
    }
  });

  res.json({ message: "All todos deleted" });
});

// Route: DELETE /delete-todo/id (delete specific todo by ID)
app.delete('/delete-todo/id', (req, res) => {
  const id = parseInt(req.body.id); // Get the ID from query parameters
  console.log(`Deleting todo with ID: ${id}`);

  if (id >= 0 && id < todos.length) {
    todos.splice(id, 1); // Removes the todo at the given index
    console.log('Remaining todos:', todos);

    const dataString = JSON.stringify(todos, null, 2); // Updates the file after deletion

    fs.writeFile("a.txt", dataString, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.status(500).json({ message: 'Error saving data' });
      } else {
        console.log('Data saved successfully to a.txt');
        res.json({ message: 'Todo deleted and data saved successfully' });
      }
    });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
