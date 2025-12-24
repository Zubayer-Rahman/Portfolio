import  instagramLogo  from "../../asset/instagram-logo.png";
import  githubLogo  from "../../asset/github-logo.png";
import  linkedinLogo  from "../../asset/linkedin-logo.png";
import  mailLogo  from "../../asset/mail-logo.png";
import "./SocialConnet.css";

const SocialConnet = () => {
    return (
        <div className="social-container">
            <a href="/">
                <img src={githubLogo} alt="GitHub" className="social-icon" />
            </a>
            <a href="/">
                <img src={linkedinLogo} alt="LinkedIn" className="social-icon" />
            </a>
            <a href="/">
                <img src={instagramLogo} alt="Instagram" className="social-icon" />
            </a>
            <a href="/">
                <img src={mailLogo} alt="Mail" className="social-icon" />
                <img src={githubLogo} alt="GitHub" className="social-icon" />
            </a>
            <a href="/">
                <img src={linkedinLogo} alt="LinkedIn" className="social-icon" />
            </a>
            <a href="/">
                <img src={instagramLogo} alt="Instagram" className="social-icon" />
            </a>
            <a href="/">
                <img src={mailLogo} alt="Mail" className="social-icon" />
            </a>
        </div>
    )
}

export default SocialConnet