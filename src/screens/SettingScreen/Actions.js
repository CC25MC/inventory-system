import React, { useState, useEffect } from 'react'
import { format } from 'rut.js'
import { getLicense, mutateLicense } from '../../Hooks'
import { useSnackbar } from 'notistack'

const data = {
  licencia: ''
}
export const Actions = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState(data)
  const { data: allLicencia, isLoading: getLoading } = getLicense()
  const { mutate, isLoading: Loading, error } = mutateLicense()

  // useEffect(() => {
  //   if (allLicencia) {
  //     setValues()
  //   }
  // }, [allLicencia])

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
    mutate({ id: values?.id, licenseKey: licencia })
  }
  console.log(allLicencia)
  return {
    allLicencia,
    licencia,
    isLoading: getLoading || Loading,
    // error,
    handleChange,
    saveData
  }
}
