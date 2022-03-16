import React, { useState, forwardRef } from 'react'
import {
  Box,
  Divider,
  Button,
  Dialog,
  Typography,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  TextField
} from '@mui/material'
import { AppBar } from '../../components'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useLocation } from '../../Hooks'
import CloseIcon from '@mui/icons-material/Close'
import { Delete, Edit } from '@mui/icons-material'
import Slide from '@mui/material/Slide'
import { titles } from '../../variables'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ClientView = ({
  nombre,
  correo,
  telefono,
  rut,
  direccion,
  notas,
  allClients,
  isLoading,
  error,
  handleChange,
  setValues,
  saveData,
  destroy
}) => {
  const { path, setPath } = useLocation()
  const [open, setOpen] = useState(true)
  const [ids, setIds] = useState([])

  const handleClick = () => {
    setOpen(!open)
    setPath('/client')
    setValues({})
    setIds([])
  }

  const handleValues = id => {
    setIds(id)
    const res = allClients.filter(x => x.id === id[0])
    if (res) {
      setValues(res[0])
    }
  }
  const save = () => {
    saveData()
    setOpen(false)
    setIds([])
  }

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'telefono', headerName: 'Telefono', width: 150 },
    { field: 'rut', headerName: 'Rut', width: 150 },
    { field: 'direccion', headerName: 'Dirección', width: 150 },
    { field: 'correo', headerName: 'Correo', width: 150 },
    { field: 'notas', headerName: 'Notas', width: 150 }
  ]
  const datos = { rows: allClients, columns }
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      }}
    >
      {path === '/client' ? (
        <>
          <AppBar action={setOpen} />
          <Box sx={{ display: 'flex', paddingTop: 3, paddingRight: 3 }}>
            <Box />
            <Button
              variant={'contained'}
              disabled={ids.length === 0 ? true : false}
              startIcon={<Delete />}
              sx={{ marginLeft: 'auto' }}
              onClick={() => {
                ids.map(id => destroy(id))
              }}
            >
              Eliminar
            </Button>
            <Button
              variant={'contained'}
              sx={{ marginLeft: 1 }}
              startIcon={<Edit />}
              disabled={ids.length === 1 ? false : true}
              onClick={() => {
                setOpen(true)
                setPath('/client/create')
              }}
            >
              Editar
            </Button>
          </Box>

          <Box sx={{ height: '700px', width: '100%', padding: 3 }}>
            <DataGrid
              {...datos}
              loading={isLoading}
              checkboxSelection
              components={{ Toolbar: GridToolbar }}
              onSelectionModelChange={id => {
                handleValues(id)
              }}
              selectionModel={ids}
            />
          </Box>
        </>
      ) : (
        <Box>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClick}
            TransitionComponent={Transition}
          >
            <MuiAppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClick}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  {ids.length === 1 ? 'Actualizar Clientes' : 'Crear Clientes'}
                </Typography>
                <Button disabled={isLoading} color="inherit" onClick={save}>
                  {ids.length === 1 ? 'Actualizar' : 'Crear'}
                </Button>
              </Toolbar>
            </MuiAppBar>
            <Box
              component="main"
              sx={{
                p: 3,
                width: '100%',
                height: '100%',
                backgroundColor: '#EDEFF3'
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: 3,
                  width: '100%',
                  height: '100%',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h6" component="div">
                  Datos del cliente:
                </Typography>
                <Box sx={{ marginTop: 2 }} />
                <TextField
                  id="nombre"
                  label="Nombre"
                  variant="outlined"
                  value={nombre}
                  onChange={handleChange('nombre')}
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />
                <TextField
                  id="correo"
                  label="correo"
                  value={correo}
                  variant="outlined"
                  onChange={handleChange('correo')}
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />

                <TextField
                  id="rut"
                  label="Rut"
                  value={rut}
                  onChange={handleChange('rut')}
                  variant="outlined"
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />

                <TextField
                  id="telefono"
                  label="Télefono"
                  value={telefono}
                  variant="outlined"
                  onChange={handleChange('telefono')}
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />

                <TextField
                  id="direccion"
                  label="Dirección"
                  value={direccion}
                  onChange={handleChange('direccion')}
                  fullWidth
                  variant="outlined"
                />
                <Box sx={{ marginTop: 2 }} />

                <TextField
                  id="notas"
                  label="Notas"
                  value={notas}
                  onChange={handleChange('notas')}
                  fullWidth
                  variant="outlined"
                />
              </Box>
            </Box>
          </Dialog>
        </Box>
      )}
    </Box>
  )
}

export default ClientView
