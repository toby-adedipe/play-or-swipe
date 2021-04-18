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
      <p id="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
    </header>
  );
};

export default Header;