import React from 'react'
import './Banner.css'
import Galaxy from './Galaxy';

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="particles-background">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={1500}
        />
      </div>

      <div className="banner-content">
        <h1>
          Hello! I am <span>Zubayer Rahman</span>
        </h1>

        <h4 className='designation'>
          MERN Stack Developer
        </h4>

        <button>Projects</button>
      </div>
    </div>
  )
}

export default Banner