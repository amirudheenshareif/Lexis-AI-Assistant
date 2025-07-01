import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { Lexis } from './components/custom/Lexis'

 const router = createBrowserRouter([{
      element: <App/>,
      path: '/'
      },{
        element:<Lexis/>,
        path:'/lexis'
      }
  ])


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router ={router}/>
  </StrictMode>,
)
