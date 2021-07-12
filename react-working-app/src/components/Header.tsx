import { Link } from "react-router-dom";

export const Header = () => (
    <header className="App-header">      
      <ul>
        <li>
          <Link to="/">Test Page</Link>
        </li>
        <li>
          <Link to="/devices">Devices</Link>
        </li>
        <li>
          <Link to="/house">My House</Link>
        </li>        
      </ul>
    </header>
)