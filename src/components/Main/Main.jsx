/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import './Main.css';

const Main = (props) => {  

  const navigate = useNavigate();

  const showProd = (id)=>{
    navigate(`/product/${id}`)
  }


  return (
    <div className='main-prods'>
      {props?.products?.map((data, index) => (
        
        <div key={index} onClick={() => showProd(data.id)} >
          <div className='prod-cards'>
            <img className='' src={data.image} alt={data.title} />
            <h1 className='price'>₹{data?.price}</h1>
            <h1>{data?.title}</h1>
            <h1>{data?.category}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
