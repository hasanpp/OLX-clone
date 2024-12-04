/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios, { formToJSON } from 'axios';
import { db } from '../firebase/setupsell';
import { collection,addDoc } from "firebase/firestore";
import "../assets/styles/pages/ProductUpload.css"; 
import { data, useNavigate } from "react-router-dom";

const ProductUpload = () => {

  const navigate = useNavigate();
  const [userFunction,setUserFunction] =useState(localStorage.getItem("isUserLogedIn")||"Login");


  const sell = () =>{
    if (userFunction == 'Login'){
      console.log(userFunction);
      
      alert('Please log in first before sell !!!')
      navigate(-1)
    } else{
      navigate('/sell')
    }
  }



  const [formData, setFormData] = useState({
    image: null,
    title: "",
    category: "",
    price: "",
    description: "",
    year: "",
    brand: "",
    location: "",
  });

  const [uploading, setUploading] = useState(false);

  const categories = [
    "Car",
    "Motorcycles",
    "Mobile Phones",
    "For Sale: Houses & Apartments",
    "Scooters",
    "Commercial & Other Vehicles",
    "For Rent: Houses & Apartments",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const uploadToCloudinary = async (file) =>{
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset","olx_upload_preset");
    formData.append("folder", "olx-clone");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dh901hnb9/image/upload",
      formData
    );
    return response.data.secure_url;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUploading(true);

    try{
      const imageUrl = await uploadToCloudinary(formData.image);
      const productData = {
        title: formData.title,
        category: formData.category,
        price : formData.price,
        description: formData.description,
        year: formData.year,
        brand: formData.brand,
        location: formData.location,
        image: imageUrl,
        createdAt: new Date(),
      };

      await addDoc(collection(db,"products"),productData);

      alert("Product uploaded successfully!");

      setFormData({
        image: null,
        title: "",
        category: "",
        price: "",
        description: "",
        year: "",
        brand: "",
        location: "",
      });

      navigate(-1)
      
    }catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    sell();
  },[]);

  return (
    <>
      <div onClick={()=>{navigate(-2)}}className='backbutton'>
        <span>&#8592;</span>
      </div>
      <div className="product-upload-container">
        
        <form className="product-upload-form" onSubmit={handleSubmit}>
          <h2>Upload Product</h2>


          <label htmlFor="image">Product Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} required />


          <label htmlFor="title">Product Title</label>
          <input type="text" id="title" name="title" placeholder="Enter product title" value={formData.title} onChange={handleChange} required />


          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} required >
            <option value="" disabled> Select a category </option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>


          <label htmlFor="price">Price (₹)</label>
          <input type="number" id="price" name="price" placeholder="Enter price" value={formData.price} onChange={handleChange} required />


          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="Enter product description" rows="4" value={formData.description} onChange={handleChange} required ></textarea>


          <label htmlFor="year">Year of Purchase</label>
          <input type="number" id="year" name="year" placeholder="Enter year of purchase" value={formData.year} onChange={handleChange} required />


          <label htmlFor="brand">Brand</label>
          <input type="text" id="brand" name="brand" placeholder="Enter product brand" value={formData.brand} onChange={handleChange} required />


          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" placeholder="Enter your location" value={formData.location} onChange={handleChange} required />


          <button type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductUpload;
