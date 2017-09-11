import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'

import api from '../models/api'
import Dialog from './Dialog'

class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      selectedProduct: {},
      showDetails: false,
      errors: null
    }
  }

  componentWillMount() {
    api.get('/products')
    .then((result) => this.setState({products: result.data.data}))
    .catch((errors) => this.setState({errors: errors}))
  }

  _selectProduct = (product) => {
    this.setState({selectedProduct: product, showDetails: true})
  }

  _hideDetails = () => this.setState({showDetails: false})

  render() {
    return (
      <Row>
        <Col xs={12}>

          <PageHeader>
            Products
          </PageHeader>

          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {this.state.products.map((product, index) => (
                <tr key={index} onClick={() => this._selectProduct(product)}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Dialog
            show={this.state.showDetails}
            onHide={this._hideDetails}
            title={this.state.selectedProduct.name}
          >
            <p>
              You selected <strong>{this.state.selectedProduct.name}</strong>.
            </p>
            <p>
              It costs <strong>${this.state.selectedProduct.price}</strong> and there are <strong>{this.state.selectedProduct.quantity}</strong> units in stock.
            </p>
          </Dialog>

        </Col>
      </Row>
    )
  }
}

export default Products
