import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import * as THREE from 'three';

const HolographicCube = () => {
  const cubeRef = useRef();
  const miniCubesRef = useRef([]);
  const particlesRef = useRef();
  const navigate = useNavigate();
  const [exploded, setExploded] = useState(false);
  const [hoveredCube, setHoveredCube] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);
  const [animationInProgress, setAnimationInProgress] = useState(false);

  console.log('HolographicCube component mounted');

  // Create particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useEffect(() => {
    // Entrance animation - moderately sized initial size
    gsap.fromTo(cubeRef.current.scale, { x: 0, y: 0, z: 0 }, {
      x: 1.0, y: 1.0, z: 1.0,
      duration: 2,
      ease: "elastic.out(1, 0.5)"
    });

    // Hide particles and mini cubes initially
    if (particlesRef.current) {
      particlesRef.current.visible = false;
    }
    miniCubesRef.current.forEach((miniCube) => {
      if (miniCube) {
        miniCube.visible = false;
      }
    });
  }, []);


  const handleCrystalClick = (crystalIndex) => {
    if (crystalIndex === 0 && !animationInProgress) { // Chat crystal (index 0)
      navigate('/chat');
    } else if (crystalIndex === 1 && !animationInProgress) { // Agenda crystal (index 1)
      navigate('/agenda');
    } else if (crystalIndex === 3 && !animationInProgress) { // Files crystal (index 3)
      navigate('/files');
    } else if (crystalIndex === 4 && !animationInProgress) { // Settings crystal (index 4)
      navigate('/settings');
    } else {
      // Handle other crystals if needed
      console.log(`Crystal ${crystalIndex} clicked`);
    }
  };

  const handleMainCubeDoubleClick = () => {
    if (!exploded && !animationInProgress) {
      setAnimationInProgress(true);
      setExploded(true);

      // Shrink the main cube
      gsap.to(cubeRef.current.scale, {
        x: 0.5, y: 0.5, z: 0.5,
        duration: 1,
        ease: "power2.out"
      });

      // Show and animate particles to appear and glow
      if (particlesRef.current) {
        particlesRef.current.visible = true;
        gsap.fromTo(particlesRef.current.material, { opacity: 0 }, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        });
        gsap.to(particlesRef.current.material, {
          emissiveIntensity: 1.0,
          duration: 1,
          ease: "power2.out"
        });
      }

      // Show and animate mini crystals in a pentagon formation above the cube
      const pentagonRadius = 1.0;
      const basePositions = [
        { angle: Math.PI + Math.PI + Math.PI / 2, height: 0.5 }, // Rotated 270 degrees (another 90 degrees)
        { angle: Math.PI + Math.PI + Math.PI / 2 + Math.PI * 2/5, height: 0.5 }, // 72 degrees
        { angle: Math.PI + Math.PI + Math.PI / 2 + Math.PI * 4/5, height: 0.5 }, // 144 degrees
        { angle: Math.PI + Math.PI + Math.PI / 2 + Math.PI * 6/5, height: 0.5 }, // 216 degrees
        { angle: Math.PI + Math.PI + Math.PI / 2 + Math.PI * 8/5, height: 0.5 } // 288 degrees
      ];

      miniCubesRef.current.forEach((miniCube, i) => {
        if (miniCube) {
          const angle = basePositions[i].angle + rotationAngle;
          const x = Math.cos(angle) * pentagonRadius;
          const z = Math.sin(angle) * pentagonRadius;
          const y = basePositions[i].height;

          gsap.to(miniCube.position, {
            x: x,
            y: y,
            z: z,
            duration: 1.2,
            delay: i * 0.4,
            ease: "back.out(1.7)"
          });
          // Scale mini crystals smaller (50% reduction)
          gsap.fromTo(miniCube.scale, { x: 0, y: 0, z: 0 }, {
            x: 0.3,
            y: 0.3,
            z: 0.3,
            duration: 1.2,
            delay: i * 0.4,
            ease: "back.out(1.7)"
          });
        }
      });

      // Reset animation flag after animation completes
      setTimeout(() => setAnimationInProgress(false), 2000);
    }
  };

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.01;
    }
    miniCubesRef.current.forEach((miniCube) => {
      if (miniCube) {
        miniCube.rotation.y += 0.01;
      }
    });
    // Animate particles
    if (particlesRef.current && exploded) {
      particlesRef.current.rotation.y += 0.005;
    }

    // Handle mouse drag for crystal rotation
    if (isDragging && exploded) {
      // This will be handled by mouse events
    }
  });

  const handleMouseDown = (e) => {
    if (exploded) {
      setIsDragging(true);
      setLastMouseX(e.clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && exploded) {
      const deltaX = e.clientX - lastMouseX;
      setRotationAngle(prev => prev + deltaX * 0.01);
      setLastMouseX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <group
      onPointerDown={handleMouseDown}
      onPointerMove={handleMouseMove}
      onPointerUp={handleMouseUp}
      onPointerLeave={handleMouseUp}
    >
      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0}
          size={0.05}
          transparent
          opacity={0}
          sizeAttenuation
        />
      </points>

      {/* Main Holographic Cube */}
      <mesh ref={cubeRef} castShadow onDoubleClick={handleMainCubeDoubleClick} position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.2}
          transparent
          opacity={0.5}
          roughness={0.0}
          metalness={1.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Instruction Text */}
      {!exploded && (
        <Html position={[0, -0.5, 0]} center>
          <div style={{
            color: '#00ffff',
            fontSize: '16px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            textShadow: '0 0 8px #00ffff',
            lineHeight: '1.2',
            whiteSpace: 'nowrap',
            display: 'inline-block',
            minWidth: '250px'
          }}>
            Double click to display options
          </div>
        </Html>
      )}

      {/* Mini Crystals */}
      <group>
        <mesh
          ref={el => miniCubesRef.current[0] = el}
          position={[0, 0, 0]}
          scale={[0, 0, 0]}
          onPointerOver={() => setHoveredCube(0)}
          onPointerOut={() => setHoveredCube(null)}
          onClick={() => handleCrystalClick(0)}
          visible={exploded}
        >
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.5}
            roughness={0.0}
            metalness={1.0}
            side={THREE.DoubleSide}
          />
        </mesh>
        {hoveredCube === 0 && exploded && (
          <Html position={[0, 0.25, 0]} center>
            <div style={{
              color: '#ffffff',
              fontSize: '18px',
              textAlign: 'center',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              textShadow: '0 0 5px #00ffff'
            }}>
              Chat
            </div>
          </Html>
        )}
      </group>
      <group>
        <mesh
          ref={el => miniCubesRef.current[1] = el}
          position={[0, 0, 0]}
          scale={[0, 0, 0]}
          onPointerOver={() => setHoveredCube(1)}
          onPointerOut={() => setHoveredCube(null)}
          onClick={() => handleCrystalClick(1)}
          visible={exploded}
        >
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
            roughness={0.0}
            metalness={1.0}
            side={THREE.DoubleSide}
          />
        </mesh>
        {hoveredCube === 1 && exploded && (
          <Html position={[0, 0.25, 0]} center>
            <div style={{
              color: '#ffffff',
              fontSize: '18px',
              textAlign: 'center',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              textShadow: '0 0 5px #00ffff'
            }}>
              Agenda
            </div>
          </Html>
        )}
      </group>
      <group>
        <mesh
          ref={el => miniCubesRef.current[2] = el}
          position={[0, 0, 0]}
          scale={[0, 0, 0]}
          onPointerOver={() => setHoveredCube(2)}
          onPointerOut={() => setHoveredCube(null)}
          onClick={() => handleCrystalClick(2)}
          visible={exploded}
        >
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
            roughness={0.0}
            metalness={1.0}
            side={THREE.DoubleSide}
          />
        </mesh>
        {hoveredCube === 2 && exploded && (
          <Html position={[0, 0.25, 0]} center>
            <div style={{
              color: '#ffffff',
              fontSize: '18px',
              textAlign: 'center',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              textShadow: '0 0 5px #00ffff'
            }}>
              Games
            </div>
          </Html>
        )}
      </group>
      <group>
        <mesh
          ref={el => miniCubesRef.current[3] = el}
          position={[0, 0, 0]}
          scale={[0, 0, 0]}
          onPointerOver={() => setHoveredCube(3)}
          onPointerOut={() => setHoveredCube(null)}
          onClick={() => handleCrystalClick(3)}
          visible={exploded}
        >
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
            roughness={0.0}
            metalness={1.0}
            side={THREE.DoubleSide}
          />
        </mesh>
        {hoveredCube === 3 && exploded && (
          <Html position={[0, 0.25, 0]} center>
            <div style={{
              color: '#ffffff',
              fontSize: '18px',
              textAlign: 'center',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              textShadow: '0 0 5px #00ffff'
            }}>
              Files Transfer
            </div>
          </Html>
        )}
      </group>
      <group>
        <mesh
          ref={el => miniCubesRef.current[4] = el}
          position={[0, 0, 0]}
          scale={[0, 0, 0]}
          onPointerOver={() => setHoveredCube(4)}
          onPointerOut={() => setHoveredCube(null)}
          onClick={() => handleCrystalClick(4)}
          visible={exploded}
        >
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
            roughness={0.0}
            metalness={1.0}
            side={THREE.DoubleSide}
          />
        </mesh>
        {hoveredCube === 4 && exploded && (
          <Html position={[0, 0.25, 0]} center>
            <div style={{
              color: '#ffffff',
              fontSize: '18px',
              textAlign: 'center',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              textShadow: '0 0 5px #00ffff'
            }}>
              Settings
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};

export default HolographicCube;