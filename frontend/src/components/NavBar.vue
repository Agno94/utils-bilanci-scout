<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/">
        <img src="/favicon.png">
      </RouterLink>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="mainNavBar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="mainNavBar" class="navbar-menu is-active">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/parser">Parser Entrate</RouterLink>

        <RouterLink class="navbar-item" to="/test">Test Tool Bilancio</RouterLink>

        <!-- <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item is-selected">
              About
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Contact
            </a>
          </div>
        </div> -->
      </div>

      <div class="navbar-end">
        <!-- <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div> -->
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
