<script setup>
const modules = [
  {
    icon: '⚙',
    title: 'ROBOTICS ARENA',
    code: 'MOD_01',
    desc: 'Autonomous machines. Battle bots. Neural-controlled mechs.',
    color: 'neural'
  },
  {
    icon: '◈',
    title: 'CODE WARS',
    code: 'MOD_02',
    desc: '48-hour hackathons. Algorithmic duels. Build the future.',
    color: 'bio'
  },
  {
    icon: '⬢',
    title: 'AI NEXUS',
    code: 'MOD_03',
    desc: 'Deep learning labs. Generative AI showcases.',
    color: 'neural'
  },
  {
    icon: '◉',
    title: 'BIOTECH LAB',
    code: 'MOD_04',
    desc: 'Where biology meets circuitry. Neural interfaces.',
    color: 'bio'
  },
  {
    icon: '▲',
    title: 'AERO DOME',
    code: 'MOD_05',
    desc: 'Drones, rockets, and aerial combat engineering.',
    color: 'neural'
  },
  {
    icon: '◆',
    title: 'DESIGN FORGE',
    code: 'MOD_06',
    desc: 'UI/UX battles, product sprints, creative hackathons.',
    color: 'bio'
  },
]
</script>

<template>
  <section id="features" class="relative py-24 px-6 bg-gradient-to-b from-deep/80 via-steel/50 to-deep/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <div class="inline-block font-mono text-xs text-bio tracking-[0.3em] mb-4">// CORE_MODULES</div>
        <h2 class="font-cyber font-bold text-4xl md:text-6xl chrome-text mb-4">
          AUGMENTATION MODULES
        </h2>
        <p class="font-mono text-chrome/60 max-w-xl mx-auto">
          Select your upgrade path. Each module unlocks technological mastery.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(mod, idx) in modules" 
          :key="idx"
          class="glass-card p-6 hud-bracket group"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="font-mono text-xs text-chrome/40">{{ mod.code }}</span>
            <span 
              class="w-2 h-2 rounded-full animate-pulse"
              :class="mod.color === 'neural' ? 'bg-neural' : 'bg-bio'"
            ></span>
          </div>

          <div 
            class="text-5xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            :class="mod.color === 'neural' ? 'text-neural' : 'text-bio'"
          >
            {{ mod.icon }}
          </div>

          <h3 
            class="font-cyber font-bold text-xl mb-3 tracking-wider"
            :class="mod.color === 'neural' ? 'text-neural' : 'text-bio'"
          >
            {{ mod.title }}
          </h3>

          <p class="font-mono text-sm text-chrome/70 leading-relaxed mb-4">
            {{ mod.desc }}
          </p>

          <a href="#" class="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-chrome/50 group-hover:text-neural transition-colors">
            <span>ACCESS_MODULE</span>
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hud-bracket {
  position: relative;
}
.hud-bracket::before,
.hud-bracket::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 240, 255, 0.3);
  transition: all 0.3s ease;
}
.hud-bracket::before {
  top: -5px;
  left: -5px;
  border-right: none;
  border-bottom: none;
}
.hud-bracket::after {
  bottom: -5px;
  right: -5px;
  border-left: none;
  border-top: none;
}
.hud-bracket:hover::before,
.hud-bracket:hover::after {
  border-color: rgba(0, 240, 255, 0.8);
  width: 30px;
  height: 30px;
}
</style>