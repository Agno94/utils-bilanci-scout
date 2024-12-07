<template>
  <section>
    <h2 class="subtitle">
      Test integrazione tool bilancio
    </h2>

    <div class="field">
      <label class="label">Codice censimento</label>
      <div class="control">
        <input class="input" type="text" v-model="testUserName" placeholder="Codice Censimento">
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" v-model="testPassword" placeholder="Password">
      </div>
    </div>

    <button class="button is-link block" @click="loginTest" :disabled="loading">
      login Test
    </button>

    <div class="has-text-centered" v-if="loading">
      <div class="loading-ring">
      </div>
    </div>

    <article class="message is-danger" v-else-if="requestError">
      <div class="message-header">
        <p>requestErrore</p>
      </div>
      <div class="message-body">
        {{ requestError }}
      </div>
    </article>

    <section v-else-if="response" class="block">
      <div class="box block" style="border: 1px #26b solid;">
        {{ response.username }}<br/>
        <div class="box block" style="border: 1px #462 solid;" v-for="incarico in response.userInfo.incarichiSocio">
          tipo incarico: {{  incarico.tipoIncarico }}<br/>
          accesso: {{  incarico.accessoTipo }}<br/>
          unità: {{  incarico.codiceUnita }}<br/>
          gruppo: {{ incarico.dati.nome }} ({{ incarico.dati.ord }})
          <div class="box" v-for="unita in incarico.dati.storicoUnita" style="border: 1px #882 solid;">
            {{ unita }}
          </div>
        </div>
      </div>
    </section>

  </section>
</template>

<script>

async function test({ username, password}) {
  const data = await fetch(`${import.meta.env.VITE_AGESCI_TOOL_URL}login`, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  const dataJson = await data.json()
  return dataJson
}

export default {
  name: 'TestToolBilancioPage',

  data() {
    return {
      sendingTest: false,
      response: null,
      requestError: null,
      testPassword: null,
      testUserName: null,
    }
  },

  computed: {

    loading({sendingTest}) {
      return sendingTest
    },

  },

  methods: {

    loginTest() {
      this.sendingTest = true
      this.requestError = null
      test({username: this.testUserName, password: this.testPassword})
        .then((data) => {
          console.log('data', data)
          if (!data.username) {
            console.log('login failed: ', data)
            throw new Error('Login Failed')
          }
          this.response = data
        })
        .catch((e) => {
          console.log('requestError', e)
          this.requestError = e
        })
        .then(() => {this.sendingTest = false})
      return
    },

  },

}
</script>

<style scoped>
.loading-wrapper {
  .is-spinning {
    float: left;
  }

}

.loading-ring {
  display: inline-block;
  width: 70pt;
  height: 70pt;
}
.loading-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 1px;
  border-radius: 50%;
  border: 6px solid #888;
  border-color: #888 transparent #888 transparent;
  animation: loading 1.2s linear infinite;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
