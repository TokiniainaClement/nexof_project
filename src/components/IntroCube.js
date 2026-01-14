import React, { useRef, useEffect, useState, useCallback } from 'react';
import './IntroCube.css';

const IntroCube = ({ onComplete }) => {
  const particlesRef = useRef(null);
  const cubeSystemRef = useRef(null);
  const [isDissolving, setIsDissolving] = useState(false);

  // Dissolve effect
  const dissolveEffect = useCallback(() => {
    const cubeSystem = cubeSystemRef.current;
    if (!cubeSystem) return;
    const container = cubeSystem.parentElement;

    // Add dissolving class to main elements
    cubeSystem.classList.add('dissolving');

    // Create fragments
    const fragmentCount = 50;
    for (let i = 0; i < fragmentCount; i++) {
      const fragment = document.createElement('div');
      fragment.className = 'fragment';

      // Random starting position within cube area
      const startX = Math.random() * 200 - 100;
      const startY = Math.random() * 200 - 100;
      const startZ = Math.random() * 200 - 100;

      // Random end position (further away)
      const endX = (Math.random() - 0.5) * 800;
      const endY = (Math.random() - 0.5) * 800;

      fragment.style.left = `50%`;
      fragment.style.top = `50%`;
      fragment.style.transform = `translate(${startX}px, ${startY}px) translateZ(${startZ}px)`;
      fragment.style.setProperty('--random-x', `${endX}px`);
      fragment.style.setProperty('--random-y', `${endY}px`);

      // Random size and delay
      const size = Math.random() * 4 + 2;
      const delay = Math.random() * 1000;

      fragment.style.width = `${size}px`;
      fragment.style.height = `${size}px`;

      container.appendChild(fragment);

      // Activate fragment animation
      setTimeout(() => {
        fragment.classList.add('active');
      }, delay);

      // Remove fragment after animation
      setTimeout(() => {
        if (fragment.parentNode) {
          fragment.parentNode.removeChild(fragment);
        }
      }, 3000 + delay);
    }

    // Reset cube after dissolve animation
    setTimeout(() => {
      cubeSystem.classList.remove('dissolving');
      cubeSystem.style.opacity = '1';
      cubeSystem.style.transform = 'scale(1)';
      setIsDissolving(false);
      if (onComplete) onComplete();
    }, 3500);
  }, [onComplete]);

  // Double-click handler
  const handleDoubleClick = useCallback(() => {
    if (isDissolving) return;
    setIsDissolving(true);
    dissolveEffect();
  }, [isDissolving, dissolveEffect]);

  useEffect(() => {
    // Create orbiting particles
    const createParticles = () => {
      const particlesContainer = particlesRef.current;
      if (!particlesContainer || particlesContainer.children.length > 0) return;

      const particleCount = 12;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random orbital positions and delays
        const delay = (i / particleCount) * 8;
        const size = Math.random() * 3 + 2;
        const opacity = Math.random() * 0.5 + 0.5;

        particle.style.animationDelay = `-${delay}s`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity;

        // Random orbital radius
        const radius = 120 + Math.random() * 60;
        particle.style.setProperty('--orbit-radius', `${radius}px`);

        particlesContainer.appendChild(particle);
      }
    };

    // Initialize particles when component mounts
    createParticles();

    // Add double-click event listener
    const cubeSystem = cubeSystemRef.current;
    if (cubeSystem) {
      cubeSystem.addEventListener('dblclick', handleDoubleClick);
    }

    // Add subtle mouse interaction
    const handleMouseMove = (e) => {
      if (isDissolving) return;
      const cubeSystem = cubeSystemRef.current;
      if (!cubeSystem) return;

      const rect = cubeSystem.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / window.innerWidth;
      const deltaY = (e.clientY - centerY) / window.innerHeight;

      cubeSystem.style.transform = `
        rotateX(${15 + deltaY * 10}deg)
        rotateY(${deltaX * 10}deg)
        scale(${1 + Math.abs(deltaX) * 0.05})
      `;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Auto-transition after 8 seconds if not interacted
    const autoTimeout = setTimeout(() => {
      if (!isDissolving && onComplete) {
        onComplete();
      }
    }, 8000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(autoTimeout);
      if (cubeSystem) {
        cubeSystem.removeEventListener('dblclick', handleDoubleClick);
      }
    };
  }, [isDissolving, onComplete, handleDoubleClick]);

  return (
    <div className="intro-cube-container">
      <main className="container">
        <div className="cube-system" ref={cubeSystemRef}>
          <div className="glow-effect"></div>

          <div className="cube">
            <div className="face front">
              <div className="code-surface" dangerouslySetInnerHTML={{__html: '01001000 01101111 01101100 01101111<br/>01100111 01110010 01100001 01110000<br/>01101000 01101001 01100011 00100000<br/>01000011 01110101 01100010 01100101<br/>01000100 01100001 01110100 01100001<br/>01000101 01101110 01100011 01110010<br/>01111001 01110000 01110100 01100101<br/>01100100 00100000 01001001 01101110<br/>01100110 01101111 01110010 01101101<br/>01100001 01110100 01101001 01101111'}} />
            </div>
            <div className="face back">
              <div className="code-surface" dangerouslySetInnerHTML={{__html: 'TRON.exe<br/>GRID_ACTIVE<br/>USER_DETECTED<br/>LOADING...<br/>SYSTEM_OK<br/>DATA_FLOW<br/>ENCRYPTED<br/>SECURE_MODE<br/>HOLOGRAM<br/>INITIALIZED'}} />
            </div>
            <div className="face right">
              <div className="code-surface" dangerouslySetInnerHTML={{__html: '0xFF00FF<br/>0x00FFFF<br/>0x0080FF<br/>RGBA(0,255,255,0.8)<br/>GLOW_EFFECT<br/>PARTICLE_SYS<br/>WIREFRAME<br/>TRANSPARENT<br/>FLOATING<br/>ROTATION'}} />
            </div>
            <div className="face left">
              <div className="code-surface" dangerouslySetInnerHTML={{__html: 'function render(){<br/>  updateMatrix();<br/>  drawCube();<br/>  animate();<br/>}<br/>setInterval(render,16);<br/>const particles=[];<br/>for(let i=0;i<12;i++){<br/>  particles.push({<br/>    x:Math.random()*400<br/>  });<br/>}'}} />
            </div>
            <div className="face top">
              <div className="code-surface" dangerouslySetInnerHTML={{__html: '▲ QUANTUM DATA ▲<br/>◆ ENCRYPTED ◆<br/>● SECURE LINK ●<br/>▼ PROCESSING ▼<br/>◆ HOLOGRAPHIC ◆<br/>● MATRIX ACTIVE ●<br/>▲ CYBER SPACE ▲<br/>◆ DIGITAL REALM ◆<br/>● TRON LEGACY ●'}} />
            </div>
            <div className="face bottom">
              <div className="code-surface" dangerouslySetInnerHTML={{__html: ':::SYSTEM LOG:::<br/>[OK] Cube rendered<br/>[OK] Particles active<br/>[OK] Wireframe drawn<br/>[OK] Glow applied<br/>[OK] Animation loop<br/>[OK] User interaction<br/>[OK] Dissolve ready<br/>[OK] All systems go'}} />
            </div>
          </div>

          <div className="wireframe">
            <div className="wire wire-h wire1"></div>
            <div className="wire wire-h wire2"></div>
            <div className="wire wire-v wire3"></div>
            <div className="wire wire-v wire4"></div>
            <div className="wire wire-h wire5"></div>
            <div className="wire wire-h wire6"></div>
            <div className="wire wire-v wire7"></div>
            <div className="wire wire-v wire8"></div>
            <div className="wire wire-h wire9"></div>
            <div className="wire wire-h wire10"></div>
            <div className="wire wire-h wire11"></div>
            <div className="wire wire-h wire12"></div>
          </div>

          <div className="particles" ref={particlesRef}></div>
        </div>

        <div className="instruction">Double-click the cube to dissolve it into fragments</div>
      </main>
    </div>
  );
};

export default IntroCube;