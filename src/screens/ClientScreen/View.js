import React, { useState } from 'react'
import { Box, Divider } from '@mui/material'
import { AppBar, Search, EnhancedTable } from '../../components'
import { useClients } from '../../Hooks'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const ClientView = ({}) => {
  const { data } = useClients()
  const columns = [
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'lastname', headerName: 'Apellido', width: 150 },
    { field: 'phone', headerName: 'Telefono', width: 150 },
    { field: 'rut', headerName: 'Rut', width: 150 },
    { field: 'address', headerName: 'Dirección', width: 150 },
    { field: 'email', headerName: 'Correo', width: 150 },
  ]
  const datos = { rows: data, columns }

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
      {/* <Search /> */}
      {/* <Divider /> */}
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid {...datos} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  )
}

export default ClientView
