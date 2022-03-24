import React, { useState, forwardRef, useEffect } from 'react'
import { getInventory } from '../../Hooks'
import lodash from 'lodash'

export const Actions = () => {
  const { data, isLoading } = getInventory()
  const [allInventory, setAllInventory] = useState([])
  const [graficasentry, setGraficasentry] = useState([])
  const [graficasexit, setGraficasExit] = useState([])
  const [entry, setEntry] = useState([])
  const [exit, setExit] = useState([])
  const InventarioChange = () => {
    var newValue = data.map(item => {
      const arrayEntrada = item.entradasStock
        .split(',')
        .map(item => parseInt(item || 0, 10))
      const arrayValor = item.entradasValor
        .split(',')
        .map(item => parseInt(item || 0, 10))
      const arraySalida = item.salidasStock
        .split(',')
        .map(item => parseInt(item || 0, 10))
      const arraySalidaV = item.salidasValor
        .split(',')
        .map(item => parseInt(item || 0, 10))
      item['EntradasStock'] = lodash.sum(arrayEntrada)
      item['EntradasValor'] = lodash.sum(arrayValor)
      item['SalidasStock'] = lodash.sum(arraySalida)
      item['SalidasValor'] = lodash.sum(arraySalidaV)
      item['detailEntradasStock'] = arrayEntrada
      item['detailEntradasValor'] = arrayValor
      item['detailSalidasStock'] = arraySalida
      item['detailSalidasValor'] = arraySalidaV
      return item
    })
    setAllInventory(newValue)
  }
  const graficChange = id => {
    var newValue = data.filter(item => item.id === id)
    const graf = [
      {
        label: 'Entrada Stock',
        data: newValue[0].entradasStock.split(',').map((value, id) => {
          const stars = parseInt(value || 0, 10)
          const date = id + 1
          return { stars, date }
        })
      },
      {
        label: 'Entradas Valor',
        data: newValue[0].entradasValor.split(',').map((value, id) => {
          const stars = parseInt(value || 0, 10)
          const date = id + 1
          return { stars, date }
        })
      },
    ]
    const graf2 = [
      {
        label: 'Salida Stock',
        data: newValue[0].salidasStock.split(',').map(value => {
          const stars = parseInt(value || 0, 10)
          const date = 'Salida Stock'
          return { stars, date }
        })
      },
      {
        label: 'Salida Valor',
        data: newValue[0].salidasValor.split(',').map(value => {
          const stars = parseInt(value || 0, 10)
          const date = 'Salida Valor'
          return { stars, date }
        })
      }
    ]
    setGraficasentry(graf)
    setGraficasExit(graf2)
  }
  const entryChange = id => {
    var newValue = data.filter(item => item.id === id)
    if (newValue) {
      const entrada = newValue[0].entradasStock.split(',').map((value, ids) => {
        const id = ids
        const entradasStock = parseInt(value || 0, 10)
        const nombre = newValue[0].Producto.nombre
        const entradasValor = parseInt(
          newValue[0].entradasValor.split(',')[ids] || 0,
          10
        )
        const fecha = newValue[0].updatedAt
        // const stock = newValue[0].stock
        return { id, entradasStock, nombre, entradasValor, fecha }
      })
      setEntry(entrada)

      const salida = newValue[0].salidasStock.split(',').map((value, ids) => {
        const id = ids
        const salidasStock = parseInt(value || 0, 10)
        const nombre = newValue[0].Producto.nombre
        const salidasValor = parseInt(
          newValue[0].salidasValor.split(',')[ids] || 0,
          10
        )
        const fecha = newValue[0].updatedAt
        // const stock = newValue[0].stock
        return { id, salidasStock, nombre, salidasValor, fecha }
      })
      setExit(salida)
    }
  }
  useEffect(() => {
    InventarioChange()
  }, [data])
  // console.log(allInventory)
  return {
    allInventory,
    isLoading,
    graficChange,
    entry,
    exit,
    entryChange,
    graficasentry,
    graficasexit
  }
}
