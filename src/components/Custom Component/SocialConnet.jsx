import  instagramLogo  from "../../asset/instagram-logo.png";
import  githubLogo  from "../../asset/github-logo.png";
import  linkedinLogo  from "../../asset/linkedin-logo.png";
import  mailLogo  from "../../asset/mail-logo.png";
import "./SocialConnet.css";

const SocialConnet = () => {
    return (
        <div className="social-container">
            <a href="https://github.com/Zubayer-Rahman" target="_blank" rel="noopener noreferrer">
                <img src={githubLogo} alt="GitHub" className="social-icon" />
            </a>
            <a href="https://www.linkedin.com/in/ahmed-zubayer-rahman-47a94633a/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinLogo} alt="LinkedIn" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/its_zuubuu/" target="_blank" rel="noopener noreferrer">
                <img src={instagramLogo} alt="Instagram" className="social-icon" />
            </a>
            <a href="mailto:zubayer5566@gmail.com">
                <img src={mailLogo} alt="Mail" className="social-icon" />
            </a>
        </div>
    )
}

export default SocialConnet