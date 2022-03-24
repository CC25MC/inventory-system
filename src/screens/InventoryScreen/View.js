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
  TextField,
  Switch,
  Stack,
  FormControlLabel
} from '@mui/material'
import { AppBar, Search } from '../../components'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid'
import { useLocation } from '../../Hooks'
import CloseIcon from '@mui/icons-material/Close'
import { Delete, Edit, ViewAgenda } from '@mui/icons-material'
import Slide from '@mui/material/Slide'
import { titles } from '../../variables'
import { Chart } from 'react-charts'
import { ResizableBox } from 'react-resizable'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const InventoryView = ({
  allInventory,
  isLoading,
  graficChange,
  entry,
  exit,
  graficasentry,
  graficasexit,
  entryChange
}) => {
  const [open, setOpen] = useState(false)
  console.log(allInventory)
  const primaryAxis = React.useMemo(
    () => ({
      getValue: datum => datum.date,
      elementType: 'line'
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: datum => datum.stars,
        elementType: 'line'
      }
    ],
    []
  )
  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Historial',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<ViewAgenda />}
            label="Edit"
            onClick={() => {
              setOpen(true)
              graficChange(id)
              entryChange(id)
            }}
            className="textPrimary"
            color="inherit"
          />
        ]
      }
    },
    {
      field: 'nombre',
      headerName: 'Producto',
      width: 150,
      valueGetter: ({ row }) => row.Producto.nombre
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 150,
      type: 'number',
      valueGetter: ({ row }) => row.stock
    },
    {
      field: 'entradasStock',
      headerName: 'Entradas Stock',
      width: 150,
      type: 'number',
      valueGetter: ({ row }) => row.EntradasStock
    },
    {
      field: 'entradasValor',
      headerName: 'Entradas Valor',
      width: 150,
      type: 'number',
      valueGetter: ({ row }) => row.EntradasValor
    },
    {
      field: 'salidasStock',
      headerName: 'Salidas Stock',
      width: 150,
      type: 'number',
      valueGetter: ({ row }) => row.SalidasStock
    },
    {
      field: 'salidasValor',
      headerName: 'Salidas Valor',
      width: 150,
      type: 'number',
      valueGetter: ({ row }) => row.SalidasValor
    },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'createdAt', headerName: 'Fecha', width: 150 }
  ]
  const columnsentry = [
    {
      field: 'nombre',
      headerName: 'Producto',
      width: 150
    },
    {
      field: 'entradasStock',
      headerName: 'Entradas Stock',
      width: 150
    },
    {
      field: 'entradasValor',
      headerName: 'Entradas Valor',
      width: 150
    },
    { field: 'fecha', headerName: 'Fecha', width: 150 }
  ]
  const columnsexit = [
    {
      field: 'nombre',
      headerName: 'Producto',
      width: 150
    },
    {
      field: 'salidasStock',
      headerName: 'Salidas Stock',
      width: 150
    },
    {
      field: 'salidasValor',
      headerName: 'Salidas Valor',
      width: 150
    },
    { field: 'fecha', headerName: 'Fecha', width: 150 }
  ]
  const datos = { rows: allInventory, columns }
  const datosentry = { rows: entry, columns: columnsentry }
  const datosexit = { rows: exit, columns: columnsexit }
  console.log(graficasentry)
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
      <AppBar />
      <Box sx={{ height: '700px', width: '100%', padding: 3 }}>
        <DataGrid
          {...datos}
          loading={isLoading}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <MuiAppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Historial
            </Typography>
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
              Entrada / Salida :
            </Typography>
            <Box sx={{ marginTop: 2 }} />

            <Box>
              <Stack direction="row" sx={{ height: '300px' }} spacing={2}>
                <DataGrid
                  {...datosentry}
                  loading={isLoading}
                  components={{ Toolbar: GridToolbar }}
                />
                <DataGrid
                  {...datosexit}
                  loading={isLoading}
                  components={{ Toolbar: GridToolbar }}
                />
              </Stack>
            </Box>
            <Box sx={{ marginTop: 2 }} />
            <Typography variant="h6" component="div">
              Graficas Entrada / Salida :
            </Typography>
            <Box sx={{ marginTop: 2 }} />

            <Stack direction="row" sx={{ height: '300px' }} spacing={2}>
              <ResizableBox width={600} height={300} style={{}}>
                <Chart
                  options={{
                    data: graficasentry,
                    primaryAxis,
                    secondaryAxes
                  }}
                />
              </ResizableBox>
              <ResizableBox width={600} height={300} style={{}}>
                <Chart
                  options={{
                    data: graficasexit,
                    primaryAxis,
                    secondaryAxes
                  }}
                />
              </ResizableBox>
            </Stack>
          </Box>
        </Box>
      </Dialog>
    </Box>
  )
}

export default InventoryView
