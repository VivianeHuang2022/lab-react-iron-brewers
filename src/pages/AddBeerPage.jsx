import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddBeerPage() {
  // State variable to store the values of the form inputs
  const [beerData, setBeerData] = useState({
    name: '',
    tagline: '',
    description: '',
    imageUrl: '',
    firstBrewed: '',
    brewersTips: '',
    attenuationLevel: 0,
    contributedBy: '',
  });

  // React Router hook for navigation
  const navigate = useNavigate();

  // Generic handler function for form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBeerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to create a new beer
      const response = await axios.post('https://ih-beers-api2.herokuapp.com/beers/new', beerData);

      // Handle the success response
      console.log('New beer created:', response.data);

      // Navigate the user to the page showing the list of all beers
      navigate('/'); // Adjust the path based on your route configuration
    } catch (error) {
      // Handle error
      console.error('Error creating new beer:', error);
    }
  };

  // Structure and the content of the page showing the form for adding a new beer.
  return (
    <>
      <div className="d-inline-flex flex-column w-100 p-4">
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            className="form-control mb-4"
            type="text"
            name="name"
            placeholder="Beer Name"
            value={beerData.name}
            onChange={handleInputChange}
          />

          <label>Tagline</label>
          <input
            className="form-control mb-4"
            type="text"
            name="tagline"
            placeholder="Beer Tagline"
            value={beerData.tagline}
            onChange={handleInputChange}
          />

          <label className="form-label">Description</label>
          <textarea
            className="form-control mb-4"
            type="text"
            name="description"
            placeholder="Description"
            rows="3"
            value={beerData.description}
            onChange={handleInputChange}
          ></textarea>

          <label>Image</label>
          <input
            className="form-control mb-4"
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={beerData.imageUrl}
            onChange={handleInputChange}
          />

          <label>First Brewed</label>
          <input
            className="form-control mb-4"
            type="text"
            name="firstBrewed"
            placeholder="Date - MM/YYYY"
            value={beerData.firstBrewed}
            onChange={handleInputChange}
          />

          <label>Brewer Tips</label>
          <input
            className="form-control mb-4"
            type="text"
            name="brewersTips"
            placeholder="..."
            value={beerData.brewersTips}
            onChange={handleInputChange}
          />

          <label>Attenuation Level</label>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                %
              </span>
            </div>
            <input
              className="form-control mb-4"
              type="number"
              name="attenuationLevel"
              value={beerData.attenuationLevel}
              onChange={handleInputChange}
              min={0}
              max={100}
            />
          </div>

          <label>Contributed By</label>
          <input
            className="form-control mb-4"
            type="text"
            name="contributedBy"
            placeholder="Contributed by"
            value={beerData.contributedBy}
            onChange={handleInputChange}
          />

          <button type="submit" className="btn btn-primary btn-round">
            Add Beer
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBeerPage;
