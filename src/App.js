import Navigation from './pages/partilas/Navigation'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import UploadImage from './components/UploadImage'
import MyImagesPage from './pages/MyImagesPage'
import RequireAuth from './components/RequireAuth'


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
                <UploadImage />
              </RequireAuth>
            }
          />
		  {/* <Route
            path="/albums"
            element={
              <RequireAuth redirectTo="/login">
                <AlbumsPage />
              </RequireAuth>
            }
          /> */}
        </Routes>
      </Container>
    </>
  )
}

export default App
