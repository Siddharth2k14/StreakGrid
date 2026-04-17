// import { Route, Routes } from 'react-router-dom'
// import AuthPage from './pages/AuthPage/AuthPage'
// import LoginPage from './components/Login/page'
// import RegisterPage from './components/Register/page'

import "./App.css"
import TrackerPage from "./pages/TrackerPage/TrackerPage"

function App() {
  return (
    // <Routes>
    //   <Route path='/' element={
    //     <div>
    //       <h1>Home Page</h1>
    //     </div>
    //   } />
    //   <Route path='/auth' element={<AuthPage />}>
    //     <Route path='login' element={<LoginPage />} />
    //     <Route path='register' element={<RegisterPage />} />
    //   </Route>
    // </Routes>

    <div>
      <TrackerPage />
    </div>
  )
}

export default App