import React, { useState } from 'react'
import { Box, Divider } from '@mui/material'
import { AppBar, Search, EnhancedTable } from '../../components'
import { useClients } from '../../Hooks'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useDemoData } from '@mui/x-data-grid-generator';

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' }
]

const columns = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 }
]
const datos = {rows, columns};

const ClientView = ({}) => {
  
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
      <Search />
      <Divider />
      {/* <EnhancedTable /> */}
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
      >
        <DataGrid  {...datos} loading={loading} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  )
}

export default ClientView
