import { useContext, useState } from 'react'
import { ProductContext } from '../context/ProductContext'
import Form from './Form'

const Products = () => {
  const { products, deleteProduct } = useContext(ProductContext)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [nameProduct, setnameProduct] = useState('')

  const handleUpdate = (nameProduct) => {
    setShowUpdateForm(true)
    setnameProduct(nameProduct)
  }

  const handleDelete = (nameProduct) => {
    if (confirm(`Estás seguro de eliminar el producto ${nameProduct}`)) {
      deleteProduct(nameProduct)
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.nombre}</td>
              <td>{product.precio}</td>
              <td>{product.descripcion}</td>
              <div>
                <button onClick={() => handleUpdate(product.nombre)}>
                  Update
                </button>
                <button onClick={() => handleDelete(product.nombre)}>
                  Delete
                </button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateForm && <Form nameProduct={nameProduct} />}
    </>
  )
}

export default Products
