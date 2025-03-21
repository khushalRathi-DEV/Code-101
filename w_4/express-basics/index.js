const express = require('express');
const app = express();

function sumtill(n) {
  return (n * (n + 1)) / 2;
}

// Route handlers
app.get('/', function(req, res) {
  const n = parseInt(req.query.n); // Convert query parameter to a number  -->   ?n=30
  if (isNaN(n)) {
    return res.send('Please provide a valid number');
  }
  const ans = sumtill(n);
  res.send(`Sum till ${n} is: ` + ans);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
