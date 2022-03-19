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
import { SignalCellularConnectedNoInternet0BarTwoTone } from '@mui/icons-material'

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
  const [product, setProduct] = useState([])
  const { data: allProduct, isLoading: getLoading } = getProducts()
  const { dataC: allCombo, isLoading: getLoadingCombo } = getCombo()
  const { mutate, isLoading: posLoading, error } = mutateProduct()
  const { mutateC, isLoading: posLoadingCombo, errorC } = mutateCombo()
  const { destroy, isLoading: destroyIsLoading } = destroyProduct()
  const { destroyC, isLoading: destroyIsLoadingCombo } = destroyCombo()
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
  const emptyList = () => {
    setProduct([])
    enqueueSnackbar('Se borro la lista', {
      variant: 'success'
    })
  }
  const operationQuantity = (index, props, operation) => {
    const newData = product.map((item, key) => {
      if (key === index) {
        if (operation === 'suma') {
          item[props] = item[props] + 1
        } else {
          if (item[props] !== 0) item[props] = item[props] - 1
          else setProduct([])
        }
        return item
      }
      return item
    })
    setProduct(newData)
  }
  const removeProducList = position => {
    const newData = [
      ...product.slice(0, position),
      ...product.slice(position + 1)
    ]
    setProduct(newData)
  }
  return {
    values,
    nombre,
    sku,
    codebar,
    descripcion,
    unidad,
    precio,
    allProduct,
    allCombo,
    product,
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
    setProduct,
    destroy,
    destroyC,
    removeProducList,
    emptyList,
    operationQuantity
  }
}
