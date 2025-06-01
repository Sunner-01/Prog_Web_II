import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ filtro, onFiltroChange }) => (
  <TextField
    label="Buscar por título o autor"
    value={filtro}
    onChange={onFiltroChange}
    fullWidth
    sx={{
      mb: 2,
      '& .MuiOutlinedInput-root': {
        borderRadius: 8,
        background: 'white',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      },
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
);

export default SearchBar;