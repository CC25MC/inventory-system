import { useMutation, useQuery, useQueryClient } from 'react-query'
import request from '../../api'
import { useSnackbar } from 'notistack'
import { useLocation } from '../useLocation'

export const getSupplier = () => {
  const { isLoading, data, error } = useQuery('/api/proveedor', () =>
    request.supplier.get()
  )
  return {
    isLoading,
    data: data?.data || [],
    error
  }
}

export const mutateSupplier = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload =>
      payload?.id ? request.supplier.put(payload) : request.supplier.post(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Proveedor ${data?.message}`, {
            variant: 'success'
          })
          setPath('/supplier')
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
export const importSupplier = () => {
  const { enqueueSnackbar } = useSnackbar()
  // const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload => request.supplier.excel(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Proveedor ${data?.message}`, {
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

export const destroySupplier = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    mutate: destroy,
    isLoading,
    error
  } = useMutation(payload => request.supplier.deleteS(payload), {
    onSuccess: data => {
      if (data?.data) {
        enqueueSnackbar(`Proveedor ${data?.message}`, {
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
