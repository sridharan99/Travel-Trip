import {FiHome} from 'react-icons/fi'
import {RiSuitcase2Line} from 'react-icons/ri'
import {TbLogout2} from 'react-icons/tb'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <header className="nav-container">
      <nav className="lg-header-container">
        <h1 className="lg-header-heading">
          <Link className="link-lg-item" to="/">
            Travel Trip
          </Link>
        </h1>

        <div className="lg-nav-list">
          <div className="lg-nav-item">
            <Link className="link-lg-item link-lg-home" to="/">
              Home
            </Link>
            <Link className="link-icon link-sm-home" to="/">
              <FiHome className="home-icon" />
              <p className="home-header-text">Home</p>
            </Link>
          </div>
          <div className="lg-nav-item">
            <Link className="link-lg-item link-lg-home" to="/my-trips">
              My Trips
            </Link>
            <Link className="link-icon link-sm-home" to="/my-trips">
              <RiSuitcase2Line className="home-icon" />
              <p className="home-header-text">My Trips</p>
            </Link>
          </div>
          <div className="sm-btn-container">
            <button
              onClick={onClickLogoutButton}
              type="button"
              className="logout-button-sm link-icon"
            >
              <TbLogout2 className="home-icon" />
              <p className="home-header-text">Logout</p>
            </button>
          </div>
        </div>

        <button
          onClick={onClickLogoutButton}
          type="button"
          className="lg-logout-btn"
        >
          Logout
        </button>
      </nav>
    </header>
  )
}

export default withRouter(Header)
