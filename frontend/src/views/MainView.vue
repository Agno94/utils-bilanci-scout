<template>
  <section>

    <h2 class="subtitle">
      titolo
    </h2>

    <hr/>

    <aside class="menu">
      <p class="menu-label">Titolo</p>
      <ul class="menu-list">
        <li><RouterLink to="/parser">Parser</RouterLink></li>
        <li><RouterLink to="/test">Test</RouterLink></li>
      </ul>
    </aside>

  </section>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
