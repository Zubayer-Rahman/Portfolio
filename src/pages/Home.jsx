import React from "react";
import "./Home.css";
// import Header from '../components/Header.jsx'
// import ScrambledText from '../components/ScrambledText.jsx'
// import ScrollVelocity from '../components/Scroller.jsx'
import Banner from "../components/Banner.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import LogoLoop from "../components/LogoLoop";
import avatarImage from "../asset/zubayer.png";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPhp,
  SiMysql,
  SiGit,
  SiSass,
} from "react-icons/si";
import ScrollTimeline from "../components/ScrollTimeline.jsx";
// import GitHubWidget from "../components/Custom Component/Github.jsx";

const Home = () => {
  const techLogos = [
    { node: <SiReact />, title: "React" },
    { node: <SiNextdotjs />, title: "Next.js" },
    { node: <SiTypescript />, title: "TypeScript" },
    { node: <SiTailwindcss />, title: "Tailwind CSS" },
    { node: <SiNodedotjs />, title: "Nodejs" },
    { node: <SiPhp />, title: "php" },
    { node: <SiMysql />, title: "Mysql" },
    { node: <SiGit />, title: "GIT" },
    { node: <SiSass />, title: "SCSS" },
  ];
  return (
    <>
      <nav className="navbar">
        <ul className="navLinks">
          <li>
            <a href="/" className="links">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="links">
              About
            </a>
          </li>
          <li>
            <a href="#contactus" className="links">
              Projects
            </a>
          </li>
          <li>
            <a href="#blog" className="links">
              Blog
            </a>
          </li>
        </ul>
      </nav>

      <Banner />

      <div className="about" id="about">
        <div className="info">
          <h2>More about me!!</h2>
        </div>

          <div className="profile-card">
            <ProfileCard
              name="Zubayer Rahman"
              title="Software Engineer"
              handle="zubayer"
              status="Dotlines Bangladesh"
              contactText="Contact Me"
              avatarUrl={avatarImage}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log("Contact clicked")}
            />
          </div>
          <div className="profile-description">
            <h2>
              I am proficient in HTML, CSS, Tailwind, and SCSS frameworks, with
              solid intermediate-level React development skills. I excel in
              crafting dynamic UIs and integrating advanced functionalities
              using JavaScript. I prioritize user-centric digital experiences
              that meet client and user needs efficiently.
            </h2>
          </div>
        </div>

      {/* <div className="skills">
        <h2 >What do i Know?</h2>
        <div className="skill-set">
          <ScrollVelocity
            texts={['React . Javascript . Tailwind . SCSS . Git . Node.js .']} 
            velocity={50} 
            className="custom-scroll-text"
          />
        </div>
      </div> */}

      <div className="looper">
        <h2>Skill Set</h2>
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          ariaLabel="Technology partners"
        />
      </div>

      <div className="timeline">
        <ScrollTimeline />
      </div>

      <div className="github-activity">
        <h2 className="github-title">My GitHub Activity</h2>
        {/* <GitHubWidget /> */}
      </div>

      <div className="projectshowcase"></div>

      {/* <Footer /> */}
    </>
  );
};

export default Home;
