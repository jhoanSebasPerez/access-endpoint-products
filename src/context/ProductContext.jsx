import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        'https://siaweb-nodejs.carlos-reneren7.repl.co/productos'
      )
      const products = await response.json()
      setProducts(products)
    }

    getProducts()
  }, [products])

  const addProduct = async (newProduct) => {
    const response = await fetch(
      'https://siaweb-nodejs.carlos-reneren7.repl.co/productos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      }
    )

    if (response.status === 200) {
      setProducts([...products, newProduct])
    }
  }

  const updateProduct = async (id, updatedProduct) => {
    const response = await fetch(
      `https://siaweb-nodejs.carlos-reneren7.repl.co/productos/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      }
    )

    if (response.status === 200) {
      const updatedProducts = products.map((product) => {
        if (product.id === id) {
          return updatedProduct
        }
        return product
      })
      setProducts(updatedProducts)
    }
  }

  const deleteProduct = async (id) => {
    const response = await fetch(
      `https://siaweb-nodejs.carlos-reneren7.repl.co/productos/${id}`,
      {
        method: 'DELETE'
      }
    )

    if (response.status == 200) {
      const updatedProducts = products.filter((product) => product.id !== id)
      setProducts(updatedProducts)
    }
  }

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  )
}

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default ProductContextProvider
