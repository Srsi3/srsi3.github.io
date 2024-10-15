import React from 'react';
//Currently shaders not actually glowing, fix later
const GlowingOrb = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} /> 
      <meshStandardMaterial emissive={'#ff7700'} emissiveIntensity={1.5} color={'#ff5500'} /> 
    </mesh>
  );
};

export default GlowingOrb;
