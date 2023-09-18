import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import '../FinishRegistrationPage/FinishRegistration.css'


function UpdateProfile() {
  //const { userId } = useParams();
// Retrieve the user ID from local storage
        // Get the user ID from local storage
        const storedAuth = JSON.parse(localStorage.getItem('auth'));
        const userId = storedAuth?.user?._id;
        const [count, setCount] = useState(0);
//   const [isClient, setIsClient] = useState(true);
//   const [isCompany, setIsCompany] = useState(false);





 
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    email: '',
    state: '',
    city: '',
    language: '',
    terms_conditions: false,
    // companyName: '',
    // companyRegistrationNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!userId) {
        // Handle the case where the user ID is not found in local storage
        console.error('User ID not found in local storage.');
        // You can redirect the user to the login page or handle it in your desired way.
        return;
      }
  
    // Fetch user data by userId and populate the form
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_NODE_API}getUserdata/${userId}`);
        const userData = response.data;
        setFormData({
          ...userData,
        //   userType: userData.userType || 'creator', // Default to 'creator' if not specified
        });
        // setIsClient(userData.userType === 'client');
        // setIsCompany(userData.userType === 'company');
       
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error('Failed to fetch user data. Please try again.');
      }
    };

    fetchUserData();
  }, [userId]);

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

    // if (isCompany && !formData.companyName.trim()) {
    //   newErrors.companyName = 'Company Name is required';
    // }

    // if (isCompany && !formData.companyRegistrationNumber.trim()) {
    //   newErrors.companyRegistrationNumber = 'Company Registration Number is required';
    // }

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
        const response = await axios.put(`${import.meta.env.VITE_NODE_API}updateProfile/${userId}`, {
          ...formData,
        });
        console.log(response.data);
        toast.success('Profile updated successfully');
      } catch (error) {
        console.error(error);
        toast.error('Failed to update profile. Please try again.');
      }
    }
  };

  if (loading) {
  
    return <div>Loading...</div>;
  
  }

  return (
    <div className="update_profile">
      <div className="container">
        <h1 style={{ fontSize: '30px', marginTop:'250px' }}>Update Profile</h1>
        <form onSubmit={handleSubmit}>
          {/* Radio buttons for user type */}
          {/* <div className="radio-container">
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
          </div> */}

          {/* Profile details */}
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
                placeholder="Enter email"
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

          {/* Company fields */}
          {/* {isCompany && (
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
          )} */}

          {/* Terms and conditions checkbox */}
          {/* <div className="check">
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
          </div> */}

          {/* Submit button */}
          <button
            id="update_btn"
            type="submit"
            className="block w-32 my-10 py-2  mt-104 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
          >
            Update Profile
          </button>
          {/* <Button variant="contained" type="submit" >Update Profile</Button> */}
          
        </form>
       
        <ToastContainer />
      </div>
    </div>
  );
}

export default UpdateProfile;
