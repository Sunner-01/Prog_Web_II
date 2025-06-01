import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fade,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import BookForm from './BookForm';

const BookList = ({ libros, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [libroEditar, setLibroEditar] = useState({ titulo: '', autor: '', anio: '' });

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedId);
    setOpen(false);
  };

  const handleEditOpen = (libro) => {
    setSelectedId(libro.Id);
    setLibroEditar({ titulo: libro.titulo, autor: libro.autor, anio: libro.anio });
    setEditOpen(true);
  };

  const handleEditSubmit = () => {
    onEdit(selectedId, { ...libroEditar, anio: parseInt(libroEditar.anio) });
    setEditOpen(false);
    setLibroEditar({ titulo: '', autor: '', anio: '' });
  };

  return (
    <>
      <Grid container spacing={2}>
        {libros.map((libro) => (
          <Grid item xs={12} sm={6} key={libro.Id}>
            <Fade in={true} timeout={500}>
              <Card
                sx={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#333' }}>
                    {libro.titulo}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Autor: {libro.autor}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Año: {libro.anio}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditOpen(libro)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleClickOpen(libro.Id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>¿Estás seguro de que quieres eliminar este libro?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Libro</DialogTitle>
        <DialogContent>
          <BookForm
            libro={libroEditar}
            onChange={(e) =>
              setLibroEditar({ ...libroEditar, [e.target.name]: e.target.value })
            }
            onSubmit={handleEditSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookList;