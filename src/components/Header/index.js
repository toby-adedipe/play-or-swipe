import './header.css';

const Header = () => {
    return (
        <header style={{ 
            backgroundImage: "url(/HeaderBG.png)", 
            width: '100%', 
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }} className="header">
            <p id="logo">Play or swipe</p>
            <p id="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </header>
    );
};

export default Header;