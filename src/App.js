import Navigation from './pages/partilas/Navigation'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import UploadPage from './pages/UploadPage'
import UploadPageDropzone from './pages/UploadPageDropzone'
import MyImagesPage from './pages/MyImagesPage'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <>
      <Navigation />
      <Container className="py-3">
        <Routes>
          {/*Guest Routes*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />

          {/*Protected Routes*/}
          <Route
            path="/my-images"
            element={
              <RequireAuth redirectTo="/login">
                <MyImagesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/upload"
            element={
              <RequireAuth redirectTo="/login">
                <UploadPageDropzone />
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
    </>
  )
}

export default App
