import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Routes } from './Routes/Routes'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import { Toaster } from 'react-hot-toast'
import SocketContext from './Context/SocketContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SocketContext>
        <RouterProvider router={Routes} />
        <Toaster
          position="top-center"
        />
      </SocketContext>
    </Provider>
  </StrictMode>,
)
