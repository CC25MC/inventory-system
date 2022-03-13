import React, { useState } from 'react'
import { Box } from '@mui/material'
import { AppBar } from '../../components'

const ProductView = ({}) => {
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

    </Box>
  )
}

export default ProductView
