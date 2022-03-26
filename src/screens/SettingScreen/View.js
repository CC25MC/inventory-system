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
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Accordion
} from '@mui/material'
import { AppBar, Search } from '../../components'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid'
import { useLocation } from '../../Hooks'
import CloseIcon from '@mui/icons-material/Close'
import { Delete, Edit, ExpandMore } from '@mui/icons-material'
import Slide from '@mui/material/Slide'
import { titles } from '../../variables'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const SettingView = ({
  licencia,
  allLicencia,
  isLoading,
  handleChange,
  saveData
}) => {
  const { path, setPath } = useLocation()

  const save = () => {
    saveData()
    setOpen(false)
    setIds([])
  }

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

      <Box sx={{ padding: 20 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Licencia </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: '100%', padding: 3 }}>
              <TextField
                id="outlined-basic"
                label="Licencia"
                size="small"
                value={licencia}
                onChange={handleChange("licencia")}
                fullWidth
                variant="outlined"
              />
              <Button variant="contained" onClick={saveData} disabled={isLoading} sx={{ marginTop: 3, width: '100%' }}>
                Registrar Licencia
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Información</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
}

export default SettingView
