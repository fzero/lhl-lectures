import React from 'react'
import {Redirect} from 'react-router-dom'
import Dialog from './Dialog'

// Client-side model
import Resource from '../models/resource'
const ProductStore = Resource('products')


class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: (this.props.match.params.id || null),
      product: {},
      show: false,
      redirect: ''
    }
  }

  componentWillMount() {
    if (!this.state.productId) return
    ProductStore.find(this.state.productId)
    .then((result) => this.setState({
      product: result.data,
      errors: null,
      show: true,
      redirect: ''
    }))
    .catch((errors) => this.setState({errors: errors}))
  }

  _hide = () => {
    this.setState({show: false, redirect: '/products'})
  }

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />

    return (
      <div>
        {this.state.productId &&
          <Dialog
            show={this.state.show}
            onHide={this._hide}
            title={this.state.product.name}>
            <p>
              You selected <strong>{this.state.product.name}</strong>.
            </p>
            <p>
              It costs <strong>${this.state.product.price}</strong> and there are <strong>{this.state.product.quantity}</strong> units in stock.
            </p>
          </Dialog>
        }
      </div>
    )
  }
}

export default ProductDetails
