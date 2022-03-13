import { Add } from '@mui/icons-material'
import { Box, Typography, Button, Divider } from '@mui/material'
import { useLocation } from '../../Hooks'

const titles = {
  '/': 'Inventario',
  '/client': 'Clientes',
  '/product': 'Productos',
  '/supplier': 'Proveedor'
}

export const AppBar = () => {
  const { path } = useLocation()
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          padding: 3
        }}
      >
        <Typography
          variant="h5"
          color="primary"
          fontWeight={'bold'}
          gutterBottom
          component="div"
        >
          {titles[path]}
        </Typography>
        <Button sx={{ marginLeft: 'auto' }} color="primary" variant="outlined">
          Exportar a Excel
        </Button>
        <Button sx={{ marginLeft: '10px' }} variant="contained">
          <Add />
          Agregar
        </Button>
      </Box>
      <Divider />
    </>
  )
}
