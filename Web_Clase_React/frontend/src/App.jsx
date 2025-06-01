import { useState, useEffect } from 'react';
import { Container, Typography, Alert, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

const App = () => {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: '', autor: '', anio: '' });
  const [error, setError] = useState(null);

  const obtenerLibros = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/libros');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error ${res.status}: ${errorData.details || res.statusText}`);
      }
      const data = await res.json();
      setLibros(data);
      setError(null);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      setLibros([]);
      setError(`No se pudieron cargar los libros: ${error.message}`);
    }
  };

  useEffect(() => {
    obtenerLibros();
  }, []);

  const handleChange = (e) => {
    setNuevoLibro({ ...nuevoLibro, [e.target.name]: e.target.value });
  };

  const agregarLibro = async () => {
    if (!nuevoLibro.titulo || !nuevoLibro.autor || !nuevoLibro.anio) {
      setError('Todos los campos (título, autor, año) son obligatorios.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/libros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...nuevoLibro, anio: parseInt(nuevoLibro.anio) }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || 'Error al agregar el libro');
      }
      setNuevoLibro({ titulo: '', autor: '', anio: '' });
      setError(null);
      obtenerLibros();
    } catch (error) {
      console.error('Error al agregar el libro:', error);
      setError(`No se pudo agregar el libro: ${error.message}`);
    }
  };

  const editarLibro = async (id, libroActualizado) => {
    if (!libroActualizado.titulo || !libroActualizado.autor || !libroActualizado.anio) {
      setError('Todos los campos (título, autor, año) son obligatorios.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/libros/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...libroActualizado, anio: parseInt(libroActualizado.anio) }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || 'Error al actualizar el libro');
      }
      setError(null);
      obtenerLibros();
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
      setError(`No se pudo actualizar el libro: ${error.message}`);
    }
  };

  const eliminarLibro = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/libros/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || 'Error al eliminar el libro');
      }
      setError(null);
      obtenerLibros();
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
      setError(`No se pudo eliminar el libro: ${error.message}`);
    }
  };

  const handleFiltro = (e) => {
    setFiltro(e.target.value);
  };

  const librosFiltrados = libros.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      libro.autor.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Mi Primera pagina 
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <BookForm libro={nuevoLibro} onChange={handleChange} onSubmit={agregarLibro} />
        <SearchBar filtro={filtro} onFiltroChange={handleFiltro} />
        <BookList libros={librosFiltrados} onDelete={eliminarLibro} onEdit={editarLibro} />
      </Container>
    </ThemeProvider>
  );
};

export default App;