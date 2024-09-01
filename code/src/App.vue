<template>
  <section class="container">

    <section class="section is-small pb-1">
      <h1 class="title">Parser Entrate C.C. Scout</h1>
    </section>

    <!-- <RouterLink to="/">Home</RouterLink> -->

    <RouterView class="section pt-0"/>

    <section class="section-divider">
      <hr />
    </section>

    <footer class="footer">
      <div class="content">
        <p>
          Creato da Andrea Agnolin
        </p>
        <p class="help">
          Utilizzando:<br />
          * <a href="https://bulma.io/">Bulma</a> by Jeremy Thomas (<a href="http://opensource.org/licenses/mit-license.php">MIT</a> license);<br />
          * <a href="https://vuejs.org/">Vue.js</a> by Evan You (<a href="http://opensource.org/licenses/mit-license.php">MIT</a> license);<br />
          * <a href="https://fontawesome.com/">Font Awesome Free</a>.
        </p>
      </div>
    </footer>
  </section>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
