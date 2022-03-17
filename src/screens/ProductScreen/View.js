import React, { useState, forwardRef } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  Typography,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  TextField
} from '@mui/material'
import { AppBar } from '../../components'
import { Delete, Edit } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { useLocation } from '../../Hooks'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid'
import Slide from '@mui/material/Slide'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ProductView = ({
  nombre,
  sku,
  codebar,
  descripcion,
  unidad,
  precio,
  allProduct,
  isLoading,
  allCombo,
  error,
  handleChange,
  setValues,
  saveData,
  destroy,
  destroyC
}) => {
  const [tab, setTab] = useState(true)
  const { path, setPath } = useLocation()
  const [open, setOpen] = useState(true)
  const [ids, setIds] = useState([])

  const handleClick = () => {
    setOpen(false)
    setPath('/product')
    setValues({})
    setIds([])
  }

  const handleValues = id => {
    setIds(id)
    const res = tab
      ? allProduct.filter(x => x.id === id)
      : allCombo.filter(x => x.id === id)
    if (res) {
      setValues(res[0])
      setOpen(true)
      setPath('/product/create')
    }
  }
  const save = () => {
    saveData(tab)
    setOpen(false)
    setIds([])
  }

  const columns = [
    { field: 'sku', headerName: 'Sku', width: 150 },
    { field: 'codebar', headerName: 'Codigo', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'descripcion', headerName: 'Descripción', width: 150 },
    { field: 'unidad', headerName: 'Unidades', width: 150 },
    { field: 'precio', headerName: 'Precio', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleValues(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={() => {
              tab ? destroy(id) : destroyC(id)
            }}
            color="inherit"
          />
        ]
      }
    }
  ]

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
      {path === '/product' ? (
        <>
          <AppBar action={setOpen} />
          <Box sx={{ paddingLeft: 3, paddingRight: 3, paddingTop: 3 }}>
            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                variant={tab ? 'contained' : 'outlined'}
                onClick={() => setTab(true)}
              >
                Productos
              </Button>
              <Button
                variant={tab ? 'outlined' : 'contained'}
                onClick={() => setTab(false)}
              >
                Combos
              </Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ height: '700px', width: '100%', padding: 3 }}>
            <DataGrid
              rows={tab ? allProduct : allCombo}
              columns={columns}
              loading={isLoading}
              components={{ Toolbar: GridToolbar }}
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
                  {ids.length === 1
                    ? `Actualizar ${tab ? 'Producto' : 'Combo'}`
                    : `Crear ${tab ? 'Producto' : 'Combo'}`}
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
                  {tab ? 'Detalles del Producto' : 'Detalles del Combo'}
                </Typography>
                <Box sx={{ marginTop: 2 }} />
                <TextField
                  id="codebar"
                  label="Codebar"
                  value={codebar}
                  variant="outlined"
                  onChange={handleChange('codebar')}
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />
                <TextField
                  id="sku"
                  label="Sku"
                  value={sku}
                  variant="outlined"
                  onChange={handleChange('sku')}
                  fullWidth
                />
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
                  id="descripcion"
                  label="Descripción"
                  value={descripcion}
                  variant="outlined"
                  onChange={handleChange('descripcion')}
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />

                <TextField
                  id="unidad"
                  label="Unidad"
                  value={unidad}
                  type="number"
                  onChange={handleChange('unidad')}
                  variant="outlined"
                  fullWidth
                />
                <Box sx={{ marginTop: 2 }} />

                <TextField
                  id="precio"
                  label="Precio"
                  value={precio}
                  type="number"
                  variant="outlined"
                  onChange={handleChange('precio')}
                  fullWidth
                />
              </Box>
            </Box>
          </Dialog>
        </Box>
      )}
    </Box>
  )
}

export default ProductView
