import React from 'react'
import './Survey.css'

// Kitten rendering sub-component (stateless)
const Kittens = ({ kittens }) => (
  kittens.map((kitten, index) => (
    <div key={index} className="kitten">
      <p>Name: {kitten.name}</p>
      <p>Adorability: {kitten.adorability}</p>
      <p>Your thoughts: {kitten.yourThoughts}</p>
    </div>
  ))
)

// Stateful Survey component
class Survey extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      adorability: 0,
      yourThoughts: '',
      kittens: []
    }
  }

  componentWillMount() {
    const options = {
      method: 'GET',
      headers: new Headers(),
      mode: 'cors',
      cache: 'default'
    }
    fetch('/kittens.json', options)
    .then((response) => response.text())
    .then((body) => JSON.parse(body))
    .then((parsed) => this.setState({kittens: parsed.kittens, errors: null}))
    .catch((errors) => this.setState({errors: errors}))
  }

  _handleInputs = (ev) => {
    const fieldName = ev.target.name
    const data = ev.target.value
    const update = {}
    update[fieldName] = data
    this.setState(update)
  }

  _handleSubmit = () => {
    const updatedKittens = this.state.kittens
    updatedKittens.push({
      name: this.state.name,
      adorability: this.state.adorability,
      yourThoughts: this.state.yourThoughts
    })
    this.setState({
      kittens: updatedKittens,
      name: '',
      adorability: 0,
      yourThoughts: ''
    })
  }

  render() {
    return (
      <section>
        <header className="add-a-kitten">
          <h3>Add a kitten:</h3>
          <p>
            Name:
            <input
              type="text"
              name="name"
              onChange={this._handleInputs}
              value={this.state.name}
            />
          </p>
          <p>
            Adorability:
            <input
              type="number"
              name="adorability"
              onChange={this._handleInputs}
              value={this.state.adorability}
            />
          </p>
          <p>
            Your thoughts:
              <input
                type="text"
                name="yourThoughts"
                size={60}
                onChange={this._handleInputs}
                value={this.state.yourThoughts}
              />
          </p>
          <p>
            <button name="submit" onClick={this._handleSubmit}>
              Add!
            </button>
          </p>
        </header>
        <Kittens kittens={this.state.kittens} />
      </section>
    )
  }
}

export default Survey
