import { useMutation, useQuery, useQueryClient } from 'react-query'
import request from '../../api'
import { useSnackbar } from 'notistack'
import { useLocation } from '../useLocation'

export const getProducts = () => {
  const { isLoading, data, error } = useQuery('/api/producto', () =>
    request.product.get()
  )
  return {
    isLoading,
    data: data?.data || [],
    error
  }
}

export const mutateProduct = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload =>
      payload?.id ? request.product.put(payload) : request.product.post(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Producto ${data?.message}`, {
            variant: 'success'
          })
          setPath('/product')
        }
      }
    }
  )
  return {
    isLoading,
    error,
    mutate
  }
}

export const importProduct = () => {
  const { enqueueSnackbar } = useSnackbar()
  // const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload => request.product.excel(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Productos ${data?.message}`, {
            variant: 'success'
          })
          // setPath('/client')
        }
      }
    }
  )
  return {
    isLoading,
    error,
    mutate
  }
}

export const destroyProduct = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    mutate: destroy,
    isLoading,
    error
  } = useMutation(payload => request.product.deleteP(payload), {
    onSuccess: data => {
      if (data?.data) {
        enqueueSnackbar(`Producto ${data?.message}`, {
          variant: 'success'
        })
      }
    }
  })

  return {
    isLoading,
    error,
    destroy
  }
}
