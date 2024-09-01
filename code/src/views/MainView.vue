<template>
  <section>
    <hr/>

    <h2 class="subtitle">
      Carica un file (formato CSV, i.e. Comma Separated Values) e clicca <strong>Processa</strong>
    </h2>

    <section class="columns">
      <section class="column">

        <div class="file is-fullwidth">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              name="csv"
              @change="fileChange"
            >
            <span class="file-cta">
              <span class="file-icon">
                <faIcon :icon="['fas', 'cloud-upload']" />
              </span>
              <span class="file-label">
                Scegli un file…
              </span>
            </span>
            <span class="file-name" v-if="filename">
              {{ filename }}
            </span>
            <span class="file-name has-text-grey-light" v-else>
              ad esempio export.xls
            </span>
          </label>
        </div>
      </section>
      <section class="column is-narrow">

        <button class="button is-link" :disabled="!hasFile" @click="processInput">
          <span class="icon">
            <faIcon :icon="['fas', 'gears']" />
          </span>
          <span>
            Processa
          </span>
        </button>
      </section>
    </section>

    <div class="has-text-centered" v-if="loading">
      <div class="loading-ring">
      </div>
    </div>

    <article class="message is-danger" v-else-if="error">
      <div class="message-header">
        <p>{{ errorMessage }}</p>
      </div>
      <div class="message-body">
        {{ error }}
      </div>
    </article>

    <section v-else>

      <p class="help mb-3" v-if="hasFile">
        Caricato file {{ filename }} di {{ fileContentLenght }} caratteri
      </p>

      <EntrateBrancaBox
        v-for="brancaIncomes in brancaSplittedIncomesList"
        :key="brancaIncomes.branca"
        :brancaIncomesData="brancaIncomes"
      />

    </section>

  </section>
</template>

<script>
import EntrateBrancaBox from '@/components/EntrateBrancaBox.vue'

import readFile from '@/include/readFile.js'

export default {
  name: 'MainPage',

  components: {
    EntrateBrancaBox,
  },

  data() {
    return {
      uploading: false,
      running: false,
      hasProcessedData: false,

      fileContent : null,
      filename : null,

      error: null,
      errorMessage: null,

      data: [],

      branche: [
        {
          data: "lc",
          alias: "L/C",
          regex: /[lL][/]*[cC][ ]+/,
        },
        {
          data: "eg",
          alias: "E/G",
          regex: /[eE][/]*[gG][ ]+/,
        },
        {
          data: "rs",
          alias: "R/S",
          regex: /[rR][/]*[Ss][ ]+/,
        },
        {
          data: "capi",
          alias: "Capi",
          regex: /[Cc][aA][pP][iI][ ]+/,
        },
      ]
    }
  },

  computed: {

    loading({uploading, running}) {
      return uploading || running
    },

    fileContentLenght({ fileContent }) {
      if (!fileContent) return 0
      return fileContent.length
    },

    hasFile({ fileContentLenght }) {
      return fileContentLenght && (fileContentLenght > 0)
    },

    brancaSplittedIncomesList({ data }) {
      if (!data || !data.length) return []
      let branche = this.branche
      let dataSplittedByBranca = {}
      branche.forEach( branca => {
        dataSplittedByBranca[branca.data] = {
          branca: branca.data,
          alias: branca.alias,
          incomes: [],
        }
      })
      dataSplittedByBranca.unknown = {
        branca: null,
        alias: "Unknown",
        incomes: [],
      }

      data.forEach( income => {
        let description = income.description
        for (const branca of branche) {
          let indexOfBranca = description.search(branca.regex)
          if (indexOfBranca != -1) {
            income.note = description.slice(indexOfBranca).replace(branca.regex, '')
            income.descrition = description.slice(0,indexOfBranca)
            dataSplittedByBranca[branca.data].incomes.push(income)
            return
          }
        }
        dataSplittedByBranca.unknown.incomes.push(income)
      })

      let brancaSplittedIncomesList = []
      Object.keys(dataSplittedByBranca).forEach(key => {
        brancaSplittedIncomesList.push(dataSplittedByBranca[key])
      })

      return brancaSplittedIncomesList
    }

  },

  methods: {

    fileChange(event) {
      this.fileContent = null
      this.error = null
      this.filename = null

      const files = event.target.files
      if (!files || !files.length) return
      const file = files[0]
      if (!file) return

      this.filename = file.name
      this.uploading = true
      readFile(file)
        .then((fileContent) => {
          this.fileContent = fileContent
        })
        .catch((e) => {
          this.errorMessage = 'Errore caricamento file'
          this.error = e
        })
        .then(() => {
          this.uploading = false
        })
    },

    processInput() {
      if (!this.hasFile) return
      this.data = []

      try {
        this.parseCSV(this.fileContent)
      } catch (e) {
        this.errorMessage = 'Errore processando file'
        this.error = e
      }
    },

    parseCSV(fileContent) {
      let allRows = fileContent.split(/\r?\n|\r/)
      let parsedData = allRows
        .map(row => {
          let rowCells = row.split('\t')
          console.log()
          let valueStr = (rowCells[2] || '')
            .replace(/[^0-9\\.\\,-]*/g, '')
            .replace(',', '.')
          return {
            data1: rowCells[0],
            data2: rowCells[1],
            value: parseFloat(valueStr),
            description: rowCells[3],
          }
        })
        .filter((rowData, index) => {
          if (index < 1) return false
          if (!rowData.description) return false
          if (rowData.value <= 0) return false
          return true
        })

      this.data = parsedData
    },

  },

}
</script>

<style lang="scss" scoped>
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
