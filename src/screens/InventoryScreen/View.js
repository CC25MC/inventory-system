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
  FormControlLabel
} from '@mui/material'
import { AppBar, Search } from '../../components'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid'
import { useLocation } from '../../Hooks'
import CloseIcon from '@mui/icons-material/Close'
import { Delete, Edit } from '@mui/icons-material'
import Slide from '@mui/material/Slide'
import { titles } from '../../variables'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const InventoryView = ({ allInventory = [], isLoading = false }) => {
  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'telefono', headerName: 'Telefono', width: 150 },
    { field: 'rut', headerName: 'Rut', width: 150 },
    { field: 'direccion', headerName: 'Dirección', width: 150 },
    { field: 'correo', headerName: 'Correo', width: 150 },
    { field: 'notas', headerName: 'Notas', width: 150 },
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
            onClick={() => destroy(id)}
            color="inherit"
          />
        ]
      }
    }
  ]
  const datos = { rows: allInventory, columns }
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
    </Box>
  )
}

export default InventoryView
