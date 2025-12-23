import React from "react";
import "./Home.css";
import Banner from "../components/Banner.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import avatarImage from "../asset/zubayer.png";
import framerMotion from "../asset/framer-motion.svg"
import gsap from "../asset/gsap.png";
import ScrollTimeline from "../components/ScrollTimeline.jsx";
import ScrollVelocity from "../components/ScrollVelocity.jsx"
import FloatingMenu from "../components/Floating Widgets/floatingMenu.jsx";
import ScrollReveal from "../components/Scroll Reveal/scrollReveal.jsx";
import ProfileImg from "../asset/Corporate-Headshot.png";


const Home = () => {
  return (
    <>
      <Banner />

      <div className="about" id="about">
        <div className="info">
          <h2>More about me!!</h2>
        </div>

        <div className="profile-container">
          <ScrollReveal className="profile-card" direction="left" delay={0.2}>
            {/*<ProfileCard
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
            />*/}

            <img src={ProfileImg} alt="Zubayer Rahman" className="profile-image" />
          </ScrollReveal>
          <ScrollReveal className="profile-description" direction="right" delay={0.2}>
            <h2>
              Proficient MERN Stack Developer with extensive experience in MongoDB, Express.js, React.js, Node.js, along with
              HTML5, CSS3, JavaScript (ES6+), and responsive web design. Adept at building scalable, high-performance web
              applications with seamless front-end and back-end integration. Skilled in RESTful API development and database
              design. Proficient in cross-browser compatibility, performance optimization, and CSS frameworks like Bootstrap and
              Tailwind CSS. Strong background in version control (Git/GitHub), Agile methodologies, UI/UX design feasibility, and
              delivering quality solutions in fast-paced environments. Committed to continuous learning, writing clean maintainable
              code, and staying current with evolving industry trends and technologies.
            </h2>
          </ScrollReveal>
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
        <h2>Tech Arsenal</h2>
        <div className="skill-container">

          <ScrollReveal
            className="front-end"
          >
            <h4 className="title">Front End</h4>
            <div className="tech-container">
              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="" />
                <p>React JS</p>
              </div>

              <div className="tech-item ">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="" className="nextjs" />
                <p>Next JS</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="" />
                <p>JavaScript</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="" />
                <p>Tailwind CSS</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="" />
                <p>HTML</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="" />
                <p>CSS</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" alt="" />
                <p>SASS</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="" />
                <p>Bootstrap</p>
              </div>

              <div className="tech-item">
                <img src={gsap} alt="" className="gsap" />
                <p>GSAP</p>
              </div>

              <div className="tech-item">
                <img src={framerMotion} alt="" className="motion" />
                <p>Framer Motion</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="back-end ">
            <h4 className="title">Back End</h4>
            <div className="tech-container">
              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="" />
                <p>Node JS</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" alt="" />
                <p>Nest Js</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="" className="expressjs" />
                <p>Express Js</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodemon/nodemon-original.svg" alt="" />
                <p>Nodemon</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg" alt="" />
                <p>React Router</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="database ">
            <h4 className="title">Database</h4>
            <div className="tech-container">
              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" alt="" />
                <p>Mongoose</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="" />
                <p>MongoDB</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" alt="" className="prisma" />
                <p>Prisma</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="" />
                <p>My SQL</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="tools ">
            <h4 className="title">Tools</h4>
            <div className="tech-container">
              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="" />
                <p>Git</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="" className="github" />
                <p>GitHub</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="" />
                <p>Docker</p>
              </div>

              <div className="tech-item">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg" alt="" />
                <p>GitLab</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>


      {/* <div className="github-activity">
        <h2 className="github-title">My GitHub Activity</h2>
        <GitHubDashboard 
          username="Zubayer-Rahman"
          token={process.env.REACT_APP_GITHUB_TOKEN}
        />
      </div> */}


      <div className="project-title">
        <h1>My Beloved Projects</h1>
      </div>
      <div className="projectshowcase">
        <div className="card-container">
          
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Home;
