import { useEffect, useState } from "react";
import { db } from "../firebase/setupsell";
import { collection, getDocs } from "firebase/firestore";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Menubar from "../components/Menubar/Menubar";
import Navbar from "../components/Navbar/Navbar";
import Loader from "../components/Loader/Loader";
import '../assets/styles/pages/Home.css'

const Home = () => {
  const [prod, setProd] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8); 
  const [loading, setLoading] = useState(true);
  const productsPerLoad = 4; 

  const getProducts = () => {
    const productsRef = collection(db, "products");

    getDocs(productsRef)
      .then((querySnapshot) => {
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setTimeout(() => {
          setProd(productsData);
          setLoading(false);
        }, 1000);
        
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        alert(error);
        setLoading(false); 
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  
  const currentProducts = prod.slice(0, visibleProducts);

  

  const handleShowMore = () => {
    setVisibleProducts(prevVisible => prevVisible + productsPerLoad);
  };

  return (
    <div>
      <Navbar />
      <Menubar />
      <br />
      {loading ? (
        <Loader /> 
      ) : (
        <Main products={currentProducts} />
      )}
      <br /><br />
      {prod.length > visibleProducts && !loading && (
        <button onClick={handleShowMore} className="show-more-btn">
          Show More
        </button>
      )}
      <br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br />
      <Footer />
    </div>
  );
};

export default Home;
