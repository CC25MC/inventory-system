import React, { useState, useEffect } from 'react'
import {
  getProducts,
  mutateProduct,
  destroyProduct,
  getCombo,
  mutateCombo,
  destroyCombo
} from '../../Hooks'
import { useSnackbar } from 'notistack'

const data = {
  nombre: '',
  sku: '',
  codebar: '',
  descripcion: '',
  unidad: 0,
  precio: 0
}
export const Actions = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState(data)
  const { data: allProduct, isLoading: getLoading } = getProducts()
  const { dataC: allCombo, isLoading: getLoadingCombo } = getCombo()
  const { mutate, isLoading: posLoading, error } = mutateProduct()
  const { mutateC, isLoading: posLoadingCombo, errorC } = mutateCombo()
  const { destroy, isLoading: destroyIsLoading } = destroyProduct()
  const { destroyC, isLoading: destroyIsLoadingCombo } = destroyCombo()
  console.log(allProduct)
  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error creando o editando el producto', {
        variant: 'error'
      })
    }
  }, [error])

  useEffect(() => {
    if (errorC) {
      enqueueSnackbar('Error creando o editando el Combo', {
        variant: 'error'
      })
    }
  }, [errorC])

  const { nombre, sku, codebar, descripcion, unidad, precio } = values || {}

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value
    })
  }
  const saveData = opcion => {
    opcion ? mutate(values) : mutateC(values)
  }

  return {
    nombre,
    sku,
    codebar,
    descripcion,
    unidad,
    precio,
    allProduct,
    allCombo,
    isLoading:
      getLoading ||
      posLoading ||
      destroyIsLoading ||
      getLoadingCombo ||
      posLoadingCombo ||
      destroyIsLoadingCombo,
    error,
    handleChange,
    setValues,
    saveData,
    destroy,
    destroyC
  }
}
