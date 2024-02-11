import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const CombinedComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [labelResult, setLabelResult] = useState('');
  const [data, setData] = useState(null);

  // Handle image upload
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://127.0.0.1:5500/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response, update state, etc.
      console.log(response.data);
      // Optionally, update the data state with the response from image upload
      setData(response.data);
      setLabelResult(response.data.label_result); // Set label result from the image upload
    } catch (error) {
      // Handle errors
      console.error('Error uploading image:', error);
    }
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5500/'); // Replace with your actual API endpoint
        setLabelResult(response.data.label_result);

        // Assuming your backend returns data in the response
        setData(response.data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>Fetched Data:</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
      {labelResult && <div>{labelResult}</div>}

      <hr />

      <h2>Image Upload:</h2>
      <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {labelResult && <div>{labelResult}</div>}
    </div>
  );
};

export default CombinedComponent;

