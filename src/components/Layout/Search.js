import { SearchOutlined } from '@mui/icons-material'
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  TextField
} from '@mui/material'

const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
]
export const Search = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        padding: 3
      }}
    >
      <FormControl size="small">
        <InputLabel htmlFor="search">Buscar</InputLabel>
        <OutlinedInput
          id="search"
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
          label="Buscar"
        />
      </FormControl>
      <TextField
        id="outlined-select-currency"
        select
        size="small"
        label="Filtros"
        sx={{
          marginLeft: 'auto',
          width: '150px'
        }}
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}
