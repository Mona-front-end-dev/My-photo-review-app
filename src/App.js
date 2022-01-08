import Navigation from './pages/partilas/Navigation'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import CreateAllbumsPage from './pages/CreateAllbumsPage'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <>
      <Navigation />
      <Container className="py-3">
        <Routes>
          <Route
			exact
			path="/"
            element={
              <RequireAuth redirectTo='/login'>
                <HomePage />
              </RequireAuth>
            }
          />
		  <Route
			path="/createAlbums"
            element={
              <RequireAuth redirectTo='/login'>
                <CreateAllbumsPage />
              </RequireAuth>
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
