import React, { useState, useEffect } from 'react'
import { format } from 'rut.js'
import { getClients } from '../../Hooks'
import { useSnackbar } from 'notistack'

const data = {
  licencia: ''
}
export const Actions = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState(data)
  const { data: allLicencia, isLoading: getLoading, error } = getClients()

  useEffect(() => {
     if (error) {
       enqueueSnackbar('Error creando o editando la licencia', {
         variant: 'error'
       })
     }
  }, [error])

  const { licencia } = values || {}

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value
    })
  }
  const saveData = () => {
    console.log(values)
  }
  return {
    allLicencia,
    licencia,
    isLoading: getLoading,
    // error,
    handleChange,
    saveData
  }
}
