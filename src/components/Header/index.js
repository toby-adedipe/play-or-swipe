import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header style={{ 
      backgroundImage: "url(/HeaderBG.png)", 
      width: '100%', 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }} className="header">
      <Link to="/"><p id="logo">Play or Swipe</p></Link>
      <p id="desc">See what people think of that move, and also let people know what you think of them</p>
      <div>
      <Link to="/login">Log in</Link> | 
      <Link to="/signup"> Sign up</Link>
      </div>
    </header>
  );
};

export default Header;