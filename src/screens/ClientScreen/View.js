import React, { useState } from 'react'
import { Box, Divider } from '@mui/material'
import { AppBar, Search, EnhancedTable } from '../../components'
import { useClients } from '../../Hooks'

const ClientView = ({}) => {
  const { data } = useClients()
  console.log(data)
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
      <EnhancedTable />
    </Box>
  )
}

export default ClientView
