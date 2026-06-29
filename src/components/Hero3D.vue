<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const canvasRef = ref(null);
let scene, camera, renderer, core, animationId;
const mouseX = ref(0);
const mouseY = ref(0);

onMounted(() => {
  // Scene Setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Cyberpunk Object (Wireframe Icosahedron)
  const geometry = new THREE.IcosahedronGeometry(2, 1);
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ffff, 
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  core = new THREE.Mesh(geometry, material);
  scene.add(core);

  // Inner glowing core
  const innerGeo = new THREE.IcosahedronGeometry(1.5, 0);
  const innerMat = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true, opacity: 0.5, transparent: true });
  const innerCore = new THREE.Mesh(innerGeo, innerMat);
  core.add(innerCore);

  // Mouse Interaction
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onResize);
  
  animate();
});

const onMouseMove = (event) => {
  mouseX.value = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY.value = -(event.clientY / window.innerHeight) * 2 + 1;
};

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  
  // Smooth rotation based on mouse
  core.rotation.x += (mouseY.value * 0.05 - core.rotation.x) * 0.05;
  core.rotation.y += (mouseX.value * 0.05 - core.rotation.y) * 0.05;
  
  // Continuous slow spin
  core.rotation.z += 0.002;

  renderer.render(scene, camera);
};

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', onResize);
});
</script>

<template>
  <section class="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
    <!-- 3D Canvas Background -->
    <canvas ref="canvasRef" class="absolute inset-0 z-0"></canvas>
    
    <!-- Foreground Text -->
    <div class="relative z-10 text-center px-4">
      <h1 class="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4 glitch-text">
        TECHFEST
      </h1>
      <p class="text-xl md:text-2xl text-cyan-200 font-mono tracking-widest">
        INITIATING CYBERPROTOCOL...
      </p>
      <button class="mt-8 px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.8)]">
        Enter the Grid
      </button>
    </div>
  </section>
</template>

<style scoped>
.glitch-text {
  text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
  animation: glitch 3s infinite;
}
@keyframes glitch {
  0%, 100% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
  20% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
  40% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
}
</style>