<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const bgLayer1 = ref(null); // Furthest back (slowest)
const bgLayer2 = ref(null); // Middle
const fgLayer = ref(null);  // Foreground (fastest)

onMounted(() => {
  // Parallax Animations
  gsap.to(bgLayer1.value, {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });

  gsap.to(bgLayer2.value, {
    yPercent: -40,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });

  gsap.to(fgLayer.value, {
    yPercent: 10, // Moves slightly down to create depth contrast
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<template>
  <section ref="sectionRef" class="relative h-[200vh] bg-black overflow-hidden">
    <!-- Sticky Container for Parallax -->
    <div class="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
      
      <!-- Layer 1: Deep Background (Neon Grid) -->
      <div ref="bgLayer1" class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [perspective:500px] [transform:rotateX(60deg)] origin-top"></div>
      </div>

      <!-- Layer 2: Midground (Cyberpunk Buildings/Silhouettes) -->
      <div ref="bgLayer2" class="absolute inset-0 z-10 flex items-end justify-center opacity-60">
        <!-- Using CSS shapes for buildings to keep it code-only -->
        <div class="w-20 h-60 bg-fuchsia-900 border-t-2 border-fuchsia-500 mx-2"></div>
        <div class="w-32 h-96 bg-purple-900 border-t-2 border-purple-500 mx-2"></div>
        <div class="w-24 h-72 bg-cyan-900 border-t-2 border-cyan-500 mx-2"></div>
        <div class="w-40 h-[500px] bg-fuchsia-900 border-t-2 border-fuchsia-500 mx-2"></div>
        <div class="w-28 h-80 bg-cyan-900 border-t-2 border-cyan-500 mx-2"></div>
      </div>

      <!-- Layer 3: Foreground (Text & UI) -->
      <div ref="fgLayer" class="relative z-20 text-center px-4">
        <h2 class="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]">
          DESCENT INTO THE <span class="text-fuchsia-500">GRID</span>
        </h2>
        <p class="text-lg text-cyan-300 max-w-2xl mx-auto font-mono">
          Experience the future of technology. Scroll deeper to uncover the secrets of Techfest IIT Bombay.
        </p>
      </div>

    </div>
  </section>
</template>