import './Header.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navLinks">
                <li><a href="/home" className='links'>Home</a></li>
                <li><a href="/about" className='links'>About</a></li>
                <li><a href="/contactus" className='links'>Contact Us</a></li>
                <li><a href="/blog" className='links'>Blog</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;