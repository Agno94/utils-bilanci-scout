<template>
  <div class="box">

    <div class="columns">
      <div class="column is-size-5 has-text-info-dark">
        {{ brancaIncomesData.alias }}
      </div>

      <div class="column is-narrow">
        <button class="button is-link" :disabled="!hasIncomes" @click="downloadAllClicked">
          <span class="icon">
            <faIcon :icon="['fas', 'download']" />
          </span>
          <span>
            Download
          </span>
        </button>
      </div>

      <div class="column is-narrow">
        <button class="button" :disabled="!hasIncomes" @click="active = !active">
          <span v-if="active && hasIncomes">
            Nascondi
          </span>
          <span v-else>
            Mostra
          </span>
        </button>
      </div>
    </div>

    <section class="columns" v-if="hasIncomes">
      <section class="column">
        Statistiche:
      </section>
      <section class="column is-narrow" v-for="stat in stats" :key="stat.label">
        <div class="field has-addons">
          <p class="control">
            <a class="button is-static is-small">
              {{ stat.label }}:
            </a>
          </p>
          <p class="control">
            <a class="button is-info is-static is-light is-small">
              {{ stat.value  }}
            </a>
          </p>
        </div>
      </section>
    </section>

    <p class="has-text-danger is-size-7" v-if="!hasIncomes">
      Nessuna entrata trovata
    </p>

    <section v-else-if="active">

      <section class="columns">
        <section class="column">
          Filtri:
        </section>
        <section class="column is-narrow">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-static is-small">
                Importo
              </a>
            </p>
            <p class="control">
              <input class="input is-small" type="number" placeholder="Euro" v-model="filterForValue">
            </p>
          </div>
        </section>
        <section class="column is-narrow">
          <div class="field has-addons" title="Almeno due lettere">
            <p class="control">
              <a class="button is-static is-small">
                Descrizione
              </a>
            </p>
            <p class="control">
              <input class="input is-small" type="text" placeholder="Almeno due lettere" v-model="filterForDescription">
            </p>
          </div>
        </section>

        <div class="column is-narrow">
          <button class="button is-link is-small" :disabled="!filteredIncomesList || !hasSomeFilterActive" @click="downloadFilteredClicked">
            <span class="icon">
              <faIcon :icon="['fas', 'download']" />
            </span>
            <span>
              Download Filtrati
            </span>
          </button>
        </div>
      </section>

      <p class="has-text-black is-size-6" v-if="!filteredIncomesList || !filteredIncomesList.length">
        Sono state trovare {{ incomesList.length }} entrate relativa a questa branca.
        Ma nessuna soddisfa i filtri da te inseriti
      </p>

      <table class="table" v-else>
        <thead>
          <tr>
            <th>#</th>
            <th>Data1</th>
            <th>Data2</th>
            <th>Importo</th>
            <th>Nota</th>
            <th>Descrizione</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(income, index) in filteredIncomesList" :key="income">
            <th>{{index + 1}}</th>
            <td>{{income.data1}}</td>
            <td>{{income.data2}}</td>
            <td>{{income.value}}</td>
            <td class="long-text">{{income.note}}</td>
            <td class="long-text">{{income.description}}</td>
          </tr>
        </tbody>
      </table>
    </section> 

    <p class="has-text-black is-size-7" v-else>
      Sono state trovare {{ incomesList.length }} entrate relativa a questa branca
    </p>

  </div>

</template>

<script>

export default {
  name: 'EntrateBrancaBox',

  components: {
  },

  props: {
    brancaIncomesData: {
      required: true,
      type: Object,
    }
  },

  data() {
    return {
      active: true,
      filterForValue: null,
      filterForDescription: null
    }
  },

  computed: {

    incomesList({brancaIncomesData}) {
      if (!brancaIncomesData) return []
      return brancaIncomesData.incomes
    },

    hasFilterForDescriptionActive({filterForDescription}) {
      if (!filterForDescription) return false
      return filterForDescription.length >= 2
    },

    hasSomeFilterActive({filterForValue, hasFilterForDescriptionActive}) {
      return filterForValue || hasFilterForDescriptionActive
    },

    filteredIncomesList({ incomesList, filterForValue, filterForDescription }) {
      if (!incomesList || !this.hasSomeFilterActive) return incomesList
      let filteredList = incomesList
      if (filterForValue) {
        filteredList = filteredList.filter(income => income.value == filterForValue)
      }
      if (this.hasFilterForDescriptionActive) {
        let lowerFilter = filterForDescription.toLowerCase()
        filteredList = filteredList.filter(income => income.description.toLowerCase().includes(lowerFilter))
      }
      return filteredList
    },

    hasIncomes({incomesList}) {
      return incomesList.length > 0
    },

    stats({incomesList, filteredIncomesList}) {
      if (!incomesList) return []

      let stats = []
      stats.push({
        label: 'Numero voci totali',
        value: incomesList.length,
      })

      stats.push({
        label: 'Numero voci filtrate',
        value: filteredIncomesList.length,
      })

      if (!filteredIncomesList.length) return stats

      let incomesValues = filteredIncomesList.map(i => i.value)

      stats.push({
        label: 'Max',
        value: Math.max(...incomesValues),
      })

      stats.push({
        label: 'Min',
        value: Math.min(...incomesValues),
      })

      stats.push({
        label: 'Somma',
        value: incomesValues.reduce((a, b) => {return a+b}, 0),
      })

      return stats
    }

  },

  methods: {

    downloadPlain(content, filename, type='text/csv') {

      let blob  = new Blob( [content, ], { type: type, }, )
      let link  = document.createElement('a')

      link.href     = window.URL.createObjectURL(blob)
      link.download = filename.replace(/\s/g, '')

      document.body.appendChild(link)

      link.click()
      link.remove()

    },

    downloadAllClicked() {
      if (!this.hasIncomes) return
      this.download(this.incomesList)
    },

    downloadFilteredClicked() {
      if (!this.hasIncomes) return
      if (!this.hasFilterForDescriptionActive) return
      if (!this.filteredIncomesList) return
      this.download(this.filteredIncomesList)
    },

    download(incomesList) {
      let branca  = this.brancaIncomesData.branca
      let length = incomesList.length - 1

      let header = [
        '#',
        'Data Contabile',
        'Data Valuta',
        'Importo',
        'Nota',
        'Descrizione',
      ].join(';')

      let csv = this.incomesList.reduce( (csv, income, index) => {
        let row = [
          index + 1,
          income.data1,
          income.data2,
          income.value.toLocaleString('it-IT', {useGrouping: false}),
          income.note,
          income.description,
        ].map(v => String(v))

        return index < length
          ? csv + row.join(';') + '\n'
          : csv + row.join(';')
      }, header + '\n')

      let filename  = `entrate_${branca}_${String(+new Date)}.csv`

      this.downloadPlain(csv, filename)

    },

  }

}
</script>

<style scoped>
.long-text {
  word-wrap: anywhere;
}
</style>