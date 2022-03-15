import { Add } from '@mui/icons-material'
import { Box, Typography, Button, Divider } from '@mui/material'
import { useLocation } from '../../Hooks'
import { titles } from '../../variables';


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
        <Button sx={{ marginLeft: 'auto' }} color="primary" variant="outlined">
          Exportar a Excel
        </Button>
        <Button
          sx={{ marginLeft: '10px' }}
          onClick={() => {
            setPath(path + '/create');
            action(true);
          }}
          variant="contained"
        >
          <Add />
          Agregar
        </Button>
      </Box>
      <Divider />
    </>
  )
}
