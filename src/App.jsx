import { useState } from 'react'
import Products from './components/Products'
import Form from './components/Form'
import ProductContextProvider from './context/ProductContext'

function App() {
  const [viewForm, setViewForm] = useState(false)

  const handleCreate = () => {
    setViewForm(!viewForm)
  }

  return (
    <ProductContextProvider>
      {viewForm && <Form />}
      <Products />
      <button onClick={handleCreate}>Crear Product</button>
    </ProductContextProvider>
  )
}

export default App
