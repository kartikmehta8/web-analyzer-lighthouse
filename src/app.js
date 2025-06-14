const express = require('express');
const path = require('path');
const analyzerRouter = require('./routes/analyzer');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/analyze', analyzerRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
