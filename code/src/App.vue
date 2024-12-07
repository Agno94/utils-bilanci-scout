<template>
  <section>
    <NavBar />

    <section class="container">

      <RouterView class="section"/>

      <section class="section-divider">
        <hr />
      </section>

      <footer class="footer">
          <p>
            Creato da Andrea Agnolin
          </p>
          <p class="help">
            Utilizzando:<br />
            * <a href="https://bulma.io/">Bulma</a> by Jeremy Thomas (<a href="http://opensource.org/licenses/mit-license.php">MIT</a> license);<br />
            * <a href="https://vuejs.org/">Vue.js</a> by Evan You (<a href="http://opensource.org/licenses/mit-license.php">MIT</a> license);<br />
            * <a href="https://fontawesome.com/">Font Awesome Free</a>.
          </p>
      </footer>
    </section>
  </section>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>
