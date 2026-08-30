import { Toaster } from "react-hot-toast"
import './App.css'
import AppRoutes from './routing/Router'

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}

export default App ;