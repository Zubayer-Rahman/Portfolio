import React from 'react'
import './Banner.css'
import Particles from './Particles.jsx';
import TextType from './TextType.jsx';
import GradientText from './GradientText.jsx';

const Banner = () => {
  return (
    <div className="banner-container">
        <div className="particles-background">
            <Particles
                particleColors={['#ffffffff', '#ffffffff']}
                particleCount={200}
                particleSpread={5}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
            />
        </div>
        
        <div className="banner-content">
            <h1>
              <TextType 
                text={["Hello, I'm Zubayer Rahman", "Welcome to My Portfolio", "Explore My Work"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="_"
              />
            </h1>
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={10}
              showBorder={false}
              className="gradient-text"
            >
              I am a Software Engineer
            </GradientText>

            <button>See Now</button>
        </div>
    </div>
  )
}

export default Banner