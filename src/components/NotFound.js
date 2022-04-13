import './../css/NotFound.css'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="notfound__section">
      <h1 className="notfound__title">Opps Page Not Found</h1>
      <Link to="/">Go Back to Home</Link>
    </div>
  )
}

export default NotFound
