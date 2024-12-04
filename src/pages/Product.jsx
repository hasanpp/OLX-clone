
import Navbar from '../components/Navbar/Navbar'
import Menubar from '../components/Menubar/Menubar'
import Footer from '../components/Footer/Footer'
import '../assets/styles/pages/Product.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {db} from '../firebase/setupsell';
import { doc, getDoc } from "firebase/firestore";
import Loader from '../components/Loader/Loader'

const Product = () => {

  const [prod, setProd] = useState({});
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  console.log(id);  // Add this line to check the id value

  const navigate = useNavigate();
  

  const getProduct = async () => {
    try {
      const productRef = doc(db, "products", id);
      const docSnapshot = await getDoc(productRef);
      if (docSnapshot.exists()) {
        setProd(docSnapshot.data());
      } else {
        alert("No such document!");
      }
    } catch (error) {
      console.error("Error fetching product from Firestore:", error);
      alert("Error fetching product.");
    } finally {
      setLoading(false);
    }
  };
  


  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Navbar />
      <Menubar />
      <br /><br /><br />
      <div onClick={()=>{navigate(-1)}}className='backbutton'>
            <span>&#8592;</span>
          </div>
      {loading ? (
        <Loader /> 
      ) : (
        <>
          <div className="prod-details">
            <div className="left-dt">
              
              <img src={prod.image} alt="" />
            </div>
            <div className="right-dt">
              <h1 className='price'>₹ {prod.price}</h1>
              <h1 className='tat'>{prod.title}</h1>
              <h1 className='cat'>{prod.category}</h1>
              <h1 className='cat'>{prod.brand}</h1>
              <br />
              <p className='dis'>{prod.description}</p>
              <br />
              <span>{prod.year} model</span><br />
              <span>At {prod.location}</span><br />
            </div>
          </div>
        </>
      )}
      
      <br /><br /><br /><br /><br />
      <Footer />
    </div>
  )
}

export default Product
