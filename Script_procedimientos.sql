DELIMITER $$
CREATE PROCEDURE agregarTrabajador(IN _data JSON)
BEGIN
	DECLARE _id BIGINT (20);
    DECLARE _genero  JSON;
	SET _genero = _data->>'$.genero';
    
	INSERT INTO registro (
					nombre, 
					apellido, 
                    email, 
                    direccion, 
                    telefono, 
                    genero
	)
    VALUES (_data->>'$.nombre', 
			_data->>'$.apellido', 
            _data->>'$.email', 
            _data->>'$.direccion', 
            _data->>'$.telefono', 
            _genero->>'$.code'
	);
    SET _id = LAST_INSERT_ID();
    
    INSERT INTO usuario (usuario, contrasena, registro_id)
    VALUES (_data->>'$.usuario', _data->>'$.contrasena', _id);
    SET _id = LAST_INSERT_ID();
    
    INSERT INTO trabajo (descripccion, usuario_id)
    VALUES (_data->>'$.descripccion', _id);
END$$

CREATE PROCEDURE obtenerTrabajador(in _id INT)
BEGIN
	SELECT R.id, R.nombre, R.apellido, R.direccion, R.telefono, R.email, R.genero, U.usuario, U.contrasena, T.descripccion
		FROM registro R
		INNER JOIN usuario U on U.id = R.id
		INNER JOIN trabajo T on T.id = U.id
		WHERE R.id = _id;
END$$

CREATE PROCEDURE obtenerTrabajadores()
BEGIN
	SELECT R.id, R.nombre, R.apellido, R.direccion, R.telefono, R.email, R.genero, U.usuario, U.contrasena, T.descripccion
		FROM registro R
		INNER JOIN usuario U on U.id = R.id
		INNER JOIN trabajo T on T.id = U.id;
END$$