const express = require('express');
const client = require('./dbpg.js');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
client.connect();
//# sourceMappingURL=app.js.map