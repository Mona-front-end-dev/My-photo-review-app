import Navigation from './pages/partilas/Navigation'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import RequireAuth from './components/RequireAuth'
import AlbumPage from './pages/AlbumPage'
import ReviewPage from './pages/ReviewPage'
import ConfirmationPage from './pages/ConfirmationPage'


function App() {
  return (
    <>
      <Navigation />
      <Container className="py-3">
        <Routes>
          {/*Guest Routes*/}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/review/:albumId" element={<ReviewPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />

          {/*Protected Routes*/}

		  <Route
            path="/"
            element={
              <RequireAuth redirectTo="/login">
                <HomePage />
              </RequireAuth>
            }
          />

		  <Route
            path="/album/:albumId"
            element={
              <RequireAuth redirectTo="/login">
                <AlbumPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
    </>
  )
}

export default App
