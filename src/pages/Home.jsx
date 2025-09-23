import React from 'react'
import './Home.css'
import Header from '../components/Header.jsx'
import Banner from '../components/Banner.jsx'
import ProfileCard from '../components/ProfileCard.jsx'
import ScrambledText from '../components/ScrambledText.jsx'
import ScrollVelocity from '../components/Scroller.jsx'
import LogoLoop from '../components/LogoLoop';
import avatarImage from '../asset/zubayer.png'

const Home = () => {
  const imageLogos = [
    { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
    { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
    { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
  ];
  return (
    <>
      <Header />
      <Banner />

      <div className="about">
        <div className="info">
          <h2>More about me!!</h2>
        </div>

        <div className="carousel">
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
            onContactClick={() => console.log('Contact clicked')}
          />
        </div>

        <div className="description">
          <ScrambledText
            className="scrambled-text-demo"
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:"
          >
            I am proficient in HTML, CSS, Tailwind, and SCSS frameworks, with solid intermediate-level React development skills. I excel in crafting dynamic UIs and integrating advanced functionalities using JavaScript. I prioritize user-centric digital experiences that meet client and user needs efficiently.
          </ScrambledText>
        </div>
      </div>

      <div className="skills">
        <h2 >What do i Know?</h2>
        <div className="skill-set">
          <ScrollVelocity
            texts={['React . Javascript . Tailwind . SCSS . Git . Node.js .']} 
            velocity={50} 
            className="custom-scroll-text"
          />
        </div>
      </div>

      <div className="looper">
        <h2>Skill Set</h2>
        <LogoLoop
          logos={imageLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
      </div>


      {/* <Footer /> */}
    </>
  )
}

export default Home