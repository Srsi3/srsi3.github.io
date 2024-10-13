import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader (black hole distortion)
const fragmentShader = `
  varying vec2 vUv;
  uniform float time;

  void main() {
    vec2 uv = vUv - 0.5;
    float len = length(uv);
    float distortion = 1.0 / (len * 5.0 + 0.5);
    vec2 warpedUv = uv * distortion + 0.5;

    // Add color effect to simulate gravitational lensing
    vec3 color = mix(vec3(0, 0, 0), vec3(1, 1, 1), smoothstep(0.2, 0.5, len));
    
    // Make the center of the black hole darker
    color *= 1.0 - smoothstep(0.0, 0.1, len);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const BlackHole = () => {
  const materialRef = useRef();
  const meshRef = useRef();
  const { gl } = useThree();

  // Animate the shader material over time
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  // Set the background color to dark space-like tone
  gl.setClearColor('#000022', 1);  // Dark bluish space-like background

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ time: { value: 0 } }}
      />
    </mesh>
  );
};

export default BlackHole;
