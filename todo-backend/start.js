const app = require('./server')

const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});