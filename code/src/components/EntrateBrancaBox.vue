<template>
  <div class="box">

    <div class="columns">
      <div class="column is-size-5 has-text-info-dark">
        {{ brancaIncomesData.alias }}
      </div>

      <div class="column is-narrow">
        <button class="button is-link" :disabled="!hasIncomes" @click="downloadClicked">
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

    <p class="has-text-danger is-size-7" v-if="!hasIncomes">
      Nessuna entrata trovata
    </p>

    <table class="table" v-else-if="active">
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
        <tr v-for="(income, index) in incomesList" :key="income">
          <th>{{index + 1}}</th>
          <td>{{income.data1}}</td>
          <td>{{income.data2}}</td>
          <td>{{income.value}}</td>
          <td>{{income.note}}</td>
          <td>{{income.description}}</td>
        </tr>
      </tbody>
    </table>

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
    }
  },

  computed: {

    incomesList({brancaIncomesData}) {
      if (!brancaIncomesData) return []
      return brancaIncomesData.incomes
    },

    hasIncomes({incomesList}) {
      return incomesList.length > 0
    },

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

    downloadClicked() {
      if (!this.hasIncomes) return
      let incomesList  = this.incomesList
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
          income.value,
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
