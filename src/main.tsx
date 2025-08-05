import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './core/theme/ThemeContext.tsx'

import Routers from './core/router/router.tsx'
import store  from './core/store/store.tsx';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <BrowserRouter>
          <Provider store={store} >
            <Routers />
          </Provider>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>,
)
