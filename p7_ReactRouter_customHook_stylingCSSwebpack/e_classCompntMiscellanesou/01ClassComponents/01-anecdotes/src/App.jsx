import React from 'react'
import axios from 'axios'
import { useState } from 'react'

class App extends React.Component {
  // constructor(props) {
  //   super(props)

  //   this.state ={
  //     anecdotes: [],
  //     current: 0
  //   }

  //   this.componentDidMount = () => {
  //     axios.get('http://localhost:3001/anecdotes').then(response => {
  //       this.setState({ anecdotes: response.data})
  //     })
  //   }

  //   this.handleClick = () => {
  //     const current = Math.floor(
  //       Math.random() * this.state.anecdotes.length
  //     )
  //     this.setState({ current })
  //   }
  // }

  // render() {
  //   if (this.state.anecdotes.length === 0) {
  //     return <div>no anecdotes...</div>
  //   }

  //   return (
  //     <div>
  //       <h1>anecdote of the day</h1>
  //       <div>
  //         {this.state.anecdotes[this.state.current].content}
  //       </div>
  //       <button onClick={this.handleClick}>next</button>
  //     </div>
  //   )
  // }
  const [x, setX] = useState(1)
  console.log(x)
  return (
    <div>
      {x}
      <button onClick={()=>setX(10)}>
        press
      </button>
    </div>
  )
}

export default App

// export function App(props) {

//   )
// }
