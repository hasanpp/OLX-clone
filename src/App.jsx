
import Home from './pages/Home.jsx'
import Product from './pages/Product.jsx'
import CreatePost from './pages/ProductUpload.jsx'
import { Routes,Route } from 'react-router-dom'

 
const App = () => {
  return (
    <>
      {/* <Home/> */}
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/sell' element={<CreatePost/>}/>
      </Routes>
    </>
  )
}

export default App
