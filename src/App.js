import React from 'react'
import { AppRouter } from './routers/AppRouter'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
// import { Link as ReactLink } from "react-router-dom";
import { QueryClientProvider, QueryClient } from 'react-query'
// import Notify from './notify'
import { Sidebar } from './components'

const queryClient = new QueryClient()

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
  // typography: {
  //   fontFamily: [
  //     '-apple-system',
  //     'BlinkMacSystemFont',
  //     '"Segoe UI"',
  //     'Roboto',
  //     '"Helvetica Neue"',
  //     'Arial',
  //     'sans-serif',
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //     '"Segoe UI Symbol"'
  //   ].join(',')
  // },
  // components: {
  //   MuiLink: {
  //     defaultProps: {
  //       component: LinkBehavior,
  //     },
  //   },
  //   MuiButtonBase: {
  //     defaultProps: {
  //       LinkComponent: LinkBehavior,
  //     },
  //   },
  // },
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
        <SnackbarProvider>
          <Sidebar>
            <AppRouter />
            {/* <Notify /> */}
          </Sidebar>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
