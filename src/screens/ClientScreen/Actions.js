import React, { useState, useEffect } from 'react'
import { format } from 'rut.js'
import { getClients, mutateClients, destroyClients } from '../../Hooks'
import { useSnackbar } from 'notistack'

const data = {
  nombre: '',
  direccion: '',
  correo: '',
  rut: '',
  notas: '',
  telefono: ''
}
export const Actions = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState(data)
  const { data: allClients, isLoading: getLoading } = getClients()
  const { mutate, isLoading: posLoading, error } = mutateClients()
  const { destroy, isLoading: destroyIsLoading } = destroyClients()

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error creando o editando al cliente', {
        variant: 'error'
      })
    }
  }, [error])

  const { nombre, correo, telefono, rut, direccion, notas } = values || {}

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: prop === 'rut' ? format(event.target.value) : event.target.value
    })
  }
  const saveData = () => {
    mutate(values)
  }
  return {
    values,
    nombre,
    correo,
    telefono,
    rut,
    direccion,
    notas,
    allClients,
    isLoading: getLoading || posLoading || destroyIsLoading,
    error,
    handleChange,
    setValues,
    saveData,
    destroy
  }
}
