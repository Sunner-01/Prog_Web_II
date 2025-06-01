const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const config = {
  user: 'library_user',
  password: 'Library123!',
  server: 'localhost',
  database: 'BibliotecaDB',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  port: 1433,
};

let pool;
const conectarBD = async () => {
  try {
    pool = await sql.connect(config);
    console.log('Conectado a la base de datos');
    pool.on('error', async (err) => {
      console.error('Error en la conexión a la base de datos:', {
        message: err.message,
        code: err.code,
        number: err.number,
      });
      await reconnect();
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', {
      message: error.message,
      code: error.code,
      number: error.number,
    });
    await reconnect();
  }
};

const reconnect = async () => {
  console.log('Intentando reconectar a la base de datos...');
  setTimeout(async () => {
    try {
      pool = await sql.connect(config);
      console.log('Reconexión exitosa');
    } catch (error) {
      console.error('Error al reconectar:', {
        message: error.message,
        code: error.code,
        number: error.number,
      });
      await reconnect();
    }
  }, 5000);
};

app.get('/api/libros', async (req, res) => {
  if (!pool) {
    console.error('No hay conexión a la base de datos');
    return res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
  }
  try {
 
    console.log('Verificando existencia de la tabla Libros');
    const tableCheck = await pool.request().query(`
      SELECT 1
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME = 'Libros' AND TABLE_SCHEMA = 'dbo'
    `);
    if (tableCheck.recordset.length === 0) {
      throw new Error('La tabla Libros no existe en el esquema dbo');
    }

    console.log('Ejecutando consulta: SELECT * FROM Libros');
    const result = await pool.request().query('SELECT * FROM Libros');
    console.log('Resultado de la consulta:', result.recordset);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener los libros:', {
      message: error.message,
      code: error.code,
      number: error.number,
      stack: error.stack,
    });
    res.status(500).json({ error: 'No se pudieron obtener los libros', details: error.message });
  }
});

app.post('/api/libros', async (req, res) => {
  if (!pool) {
    console.error('No hay conexión a la base de datos');
    return res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
  }
  const { titulo, autor, anio } = req.body;
  if (!titulo || !autor || !anio || isNaN(parseInt(anio))) {
    return res.status(400).json({ error: 'Faltan campos obligatorios o el año no es válido' });
  }
  try {
    console.log('Insertando libro:', { titulo, autor, anio });
    await pool
      .request()
      .input('titulo', sql.NVarChar, titulo)
      .input('autor', sql.NVarChar, autor)
      .input('anio', sql.Int, parseInt(anio))
      .query('INSERT INTO Libros (Titulo, Autor, Anio) VALUES (@titulo, @autor, @anio)');
    res.json({ message: 'Libro agregado con éxito' });
  } catch (error) {
    console.error('No se pudo agregar el libro:', {
      message: error.message,
      code: error.code,
      number: error.number,
      stack: error.stack,
    });
    res.status(500).json({ error: 'No se pudo agregar el libro', details: error.message });
  }
});

app.put('/api/libros/:id', async (req, res) => {
  if (!pool) {
    console.error('No hay conexión a la base de datos');
    return res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
  }
  const { id } = req.params;
  const { titulo, autor, anio } = req.body;
  if (!titulo || !autor || !anio || isNaN(parseInt(anio))) {
    return res.status(400).json({ error: 'Faltan campos obligatorios o el año no es válido' });
  }
  try {
    console.log('Actualizando libro:', { id, titulo, autor, anio });
    await pool
      .request()
      .input('id', sql.Int, id)
      .input('titulo', sql.NVarChar, titulo)
      .input('autor', sql.NVarChar, autor)
      .input('anio', sql.Int, parseInt(anio))
      .query('UPDATE Libros SET Titulo = @titulo, Autor = @autor, Anio = @anio WHERE Id = @id');
    res.json({ message: 'Libro actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar el libro:', {
      message: error.message,
      code: error.code,
      number: error.number,
      stack: error.stack,
    });
    res.status(500).json({ error: 'No se pudo actualizar el libro', details: error.message });
  }
});

app.delete('/api/libros/:id', async (req, res) => {
  if (!pool) {
    console.error('No hay conexión a la base de datos');
    return res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
  }
  const { id } = req.params;
  try {
    console.log('Eliminando libro con ID:', id);
    await pool.request().input('id', sql.Int, id).query('DELETE FROM Libros WHERE Id = @id');
    res.json({ message: 'Libro eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el libro:', {
      message: error.message,
      code: error.code,
      number: error.number,
      stack: error.stack,
    });
    res.status(500).json({ error: 'No se pudo eliminar el libro', details: error.message });
  }
});

const PORT = 5000;
const startServer = async () => {
  try {
    await conectarBD();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', {
      message: error.message,
      code: error.code,
      number: error.number,
      stack: error.stack,
    });
  }
};

startServer();