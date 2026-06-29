<script setup>
const timeline = [
  { year: '2026', title: 'THE SINGULARITY', desc: 'Techfest reaches new heights with 50,000+ participants.' },
  { year: '2010', title: 'FIRST CONTACT', desc: 'Techfest IIT Bombay begins as Asia\'s largest tech festival.' },
  { year: '2000', title: 'GENESIS', desc: 'A small group of engineers dream of a tech festival.' },
]
</script>

<template>
  <section id="about" class="relative py-24 px-6 bg-gradient-to-b from-deep/80 to-steel/30 backdrop-blur-sm">
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div class="font-mono text-xs text-bio tracking-[0.3em] mb-4">// SYSTEM_BRIEF</div>
          <h2 class="font-cyber font-bold text-4xl md:text-5xl chrome-text mb-6 leading-tight">
            WHERE HUMAN MEETS <span class="neon-text text-neural">MACHINE</span>
          </h2>
          <p class="font-mono text-chrome/70 leading-relaxed mb-4">
            Techfest IIT Bombay is more than a festival — it's a <span class="text-bio">neural network</span> 
            of innovation, connecting the brightest minds across continents.
          </p>
          <p class="font-mono text-chrome/70 leading-relaxed mb-8">
            For three days every year, the campus transforms into a living organism of technology.
          </p>

          <div class="grid grid-cols-2 gap-4">
            <div class="glass-card p-4">
              <div class="font-cyber font-bold text-3xl text-neural mb-1">15+</div>
              <div class="font-mono text-xs text-chrome/60">COUNTRIES</div>
            </div>
            <div class="glass-card p-4">
              <div class="font-cyber font-bold text-3xl text-bio mb-1">₹2CR+</div>
              <div class="font-mono text-xs text-chrome/60">PRIZE POOL</div>
            </div>
          </div>
        </div>

        <div class="relative pl-8 border-l-2 border-neural/30">
          <div 
            v-for="(item, idx) in timeline" 
            :key="idx"
            class="relative mb-10 last:mb-0"
          >
            <div class="absolute -left-[41px] top-1 w-4 h-4 bg-deep border-2 border-neural rounded-full">
              <div class="absolute inset-1 bg-neural rounded-full animate-pulse"></div>
            </div>

            <div class="font-cyber font-bold text-2xl text-neural mb-1">{{ item.year }}</div>
            <div class="font-cyber font-bold text-lg text-chrome mb-2 tracking-wider">{{ item.title }}</div>
            <p class="font-mono text-sm text-chrome/60 leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>