const conexion = require('../config/database');

exports.getTrabajadores = (req, res) => {
	try {
		conexion.query(`CALL obtenerTrabajadores();`, (err, rows, fields) => {
			if (!err) {
				res.json(rows[0]);
			} else {
				res.json({ status: 'No hay trabajadores' });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};

exports.getTrabajador = (req, res) => {
	try {
		conexion.query(`CALL obtenerTrabajador(${req.params.id});`, (err, rows, fields) => {
			if (!err) {
				res.json(rows[0]);
			} else {
				res.json({ status: 'No existe el trabajador' });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};

exports.getNumeroTrabajadores = (req, res) => {
	try {
		conexion.query(`SELECT COUNT(*) as n FROM registro`, (err, rows, fields) => {
			if (!err) {
				res.json(rows[0]);
			} else {
				res.json({ status: 'Error en numero' });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};

exports.setTrabajador = async (req, res) => {
	try {
		const { nombre, apellido, email, direccion, telefono, genero, descripccion, usuario, contrasena } = req.body;

		const objTrabajador = {
			nombre,
			apellido,
			direccion,
			telefono,
			email,
			genero,
			descripccion,
			usuario,
			contrasena,
		};

		const query = `CALL agregarTrabajador('${JSON.stringify(objTrabajador)}');`;

		conexion.query(query, (err, rows, fields) => {
			if (!err) {
				res.json({ status: 'Guardado con exito' });
			} else {
				console.log(err);
				res.json({ status: 'Error al guardar trabajador' });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};
