import './index.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import {Provider} from 'react-redux'
import store from './store/index.ts'
import { Toaster } from 'react-hot-toast'

const App = lazy(()=> import("./App.tsx"))
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <BrowserRouter>
    <Provider store={store}>
      <Suspense>
        <App />
        <Toaster 
          toastOptions={{
            position:"top-right",
            className:"noOutline"
          }}
        />
      </Suspense>
    </Provider>
    </BrowserRouter>
)
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <BrowserRouter>
//   <Provider store={store}>
//     <Suspense>
//       <App />
//     </Suspense>
//   </Provider>
//   </BrowserRouter>,
// )
