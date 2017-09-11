import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'

// Product details modal dialog
import ProductDetails from './ProductDetails'

// Client-side model
import Resource from '../models/resource'
const ProductStore = Resource('products')


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
    ProductStore.findAll() // ProductStore does the API fetching!
    .then((result) => this.setState({products: result.data, errors: null}))
    .catch((errors) => this.setState({errors: errors}))
  }

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
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>
                    {/* <Link> is a react-router component that works pretty much like <a href> */}
                    <Link to={`/products/${product.id}`}>
                      {product.name}
                    </Link>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* If the URL has an id at the end, we show the details dialog */}
          <Switch>
            <Route path="/products/:id" component={ProductDetails} />
          </Switch>

        </Col>
      </Row>
    )
  }
}

export default Products
