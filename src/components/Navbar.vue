<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
const links = [
  { name: 'HOME', href: '#hero-section' },
  { name: 'MODULES', href: '#features' },
  { name: 'BRIEF', href: '#about' },
  { name: 'LINK', href: '#contact' },
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-deep/80 backdrop-blur-md border-b border-neural/20">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="#hero-section" class="flex items-center gap-2 group">
        <div class="w-8 h-8 border-2 border-neural rotate-45 group-hover:rotate-[225deg] transition-transform duration-500 flex items-center justify-center">
          <div class="w-2 h-2 bg-bio animate-pulse"></div>
        </div>
        <span class="font-cyber font-bold text-lg tracking-widest chrome-text">NEURAL_CORE</span>
      </a>

      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in links" :key="link.name">
          <a 
            :href="link.href"
            class="font-mono text-sm tracking-wider text-chrome/70 hover:text-neural transition-colors relative group"
          >
            {{ link.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-neural group-hover:w-full transition-all duration-300"></span>
          </a>
        </li>
      </ul>

      <button 
        class="hidden md:block cyber-btn px-5 py-2 border border-neural text-neural font-mono text-sm tracking-widest hover:bg-neural hover:text-deep"
      >
        JACK_IN
      </button>

      <button @click="menuOpen = !menuOpen" class="md:hidden text-neural">
        <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <div v-if="menuOpen" class="md:hidden bg-deep/95 border-t border-neural/20">
      <ul class="flex flex-col p-6 gap-4">
        <li v-for="link in links" :key="link.name">
          <a @click="menuOpen = false" :href="link.href" class="block font-mono text-chrome/70 hover:text-neural">
            &gt; {{ link.name }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>