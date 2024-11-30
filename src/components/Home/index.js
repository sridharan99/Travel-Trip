import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home-page-container">
    <Header className="header" />
    <div className="home-content-container">
      <img
        src="https://res.cloudinary.com/dkd9zrifr/image/upload/v1710859670/image_5_mbr5qa.png"
        alt="Travel"
        className="home-image"
      />
      <div className="home-content-description">
        <h1 className="home-page-heading">Travel. Relax. Memories.</h1>
        <p className="home-page-description">
          With travel trip you can experience new adventures and visit the best
          tourist destinations.
        </p>
        <Link to="/book-a-new-trip">
          <button type="button" className="home-page-btn">
            Book a new trip
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
