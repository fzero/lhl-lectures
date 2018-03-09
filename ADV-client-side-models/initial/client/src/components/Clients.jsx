import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'

// Client-side model
import Resource from '../models/resource'
const ClientStore = Resource('clients')

class Clients extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: [],
      errors: null
    }
  }

  componentWillMount() {
    ClientStore.findAll()
    .then((result) => this.setState({clients: result.data}))
    .catch((errors) => this.setState({errors: errors}))
  }

  render() {
    return (
      <Row>
        <Col xs={12}>

          <PageHeader>
            Clients
          </PageHeader>

          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {this.state.clients.map((client, index) => (
                <tr key={index}>
                  <td>{client.id}</td>
                  <td>{client.firstName} {client.lastName}</td>
                  <td>{client.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

export default Clients
