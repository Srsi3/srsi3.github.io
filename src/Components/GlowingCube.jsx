// src/GlowingCube.js
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Html } from '@react-three/drei';

const GlowingCube = () => {
  const meshRef = useRef();
  const [isUnwrapped, setIsUnwrapped] = useState(false);

 
  const handleClick = () => {
    setIsUnwrapped(!isUnwrapped);
  };


  useFrame(() => {
    if (meshRef.current) {
      if (isUnwrapped) {
        meshRef.current.rotation.x += 0.02;
        meshRef.current.rotation.y += 0.02;
      }
    }
  });

  return (
    <mesh ref={meshRef} onClick={handleClick} scale={isUnwrapped ? [1, 0.1, 1] : [1, 1, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshDistortMaterial color="cyan" attach="material" distort={0.5} speed={2} />
      <Html center>
        <div style={{ color: 'white', fontSize: '2em' }}>Click Me!</div>
      </Html>
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <GlowingCube />
    </Canvas>
  );
};

export default App;
