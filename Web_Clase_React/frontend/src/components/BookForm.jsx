import { TextField, Button, Box, Fade } from '@mui/material';

const BookForm = ({ libro, onChange, onSubmit }) => (
  <Fade in={true} timeout={500}>
    <Box
      component="form"
      sx={{
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        background: 'white',
        borderRadius: 2,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <TextField
        label="Título"
        name="titulo"
        value={libro.titulo}
        onChange={onChange}
        fullWidth
        error={!libro.titulo}
        helperText={!libro.titulo ? 'El título es obligatorio' : ''}
        variant="outlined"
      />
      <TextField
        label="Autor"
        name="autor"
        value={libro.autor}
        onChange={onChange}
        fullWidth
        error={!libro.autor}
        helperText={!libro.autor ? 'El autor es obligatorio' : ''}
        variant="outlined"
      />
      <TextField
        label="Año"
        name="anio"
        value={libro.anio}
        onChange={onChange}
        fullWidth
        type="number"
        error={!libro.anio || isNaN(parseInt(libro.anio))}
        helperText={!libro.anio || isNaN(parseInt(libro.anio)) ? 'El año debe ser un número' : ''}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSubmit}
        sx={{ mt: 2, py: 1.5 }}
      >
        {libro.Id ? 'Guardar Cambios' : 'Agregar Libro'}
      </Button>
    </Box>
  </Fade>
);

export default BookForm;