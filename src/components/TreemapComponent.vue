<template>
  <div class="treemap-content">
    <div class="controls">
      <div class="hierarchies">
      <a class="btn btn-default" :href="`#${hierq.url}`" v-for="hierq in config['hierarchies']">{{hierq['label']}}</a>
      </div>
      <div class="filters">
        <div class="filter" v-for="(filter, filterName) in config['filters']">
          {{ filterName }}
          <select :onchange="addFilter()" v-model="filters[filterName]">
            <option selected value='' v-if="!filter.default">{{filter.defaultLabel}}</option>
            <option :value="filterValue.value" v-for="filterValue in filter.values">{{filterValue.label}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="treemap">
    </div>
    <table class="table table-condensed">
      <tr>
        <th>Titel</th>
        <th class="num">Betrag</th>
        <th class="num">Anteil</th>
      </tr>
      <tr v-bind:class="{small: cell['_small']}" v-for="cell in data['cells']">
          <td>
          <i :style="`color: ${cell['_color']};`" class="fa fa-square"></i>
          <a v-if="cell['_url']" :href="cell['_url']">{{ cell['_label'] }}</a>
            <span v-if="!cell['_url']">
              {{ cell['_label'] }}
            </span
          </td>
          <td class="num">{{ cell['_value_fmt'] }}</td>
          <td class="num">{{ cell['_percentage_fmt'] }}</td>
        </tr>
      <tr>
        <td colspan="3">
          <span class="pull-right">
            <a class="show-small" href="#"><i class="fa fa-plus-square"></i> kleine Posten anzeigen</a>
            <a class="hide-small" href="#"><i class="fa fa-minus-square"></i> kleine Posten verstecken</a></span>
          </span>
        </td>
      </tr>
      <tr>
        <th>
          Total
        </th>
        <th v-if="data['summary']" class="num">{{ data['summary']['_valueFmt'] }}</th>
        <th class="num">100%</th>
      </tr>
    </table>
  </div>
</template>

<script>
import Treemap from '../treemap'
import { parseURL } from '../utils/urlParser'
import axios from 'axios'
import * as d3 from 'd3'
import * as qs from 'query-string'
import * as accounting from 'accounting'

export default {
  name: 'treemap',

  props: {
    datapackage: '',
    apiurl: ''
  },

  data () {
    return {
      model: {},
      colors: [],
      config: {
        'value': 'Betrag.sum',
        'hierarchies': [
          {
            'datapackageHierarchy': 'administrative_classification',
            'url': 'einzelplan',
            'label': 'Einzelpläne'
          },
          {
            'datapackageHierarchy': 'functional_classification',
            'url': 'funktion',
            'label': 'Funktionen'
          }
        ],
        'filters': {
          'Jahr': {
            'name': 'date_2.Jahr',
            'values': [{'label': 2017, 'value': 2017}, {'label': 2016, 'value': 2016}],
            'type': 'number',
            'default': true,
            'label': 'Jahr'
          },
          'Typ': {
            'name': 'fin_source_Typ.Typ',
            'values': [
              {
                'label': 'Senatsverwaltungen',
                'value': 1
              },
              {
                'label': 'Verfassungsorgane',
                'value': 2
              },
              {
                'label': 'Bezirke',
                'value': 3
              }
            ],
            'type': 'string',
            'default': false,
            'defaultLabel': 'Alle',
            'label': 'Typ'
          }
        }
      },
      selectedHierarchy: {},
      filters: {},
      data: {}
    }
  },

  mounted () {
    // Get default filters values
    this.treemap = new Treemap('.treemap')
    this.colors = [
      '#CF3D1E', '#F15623', '#F68B1F', '#FFC60B', '#DFCE21',
      '#BCD631', '#95C93D', '#48B85C', '#00833D', '#00B48D',
      '#60C4B1', '#27C4F4', '#478DCB', '#3E67B1', '#4251A3',
      '#59449B', '#6E3F7C', '#6A246D', '#8A4873', '#EB0080',
      '#EF58A0', '#C05A89' ]

    window.addEventListener('hashchange', this.updateData)
    this.getURLParameters()
    this.getModel().then(() => {
      this.defaultFilters()
      this.updateData()
    })
  },

  methods: {
    defaultFilters: function () {
      for (var k in this.config.filters) {
        if (this.config.filters[k].default) {
          this.$set(this.filters, k, this.config.filters[k].values[0].value)
        }
      }
    },

    getURLParameters: function () {
      var URLarguments = parseURL(window.location.toString())
      if (URLarguments[0].length === 0) {
        this.$set(this.selectedHierarchy, 'hierarchy', this.config['hierarchies'][0])
        window.location.hash = this.config['hierarchies'][0]['url']
      } else {
        var hierarchy = this.config['hierarchies'].find(function (h) { return h['url'] === URLarguments[0][0] })
        this.$set(this.selectedHierarchy, 'hierarchy', hierarchy)
      }
      this.$set(this.selectedHierarchy, 'levelsParams', URLarguments[0].splice(1))

      var urlFilters = URLarguments[1]
      for (var k in urlFilters) {
        this.filters[k] = urlFilters[k]
      }
    },

    getHierarchies: function () {
      var levelsLength = this.selectedHierarchy['levelsParams'].length
      var hierqQuery = ''

      if (levelsLength > 0) {
        var hierarchy = this.model.hierarchies[this.selectedHierarchy['hierarchy']['datapackageHierarchy']]
        for (var i in hierarchy['levelsP']) {
          if (i < levelsLength) {
            var hierqName = hierarchy['levels'][i]
            hierqQuery += `|${this.model.dimensions[hierqName]['key_ref']}:"${this.selectedHierarchy['levelsParams'][i]}"`
          }
        }
      }
      return hierqQuery
    },

    addFilter: function () {
      var URLarguments = parseURL(window.location.toString())
      window.location.hash = `${URLarguments[0].join('/')}?${qs.stringify(this.filters)}`
    },

    getDrilldown: function () {
      var levelsLength = this.selectedHierarchy['levelsParams'].length
      var label, key
      var hierarchyName = this.selectedHierarchy['hierarchy']['datapackageHierarchy']

      if (levelsLength >= 1) {
        label = this.model.dimensions[this.model.hierarchies[hierarchyName]['levels'][levelsLength]]['label_ref']
        key = this.model.dimensions[this.model.hierarchies[hierarchyName]['levels'][levelsLength]]['key_ref']
      } else {
        label = this.model.dimensions[this.model.hierarchies[hierarchyName]['levels'][0]]['label_ref']
        key = this.model.dimensions[this.model.hierarchies[hierarchyName]['levels'][0]]['key_ref']
      }
      return `${label}|${key}`
    },

    getModel: function () {
      var apiRequestUrl = `${this.apiurl}${this.datapackage}/model`
      return axios.get(apiRequestUrl).then(response => {
        this.model = response.data.model
        var hierarchyName = this.selectedHierarchy['hierarchy']['datapackageHierarchy']
        this.selectedHierarchy['levels'] = this.model['hierarchies'][hierarchyName]['levels']
      })
    },

    updateData: function () {
      this.getURLParameters()
      this.getData()
    },

    getCurrentLevel: function () {
      var hierarchyName = this.selectedHierarchy['hierarchy']['datapackageHierarchy']
      var levelsLength = this.selectedHierarchy['levelsParams'].length
      var levelName = this.model['hierarchies'][hierarchyName]['levels'][levelsLength]
      var levelLabel = this.model['dimensions'][levelName]['label_ref']
      var levelKey = this.model['dimensions'][levelName]['key_ref']
      return [levelLabel, levelKey]
    },

    getFilters: function () {
      var filters = ''
      var filterArgumentQuote
      for (var k in this.filters) {
        if (this.filters[k] !== '') {
          filterArgumentQuote = ''
          if (this.config['filters'][k]['type'] === 'string') {
            filterArgumentQuote = '"'
          }
          filters += `${this.config['filters'][k]['name']}:${filterArgumentQuote}${this.filters[k]}${filterArgumentQuote}|`
        }
      }

      if (filters === '') {
        for (k in this.config['filters']) {
          if (this.config['filters'][k]['default']) {
            var defaultFilter = this.config['filters'][k]['name']
            var defaultFilterValue = this.config['filters'][k]['values'][0]['value']
            filterArgumentQuote = ''
            if (this.config['filters'][k]['type'] === 'string') {
              filterArgumentQuote = '"'
            }
            filters += `${defaultFilter}:${filterArgumentQuote}${defaultFilterValue}${filterArgumentQuote}|`
          }
        }
      }

      return filters
    },

    formatValue: function (value) {
      return accounting.formatMoney(value, '€', 0, '.')
    },

    getData: function ($event) {
      var apiRequestUrl

      var drilldown = this.getDrilldown()
      var hierarchiesFilter = this.getHierarchies()
      var filters = this.getFilters()

      apiRequestUrl = `${this.apiurl}${this.datapackage}/aggregate?cut=${filters}${hierarchiesFilter}&drilldown=${drilldown}&order=${this.config.value}:desc&pagesize=30`

      axios.get(apiRequestUrl).then(response => {
        this.data = response.data

        var color = d3.scale.ordinal().range(this.colors)
        color = color.domain([this.data.total_cell_count, 0])

        var total = 0

        // Remove data with negative values
        var valueDimension = this.config['value']
        this.data['cells'] = this.data['cells'].filter(function (c) { return c[valueDimension] > 0 })

        // Calculate total amount to use it in percentual calculations
        // this.data['summary'] = {}
        this.data['summary']['_value'] = 0
        for (var i in this.data['cells']) {
          total += this.data['cells'][i][this.config['value']]
          this.data['summary']['_value'] = total
        }
        this.data['summary']['_valueFmt'] = this.formatValue(this.data['summary']['_value'])

        for (i in this.data['cells']) {
          var level = this.getCurrentLevel()
          var levelsParams = ''
          var filters = qs.stringify(this.filters)
          if (filters !== '') {
            filters = '?' + filters
          }
          if (this.selectedHierarchy['levelsParams'].length >= 1) {
            levelsParams = `${this.selectedHierarchy['levelsParams'].join('/')}/`
          }
          this.data['cells'][i]['_value'] = this.data['cells'][i][this.config['value']]
          this.data['cells'][i]['_color'] = color(i)
          this.data['cells'][i]['_label'] = this.data['cells'][i][level[0]]
          this.data['cells'][i]['_value_fmt'] = this.formatValue(this.data['cells'][i]['_value'])
          if (this.selectedHierarchy['levelsParams'].length < this.model.hierarchies[this.selectedHierarchy['hierarchy']['datapackageHierarchy']]['levels'].length - 1) {
            this.data['cells'][i]['_url'] = `#${this.selectedHierarchy['hierarchy']['url']}/${levelsParams}${this.data['cells'][i][level[1]]}${filters}`
          }
          this.data['cells'][i]['_percentage'] = this.data['cells'][i]['_value'] / total
          this.data['cells'][i]['_small'] = this.data['cells'][i]['_percentage'] < 0.01
          var percentageFmt = (this.data['cells'][i]['_percentage'] * 100).toFixed(2) + '%'
          percentageFmt = percentageFmt.replace('.', ',')
          this.data['cells'][i]['_percentage_fmt'] = percentageFmt
        }

        this.treemap.render(this.data)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss">

.treemap-content {
  max-width: 1200px;
  margin: auto;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.treemap {
  min-height: 500px;
  overflow: hidden;
}

.node {
  display: block;
  border: 0;
  color: #fff;
  overflow: hidden;
  position: absolute;
  outline: 1px solid #fff;
  font-size: 0.8em;
  text-indent: -1000px;
  padding: 5px;
  box-sizing: border-box;
  z-index: 5;
  font-weight: 300;
  text-shadow: -2px -2px 13px rgba(150, 150, 150, 0.9);
}

.amount {
  color: #fff;
  display: block;
  padding-bottom: 0.2em;
  font-size: 1.5em;
  text-indent: 2px;
}

.node.big {
  text-indent: 2px;
}

.node:hover {
  text-indent: 2px;
  text-decoration: none;
}

.table {
  width: 100%;
  margin-top: 1em;

  td, th {
    font-size: 0.9em;
  }

  td.num, th.num {
    text-align: right;
  }

  .hide-small, .small {
    display: none;
  }

  .label a, .label a:hover {
    color: #fff;
    text-decoration: none;
    font-weight: 400;
  }
}

@font-face {
  font-family: 'fa-minimal';
  src:  url('../assets/fonts/fa-minimal.eot?xss5ew');
  src:  url('../assets/fonts/fa-minimal.eot?xss5ew#iefix') format('embedded-opentype'),
    url('../assets/fonts/fa-minimal.ttf?xss5ew') format('truetype'),
    url('../assets/fonts/fa-minimal.woff?xss5ew') format('woff'),
    url('../assets/fonts/fa-minimal.svg?xss5ew#fa-minimal') format('svg');
  font-weight: normal;
  font-style: normal;
}

.fa {
  display: inline-block;
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'fa-minimal' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fa-check:before {
  content: "\f00c";
}
.fa-info-circle:before {
  content: "\f05a";
}
.fa-square:before {
  content: "\f0c8";
}
.fa-plus-square:before {
  content: "\f0fe";
}
.fa-minus-square:before {
  content: "\f146";
}
.fa-level-up:before {
  content: "\f148";
}

</style>
