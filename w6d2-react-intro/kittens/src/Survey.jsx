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


// Stateful form component
class SurveyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      adorability: 0,
      yourThoughts: ''
    }
  }

  // Every time a field is updated, we set the state.
  // This is mentioned in the React docs as "controlled components".
  // The alternative to this would be reading the form input values
  // directly on submit.
  _handleInputs = (ev) => {
    const fieldName = ev.target.name
    const data = ev.target.value
    const update = {}
    update[fieldName] = data
    this.setState(update)
  }

  _handleSubmit = () => {
    const {
      name, adorability, yourThoughts
    } = this.state

    // Calling the onSubmit function passed via props to update <App> state
    this.props.onSubmit({ name, adorability, yourThoughts })

    this.setState({
      name: '',
      adorability: 0,
      yourThoughts: ''
    })
  }

  render() {
    const { name, adorability, yourThoughts } = this.state
    return (
      <header className="add-a-kitten">
        <h3>Add a kitten:</h3>
        <p>
          Name:
          <input
            type="text"
            name="name"
            onChange={this._handleInputs}
            value={name}
          />
        </p>
        <p>
          Adorability:
          <input
            type="number"
            name="adorability"
            onChange={this._handleInputs}
            value={adorability}
          />
        </p>
        <p>
          Your thoughts:
            <input
              type="text"
              name="yourThoughts"
              size={60}
              onChange={this._handleInputs}
              value={yourThoughts}
            />
        </p>
        <p>
          <button name="submit" onClick={this._handleSubmit}>
            Add!
          </button>
        </p>
      </header>
    )
  }
}


// Stateful Survey component
class Survey extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kittens: []
    }
  }

  componentWillReceiveProps() {
    console.log("Inside componentWillReceiveProps")
    return true
  }

  componentDidMount() {
    console.log("Inside componentDidMount")
  }

  componentWillMount() {
    console.log("Inside componentWillMount")
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

  // This function is passed via props to SurveyForm so we can update our state.
  // It expects an object with name, adorability and yourThoughts.
  _handleSubmit = (newKitten) => {
    const updatedKittens = this.state.kittens
    updatedKittens.push(newKitten)
    this.setState({ kittens: updatedKittens })
  }

  render() {
    console.log("Inside render")
    const { kittens } = this.state

    // A little loading prompt shown when we're waiting for data!
    if (kittens.length === 0) {
      return (
        <section>
          <h3>Loading...</h3>
        </section>
      )
    }

    return (
      <section>
        <SurveyForm onSubmit={this._handleSubmit} />
        <Kittens kittens={kittens} />
      </section>
    )
  }
}

export default Survey
