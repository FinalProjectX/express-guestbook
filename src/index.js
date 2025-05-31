const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.info(`Server started on port ${port}`);
});
