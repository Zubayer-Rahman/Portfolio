import React from "react";
import "./Home.css";
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
// import GitHubDashboard from "../components/Custom Component/Github.jsx";

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
      <Banner />

      <div className="about" id="about">
        <div className="info">
          <h2>More about me!!</h2>
        </div>

        <div className="profile-card">
          <ProfileCard
            name="Zubayer Rahman"
            title="MERN Stack Dev"
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
            Proficient MERN Stack Developer with extensive experience in MongoDB, Express.js, React.js, Node.js, along with
            HTML5, CSS3, JavaScript (ES6+), and responsive web design. Adept at building scalable, high-performance web
            applications with seamless front-end and back-end integration. Skilled in RESTful API development and database
            design. Proficient in cross-browser compatibility, performance optimization, and CSS frameworks like Bootstrap and
            Tailwind CSS. Strong background in version control (Git/GitHub), Agile methodologies, UI/UX design feasibility, and
            delivering quality solutions in fast-paced environments. Committed to continuous learning, writing clean maintainable
            code, and staying current with evolving industry trends and technologies.
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


      <div className="timeline">
        <ScrollTimeline />
      </div>

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



      <div className="skill-set">
        <div className="frontend">

        </div>
        <div className="backend">

        </div>
        <div className="database">

        </div>
        <div className="tools">

        </div>
      </div>

      {/* <div className="github-activity">
        <h2 className="github-title">My GitHub Activity</h2>
        <GitHubDashboard 
          username="Zubayer-Rahman"
          token={process.env.REACT_APP_GITHUB_TOKEN}
        />
      </div> */}

      <div className="projectshowcase">


      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Home;
