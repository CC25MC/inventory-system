import React, { useState } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  TextField,
  Divider
} from '@mui/material'
import { AppBar } from '../../components'
import { SearchOutlined } from '@mui/icons-material'

const currencies = [
  {
    value: 'USD',
    label: ''
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
]

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

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          padding: 3
        }}
      >
        <FormControl>
          <InputLabel htmlFor="search">Buscar</InputLabel>
          <OutlinedInput
            id="search"
            startAdornment={
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            }
            label="Buscar"
          />
        </FormControl>
        <TextField
          id="outlined-select-currency"
          select
          label="Filtros"
          sx={{
            marginLeft: 'auto',
            width: '150px'
          }}
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Divider />
    </Box>
  )
}

export default ClientView
