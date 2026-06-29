<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HUDOverlay from './components/HUDOverlay.vue'
import Navbar from './components/Navbar.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'

const cursorX = ref(0)
const cursorY = ref(0)

gsap.registerPlugin(ScrollTrigger)

const containerRef = ref(null)
const canvasRef = ref(null)
let scene, camera, renderer, animationId
let coreGroup, modulesGroup
let mouseX = 0, mouseY = 0
let targetRotationX = 0, targetRotationY = 0

const handleMouseMove = (e) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

onMounted(() => {
  initThreeJS()
  createScene()
  setupScrollAnimations()
  setupMouseInteraction()
  animate()
  document.addEventListener('mousemove', handleMouseMove)
})

const initThreeJS = () => {
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x0a0a15, 0.02)
  
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 12
  camera.position.y = 2
  
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvasRef.value, 
    alpha: true,
    antialias: true 
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
}

const createScene = () => {
  coreGroup = new THREE.Group()
  scene.add(coreGroup)
  
  modulesGroup = new THREE.Group()
  scene.add(modulesGroup)
  
  createBiomechanicalCore()
  createFloatingModules()
  createNeuralNetwork()
  
  const ambientLight = new THREE.AmbientLight(0x404040, 2)
  scene.add(ambientLight)
  
  const pointLight1 = new THREE.PointLight(0x00f0ff, 2, 50)
  pointLight1.position.set(10, 10, 10)
  scene.add(pointLight1)
  
  const pointLight2 = new THREE.PointLight(0xff2d75, 2, 50)
  pointLight2.position.set(-10, -10, 10)
  scene.add(pointLight2)
  
  const pointLight3 = new THREE.PointLight(0x00ff88, 2, 50)
  pointLight3.position.set(0, 10, -10)
  scene.add(pointLight3)
  
  window.addEventListener('resize', onWindowResize)
}

const createBiomechanicalCore = () => {
  const coreGeometry = new THREE.IcosahedronGeometry(3, 2)
  const coreMaterial = new THREE.MeshPhongMaterial({
    color: 0x0a0a15,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.2,
    shininess: 100,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  })
  const core = new THREE.Mesh(coreGeometry, coreMaterial)
  coreGroup.add(core)
  
  const innerGeometry = new THREE.IcosahedronGeometry(2, 1)
  const innerMaterial = new THREE.MeshPhongMaterial({
    color: 0xff2d75,
    emissive: 0xff2d75,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.6
  })
  const innerCore = new THREE.Mesh(innerGeometry, innerMaterial)
  coreGroup.add(innerCore)
  
  for (let i = 0; i < 3; i++) {
    const ringGeometry = new THREE.TorusGeometry(4 + i * 0.5, 0.05, 16, 100)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0x00f0ff : 0xff2d75,
      transparent: true,
      opacity: 0.6
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 2 + (i * 0.3)
    ring.rotation.y = i * 0.5
    coreGroup.add(ring)
  }
}

const createFloatingModules = () => {
  const moduleData = [
    { position: [8, 5, -5], color: 0x00f0ff, label: 'ROBOTICS' },
    { position: [-8, 3, -8], color: 0xff2d75, label: 'CODING' },
    { position: [6, -6, -6], color: 0x00ff88, label: 'AI_ML' },
    { position: [-7, -4, -7], color: 0xffaa00, label: 'AERO' },
    { position: [0, 8, -10], color: 0x9900ff, label: 'BIOTECH' },
    { position: [-5, 6, 5], color: 0x00f0ff, label: 'DESIGN' },
  ]
  
  moduleData.forEach((data) => {
    const group = new THREE.Group()
    group.position.set(...data.position)
    
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshPhongMaterial({
      color: data.color,
      emissive: data.color,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.7,
      wireframe: true
    })
    const cube = new THREE.Mesh(geometry, material)
    group.add(cube)
    
    const innerGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: data.color,
      emissive: data.color,
      emissiveIntensity: 0.5
    })
    const innerCube = new THREE.Mesh(innerGeometry, innerMaterial)
    group.add(innerCube)
    
    const ringGeometry = new THREE.TorusGeometry(1.5, 0.03, 16, 100)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    group.add(ring)
    
    group.userData = { 
      rotationSpeed: { 
        x: (Math.random() - 0.5) * 0.01, 
        y: (Math.random() - 0.5) * 0.01 
      },
      originalY: data.position[1],
      floatOffset: Math.random() * Math.PI * 2
    }
    
    modulesGroup.add(group)
  })
}

const createNeuralNetwork = () => {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.15
  })
  
  const positions = []
  const moduleCount = modulesGroup.children.length
  
  for (let i = 0; i < moduleCount; i++) {
    for (let j = i + 1; j < moduleCount; j++) {
      if (Math.random() > 0.7) {
        const pos1 = modulesGroup.children[i].position
        const pos2 = modulesGroup.children[j].position
        positions.push(pos1.x, pos1.y, pos1.z)
        positions.push(pos2.x, pos2.y, pos2.z)
      }
    }
  }
  
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const lines = new THREE.LineSegments(geometry, lineMaterial)
  scene.add(lines)
}

const setupScrollAnimations = () => {
  ScrollTrigger.create({
    trigger: '#hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      gsap.to(camera.position, {
        z: 12 - self.progress * 3,
        y: 2 - self.progress,
        duration: 0.3
      })
      gsap.to(coreGroup.rotation, {
        y: self.progress * Math.PI,
        duration: 0.3
      })
      gsap.to(modulesGroup.position, {
        z: -self.progress * 5,
        duration: 0.3
      })
    }
  })
}

const setupMouseInteraction = () => {
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    targetRotationY = mouseX * 0.5
    targetRotationX = mouseY * 0.5
  })
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05
  coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05
  
  modulesGroup.children.forEach((module) => {
    module.rotation.x += module.userData.rotationSpeed.x
    module.rotation.y += module.userData.rotationSpeed.y
    module.position.y = module.userData.originalY + 
      Math.sin(Date.now() * 0.001 + module.userData.floatOffset) * 0.5
  })
  
  const scale = 1 + Math.sin(Date.now() * 0.002) * 0.1
  if (coreGroup.children[1]) {
    coreGroup.children[1].scale.set(scale, scale, scale)
  }
  
  renderer.render(scene, camera)
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onWindowResize)
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  document.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div ref="containerRef" class="relative">
    <div class="cyber-cursor" :style="{ left: cursorX + 'px', top: cursorY + 'px' }"></div>
    <div class="cyber-cursor-dot" :style="{ left: cursorX + 'px', top: cursorY + 'px' }"></div>
    <!-- 3D Canvas - Fixed Background -->
    <canvas ref="canvasRef" class="fixed inset-0 z-0"></canvas>
    
    <!-- HUD Overlay -->
    <HUDOverlay />
    
    <!-- Navigation -->
    <Navbar />
    
    <!-- Main Content -->
    <main class="relative z-10">
      <!-- Hero Section with 3D -->
      <section id="hero-section" class="min-h-screen flex items-center justify-center pt-16">
        <div class="text-center px-4 max-w-5xl mx-auto">
          <div class="inline-block px-4 py-2 border border-neural/50 rounded-full mb-6 bg-deep/50 backdrop-blur">
            <span class="font-mono text-xs text-neural tracking-widest">SYSTEM_STATUS: ONLINE</span>
          </div>
          <h1 class="font-cyber text-5xl md:text-7xl lg:text-8xl font-black chrome-text mb-6 leading-tight">
            NEURAL<br/>CORE<br/>
            <span class="neon-text text-neural">ACTIVATED</span>
          </h1>
          <p class="font-mono text-chrome/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Experience Techfest IIT Bombay through biomechanical integration. 
            Scroll to explore the network.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="#features" class="cyber-btn px-8 py-3 bg-neural text-deep font-cyber font-bold tracking-widest hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]">
              EXPLORE_MODULES
            </a>
            <a href="#about" class="cyber-btn px-8 py-3 border-2 border-bio text-bio font-cyber font-bold tracking-widest hover:bg-bio hover:text-deep">
              SYSTEM_BRIEF
            </a>
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <FeaturesSection />
      
      <!-- About Section -->
      <AboutSection />
      
      <!-- Contact Section -->
      <ContactSection />
      
      <!-- Footer -->
      <footer class="relative py-8 text-center border-t border-neural/20 bg-deep/80 backdrop-blur">
        <p class="font-mono text-sm text-chrome/60">
          &copy; 2026 TECHFEST IIT BOMBAY // NEURAL_CORE_SYSTEM // ALL SYSTEMS OPERATIONAL
        </p>
      </footer>
    </main>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>