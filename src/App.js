import React, { Suspense, lazy } from 'react'
import { AppRouter } from './routers/AppRouter'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
// import { Link as ReactLink } from "react-router-dom";
import { QueryClientProvider, QueryClient } from 'react-query'
const Notify = lazy(() => import('./notify'))
import { Sidebar } from './components'
import { Box, CircularProgress } from '@mui/material'

const queryClient = new QueryClient()

const Loading = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  )
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#131B4F',
      main: '#131B4F',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200
    }
  }
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <SnackbarProvider>
            <Sidebar>
              <AppRouter />
              <Notify />
            </Sidebar>
          </SnackbarProvider>
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
