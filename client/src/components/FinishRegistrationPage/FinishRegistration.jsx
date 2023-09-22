import React, { useState } from 'react';
import axios from 'axios';
import "./FinishRegistration.css"
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

function FinishRegistration() {
  const [isClient, setIsClient] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    email: '',
    state: '',
    city: '',
    language: '',
    terms_conditions: false,
    companyName: '',
    companyRegistrationNumber: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  //.......profile upload
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
     console.log(formData.get('image'));
    try {
      await axios.post(`${import.meta.env.VITE_NODE_API}profileUpload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset form fields after successful upload
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error(error);
    }
  };
  
  //................
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.language.trim()) {
      newErrors.language = 'Communication Language is required';
    }

    if (isCompany && !formData.companyName.trim()) {
      newErrors.companyName = 'Company Name is required';
    }

    if (isCompany && !formData.companyRegistrationNumber.trim()) {
      newErrors.companyRegistrationNumber = 'Company Registration Number is required';
    }

    if (!formData.terms_conditions) {
      newErrors.terms_conditions = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


const handleSubmit = async (event) => {
  event.preventDefault();

  if (validateForm()) {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', image);

      // Add other form data fields to the FormData object
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
        // Set the userType based on the selected radio button
        formDataToSend.append('userType', isClient ? 'client' : isCompany ? 'company' : 'creator');


      // Complete user registration including profile image upload
      const response = await axios.post(`${import.meta.env.VITE_NODE_API}completeRegistration`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      toast.success('Registration completed successfully');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
    }
  }
};

  return (
    <div className="sign_up">
            {/* <form encType="multipart/form-data"
        style={{ position: 'relative', top: '20px', left: '300px' }}>
           {previewImage && (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src={previewImage} alt="Profile Preview" style={{ width: '150px', height: '150px' }} />
          
          </div>
        )}
        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
        <button
          type="button"
          onClick={handleUpload}
          style={{ backgroundColor: 'gray', color: 'white', padding
          : '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '10px' }}
        >
          Click to Upload
        </button>
       
      </form> */}
      <div style={{ position: 'relative', top: '20px', left: '300px' }} >
      {previewImage && (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src={previewImage} alt="Profile Preview" style={{ width: '150px', height: '150px' }} />
          
          </div>
        )}
      </div>
      
      <div className="container">
        
        <h1 style={{ fontSize: '30px', marginTop: '-50px' }}>Finish Registration</h1>
        
        <form onSubmit={handleSubmit}>
          
          <div className="radio-container">
            <div>
              <input
                type="radio"
                id="client"
                name="userType"
                value="client"
                checked={isClient}
                onChange={() => {
                  setIsClient(true);
                  setIsCompany(false);
                }}
                className="radio-button"
              />
              <label
                htmlFor="client"
                className={`radio-label ${isClient ? 'radio-label-selected' : 'radio-label-unselected'}`}
              >
                As a Client
              </label>
            </div>
            <div className="radio-label-separator">or</div>
            <div>
              <input
                type="radio"
                id="creator"
                name="userType"
                value="creator"
                checked={!isClient && !isCompany}
                onChange={() => {
                  setIsClient(false);
                  setIsCompany(false);
                }}
                className="radio-button"
              />
              <label
                htmlFor="creator"
                className={`radio-label ${!isClient && !isCompany ? 'radio-label-selected' : 'radio-label-unselected'}`}
              >
                As a Creator
              </label>
            </div>
            <div className="radio-label-separator">or</div>
            <div>
              <input
                type="radio"
                id="company"
                name="userType"
                value="company"
                checked={isCompany}
                onChange={() => {
                  setIsClient(false);
                  setIsCompany(true);
                }}
                className="radio-button"
              />
              <label
                htmlFor="company"
                className={`radio-label ${isCompany ? 'radio-label-selected' : 'radio-label-unselected'}`}
              >
                As a Company
              </label>
            </div>
          </div>

          <div className="details">
            <div className="flex items-center border-b-2 py-2 px-1 mb-2">
              <input
                type="text"
                placeholder="Enter Full Name"
                className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="flex items-center border-b-2 py-2 px-1 mb-2">
              <input
                type="text"
                placeholder="Enter Country"
                className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
              {errors.country && <p className="text-red-500">{errors.country}</p>}
            </div>
            <div className="flex items-center border-b-2 py-2 px-1 mb-2">
              <input
                type="text"
                placeholder="Enter email that used during registration"
                className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="flex items-center border-b-2 py-2 px-1 mb-2">
              <input
                type="text"
                placeholder="Enter State"
                className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
              {errors.state && <p className="text-red-500">{errors.state}</p>}
            </div>
            <div className="flex items-center border-b-2 py-2 px-1 mb-2">
              <input
                type="text"
                placeholder="Enter City"
                className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              {errors.city && <p className="text-red-500">{errors.city}</p>}
            </div>
            <div className="flex items-center border-b-2 py-2 px-1 mb-2">
              <input
                type="text"
                placeholder="Enter Communication Language"
                className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                name="language"
                id="language"
                value={formData.language}
                onChange={handleInputChange}
                required
              />
              {errors.language && <p className="text-red-500">{errors.language}</p>}
            </div>
          </div>
          
          {isCompany && (
            <>
              <div className="flex items-center border-b-2 py-2 px-1 mb-2">
                <input
                  type="text"
                  placeholder="Enter Company Name"
                  className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
                {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}
              </div>
              <div className="flex items-center border-b-2 py-2 px-1 mb-2">
                <input
                  type="text"
                  placeholder="Enter Company Registration Number"
                  className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                  name="companyRegistrationNumber"
                  id="companyRegistrationNumber"
                  value={formData.companyRegistrationNumber}
                  onChange={handleInputChange}
                  required
                />
                {errors.companyRegistrationNumber && <p className="text-red-500">{errors.companyRegistrationNumber}</p>}
              </div>
            </>
          )}
            <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} /> 
            <br/>

          <div className="check">
            <input
              type="checkbox"
              id="terms_conditions"
              name="terms_conditions"
              checked={formData.terms_conditions}
              onChange={handleInputChange}
            />
            <label htmlFor="terms_conditions">
              I agree to the <a href='/'>terms</a> and <a href='/'>conditions</a>
            </label>
            {errors.terms_conditions && <p className="text-red-500">{errors.terms_conditions}</p>}
          </div>
          
        
          <button
            id="register_btn"
            type="submit"
            className="block w-32 my-10 py-2 ml-0 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
          >
            Sign Up
          </button>
        </form>
       

        <ToastContainer />
      </div>
    </div>
  );
}

export default FinishRegistration;

