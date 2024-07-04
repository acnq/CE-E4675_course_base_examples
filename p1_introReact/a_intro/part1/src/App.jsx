const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello world, {props.name}, 
        you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => { 
  console.log('Hello from component')
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(now, a + b);
  const name = 'Peter'
  const age = 10
  const friends = [
    { name: 'Peter', age: 4},
    { name: 'Maya', age: 10},
  ]
  const array = ['Peter', 'Maya']
  
  return (
    <>
      <h1>Greetings</h1>
      <Hello/>
      <Hello name='Maya' age={26 + 10}/>
      <Hello name={name} age={age}/>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
      <p>{array}</p>
    </>
  )
}
export default App
