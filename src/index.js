const express = require('express');
const cors = require('cors');
const { use } = require('express/lib/application');

// Creamos el Servidor
const app = express();

app.use(cors());
app.use(express.json());

app.use(require('./routes/trabajador.routes'));

app.listen(8000, () => {
	console.log('Server corriendo en el puerto 8000');
});
