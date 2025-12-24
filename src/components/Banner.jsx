import React from 'react'
import './Banner.css'
import Galaxy from './Galaxy';
import ScrollReveal from './Scroll Reveal/scrollReveal';

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="particles-background">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.7}
          saturation={0.8}
          hueShift={1500}
        />
      </div>

      <ScrollReveal className="banner-content">
        <h1>
          Hi, I'm <span>Zubayer</span>
        </h1>

        <p className='designation'>
          MERN Stack Developer
        </p>

        <button>Projects</button>
      </ScrollReveal>
    </div>
  )
}

export default Banner