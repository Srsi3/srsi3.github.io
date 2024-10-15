import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import BlackHole from './BlackHole';
import GlowingOrb from './Components/GlowingOrb'; 

const App = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ width: '100vw', height: '100vh' }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <BlackHole />
      <GlowingOrb position={[2, 0, 0]} /> 
      <GlowingOrb position={[0, 2, 0]} />
      <GlowingOrb position={[-2, 0, 0]} /> 
      <GlowingOrb position={[0, -2, 0]} />  
      <OrbitControls />
    </Canvas>
  );
};

export default App;
