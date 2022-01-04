import Navigation from './pages/partilas/Navigation'
import HomePage from './pages/HomePage'
import { Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <>
      <Navigation />
      <Container>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          {/* <Route exact path="/sign up">
            <SignupPage />
          </Route> */}
        </Switch>
      </Container>
    </>
  )
}

export default App
