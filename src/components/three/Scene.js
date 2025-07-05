import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Scene() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let animationFrameId;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      currentMount.clientWidth / currentMount.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    currentMount.appendChild(renderer.domElement);

    // Custom shader material for animated wireframe
    const uniforms = {
      u_time: { value: 0.0 },
      u_colorA: { value: new THREE.Color('#ff8c00') }, // Orange
      u_colorB: { value: new THREE.Color('#000000') }, // Black
      u_opacity: { value: 0.3 }
    };

    const vertexShader = `
      varying vec3 v_position;
      varying vec3 v_normal;
      
      void main() {
        v_position = position;
        v_normal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec3 u_colorA;
      uniform vec3 u_colorB;
      uniform float u_opacity;
      varying vec3 v_position;
      varying vec3 v_normal;
      
      void main() {
        // Create animated wave pattern
        float wave1 = sin(v_position.y * 4.0 + u_time * 1.5) * 0.5 + 0.5;
        float wave2 = sin(v_position.x * 3.0 + u_time * 1.2) * 0.5 + 0.5;
        float wave3 = sin(v_position.z * 2.0 + u_time * 0.8) * 0.5 + 0.5;
        
        // Combine waves for complex pattern
        float mixValue = (wave1 + wave2 + wave3) / 3.0;
        
        // Add fresnel effect
        vec3 viewDirection = normalize(cameraPosition - v_position);
        float fresnel = dot(normalize(v_normal), viewDirection);
        fresnel = pow(1.0 - fresnel, 2.0);
        
        // Mix colors based on waves and fresnel
        vec3 finalColor = mix(u_colorA, u_colorB, mixValue);
        finalColor = mix(finalColor, u_colorA, fresnel * 0.5);
        
        // Dynamic opacity based on animation
        float opacity = u_opacity * (0.7 + 0.3 * sin(u_time * 0.5));
        
        gl_FragColor = vec4(finalColor, opacity);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: true,
      transparent: true,
      side: THREE.DoubleSide
    });

    // Create multiple geometric objects
    const geometries = [
      new THREE.IcosahedronGeometry(2, 4),
      new THREE.OctahedronGeometry(1.5, 2),
      new THREE.TetrahedronGeometry(1.2, 1)
    ];

    const meshes = [];

    geometries.forEach((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, material.clone());
      
      // Position meshes
      mesh.position.x = (index - 1) * 3;
      mesh.position.y = Math.sin(index) * 1.5;
      mesh.position.z = -index * 0.5;
      
      // Set different rotation speeds
      mesh.userData = {
        rotationSpeed: {
          x: 0.001 + index * 0.0005,
          y: 0.002 + index * 0.0003,
          z: 0.0015 + index * 0.0002
        }
      };
      
      scene.add(mesh);
      meshes.push(mesh);
    });
    
    // Add subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Add directional light for depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update uniforms for all meshes
      meshes.forEach((mesh) => {
        mesh.material.uniforms.u_time.value = elapsedTime;
        
        // Individual rotation
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;
        
        // Subtle floating motion
        mesh.position.y += Math.sin(elapsedTime * 0.5 + mesh.position.x) * 0.001;
      });
      
      // Smooth mouse following
      target.x += (mouse.x - target.x) * 0.02;
      target.y += (mouse.y - target.y) * 0.02;
      
      // Apply mouse influence to camera
      camera.position.x += (target.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (target.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Initial resize
    handleResize();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      if (currentMount && renderer.domElement) {
        if (currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
        }
      }
      
      // Dispose of resources
      meshes.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => mat.dispose());
          } else {
            mesh.material.dispose();
          }
        }
        scene.remove(mesh);
      });
      
      renderer.dispose();
      scene.remove(ambientLight);
      scene.remove(directionalLight);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: -1
      }} 
    />
  );
}