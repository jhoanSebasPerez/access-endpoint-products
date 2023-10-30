import { useState, useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import PropType from 'prop-types'

function Form({ nameProduct = '' }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const { addProduct, updateProduct } = useContext(ProductContext)

  useEffect(() => {
    const findProduct = async () => {
      console.log(nameProduct)
      const response = await fetch(
        `https://siaweb-nodejs.carlos-reneren7.repl.co/productos/${nameProduct}`
      )
      const product = await response.json()

      setName(product.nombre)
      setPrice(product.precio)
      setDescription(product.descripcion)
    }

    if (nameProduct !== '') {
      findProduct()
    } else {
      setName('')
      setPrice('')
      setDescription('')
    }
  }, [nameProduct])

  const handleSubmit = (event) => {
    event.preventDefault()

    const product = {
      nombre: name,
      precio: price,
      descripcion: description
    }

    if (nameProduct) {
      updateProduct(nameProduct, product)
    } else {
      addProduct(nameProduct, product)
    }

    setName('')
    setPrice('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">{nameProduct ? 'update' : 'crear'}</button>
    </form>
  )
}

Form.propTypes = {
  nameProduct: PropType.string
}

export default Form
