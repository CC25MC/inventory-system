import { Add } from '@mui/icons-material'
import { Box, Typography, Button, Divider } from '@mui/material'
import { useLocation } from '../../Hooks'
import { titles } from '../../variables'

export const AppBar = ({ action }) => {
  const { path, setPath } = useLocation()
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
        {path === '/' ? (
          <>
            <Button
              sx={{ marginLeft: 'auto' }}
              color="primary"
              onClick={() => {
                setPath(path + 'inventory/entry')
              }}
              variant="contained"
            >
              Entrada al inventario
            </Button>
            <Button
              sx={{ marginLeft: 3 }}
              color="primary"
              onClick={() => {
                setPath(path + 'inventory/exit')
              }}
              variant="contained"
            >
              Salida del inventario
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{ marginLeft: 'auto' }}
              color="primary"
              variant="outlined"
            >
              Importar Excel
            </Button>
            <Button
              sx={{ marginLeft: 3 }}
              onClick={() => {
                setPath(path + '/create')
                action(true)
              }}
              variant="contained"
            >
              <Add />
              Agregar
            </Button>
          </>
        )}
      </Box>
      <Divider />
    </>
  )
}
