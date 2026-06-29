<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)
const systemStats = ref({
  cpu: 0,
  memory: 0,
  network: 0,
  sync: 0
})

onMounted(() => {
  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = (window.scrollY / totalScroll) * 100
    
    // Animate stats
    systemStats.value.cpu = Math.floor(45 + Math.random() * 30)
    systemStats.value.memory = Math.floor(60 + Math.random() * 25)
    systemStats.value.network = Math.floor(70 + Math.random() * 20)
    systemStats.value.sync = Math.floor(85 + Math.random() * 14)
  }
  
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<template>
  <div class="fixed inset-0 z-50 pointer-events-none">
    <!-- Top Bar -->
    <div class="absolute top-0 left-0 right-0 h-16 bg-deep/80 backdrop-blur border-b border-neural/20 flex items-center justify-between px-6">
      <div class="flex items-center gap-4">
        <div class="w-8 h-8 border-2 border-neural rotate-45 flex items-center justify-center">
          <div class="w-2 h-2 bg-bio animate-pulse"></div>
        </div>
        <span class="font-cyber font-bold text-lg tracking-widest chrome-text">NEURAL_CORE_v2.026</span>
      </div>
      
      <div class="hidden md:flex items-center gap-6 font-mono text-xs">
        <div class="flex items-center gap-2">
          <span class="text-chrome/50">CPU:</span>
          <span class="text-neural">{{ systemStats.cpu }}%</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-chrome/50">MEM:</span>
          <span class="text-bio">{{ systemStats.memory }}%</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-chrome/50">NET:</span>
          <span class="text-emerald">{{ systemStats.network }}%</span>
        </div>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div class="absolute top-16 left-0 right-0 h-1 bg-deep/50">
      <div 
        class="h-full bg-gradient-to-r from-neural via-bio to-emerald transition-all duration-300"
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>
    
    <!-- Side Stats (Left) -->
    <div class="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block">
      <div class="space-y-4">
        <div class="glass-card p-3 w-32">
          <div class="font-mono text-[10px] text-chrome/50 mb-1">SYNC_RATE</div>
          <div class="font-cyber text-xl text-neural">{{ systemStats.sync }}%</div>
          <div class="w-full h-1 bg-deep mt-2">
            <div class="h-full bg-neural transition-all" :style="{ width: systemStats.sync + '%' }"></div>
          </div>
        </div>
        
        <div class="glass-card p-3 w-32">
          <div class="font-mono text-[10px] text-chrome/50 mb-1">INTEGRATION</div>
          <div class="font-cyber text-xl text-bio">98.7%</div>
          <div class="w-full h-1 bg-deep mt-2">
            <div class="h-full bg-bio w-[98%]"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Side Stats (Right) -->
    <div class="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block">
      <div class="space-y-2 font-mono text-[10px]">
        <div class="glass-card p-2 text-right">
          <div class="text-chrome/50">COORDINATES</div>
          <div class="text-neural">X: {{ Math.floor(Math.random() * 1000) }}</div>
          <div class="text-bio">Y: {{ Math.floor(Math.random() * 1000) }}</div>
          <div class="text-emerald">Z: {{ Math.floor(Math.random() * 1000) }}</div>
        </div>
        
        <div class="glass-card p-2 text-right">
          <div class="text-chrome/50">NODES_ACTIVE</div>
          <div class="text-neural text-lg">6/6</div>
        </div>
      </div>
    </div>
    
    <!-- Bottom Info -->
    <div class="absolute bottom-6 left-6 right-6 flex justify-between items-end">
      <div class="font-mono text-xs text-chrome/50">
        <div>SCROLL_PROGRESS: {{ Math.floor(scrollProgress) }}%</div>
        <div>RENDER_ENGINE: THREE.JS_r158</div>
      </div>
      
      <div class="hidden md:block text-right font-mono text-xs text-chrome/50">
        <div>MOUSE_INPUT: ACTIVE</div>
        <div>SCROLL_TRIGGER: ENABLED</div>
      </div>
    </div>
    
    <!-- Corner Brackets -->
    <div class="absolute top-20 left-6 w-8 h-8 border-l-2 border-t-2 border-neural/50"></div>
    <div class="absolute top-20 right-6 w-8 h-8 border-r-2 border-t-2 border-neural/50"></div>
    <div class="absolute bottom-20 left-6 w-8 h-8 border-l-2 border-b-2 border-neural/50"></div>
    <div class="absolute bottom-20 right-6 w-8 h-8 border-r-2 border-b-2 border-neural/50"></div>
  </div>
</template>