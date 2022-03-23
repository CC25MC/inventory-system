import { useMutation, useQuery, useQueryClient } from 'react-query'
import request from '../../api'
import { useSnackbar } from 'notistack'
import { useLocation } from '../useLocation'

export const mutateEntry = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { setPath } = useLocation()
  const { mutate, isLoading, error } = useMutation(
    payload =>
      payload?.id ? request.entry.put(payload) : request.entry.post(payload),
    {
      onSuccess: data => {
        if (data?.data) {
          enqueueSnackbar(`Entrada ${data?.message}`, {
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

export const mutateExit = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { setPath } = useLocation()
    const { mutate, isLoading, error } = useMutation(
      payload =>
        payload?.id ? request.exit.put(payload) : request.exit.post(payload),
      {
        onSuccess: data => {
          if (data?.data) {
            enqueueSnackbar(`Salida ${data?.message}`, {
              variant: 'success'
            })
            setPath('/')
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