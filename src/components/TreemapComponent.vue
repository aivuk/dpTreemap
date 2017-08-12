<template>
  <div>
  <div class="treemap">
  </div>
  </div>
</template>

<script>
import Treemap from '../treemap'
import { parseURL } from '../utils/urlParser'
import axios from 'axios'
import * as d3 from 'd3'

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
        'hierarquies': ['administrative_classification', 'economic_classification']
      },
      selectedHierarchy: {},
      query: {}
    }
  },
  mounted () {
    this.treemap = new Treemap('.treemap')
    this.colors = [
      '#CF3D1E', '#F15623', '#F68B1F', '#FFC60B', '#DFCE21',
      '#BCD631', '#95C93D', '#48B85C', '#00833D', '#00B48D',
      '#60C4B1', '#27C4F4', '#478DCB', '#3E67B1', '#4251A3',
      '#59449B', '#6E3F7C', '#6A246D', '#8A4873', '#EB0080',
      '#EF58A0', '#C05A89' ]

    window.addEventListener('hashchange', this.updateData)
    this.getURLParameters()
    this.getModel().then(() => this.updateData())
  },
  methods: {
    getURLParameters: function () {
      var URLarguments = parseURL(window.location.toString())
      console.log('URL', window.location.toString(), URLarguments)
      if (URLarguments[0].length === 0) {
        this.selectedHierarchy = { 'name': this.config['hierarquies'][0] }
        window.location.hash = this.config['hierarquies'][0]
      } else {
        this.selectedHierarchy = { 'name': URLarguments[0] }
      }
      this.selectedHierarchy['levelsParams'] = URLarguments[0].splice(1)
    },
    getHierarquies: function () {
      var levelsLength = this.selectedHierarchy['levelsParams'].length
      var hierqQuery = ''

      if (levelsLength > 0) {
        for (var i in this.model.hierarchies[this.selectedHierarchy['name']]['levels']) {
          if (i < levelsLength) {
            var hierqName = this.model.hierarchies[this.selectedHierarchy['name']]['levels'][i]
            hierqQuery += `|${this.model.dimensions[hierqName]['key_ref']}:"${this.selectedHierarchy['levelsParams'][i]}"`
          }
        }
      }

      return hierqQuery
    },
    getDrilldown: function () {
      var levelsLength = this.selectedHierarchy['levelsParams'].length
      var label, key
      console.log(this.selectedHierarchy)

      if (levelsLength >= 1) {
        label = this.model.dimensions[this.model.hierarchies[this.selectedHierarchy['name']]['levels'][levelsLength]]['label_ref']
        key = this.model.dimensions[this.model.hierarchies[this.selectedHierarchy['name']]['levels'][levelsLength]]['key_ref']
      } else {
        label = this.model.dimensions[this.model.hierarchies[this.selectedHierarchy['name']]['levels'][0]]['label_ref']
        key = this.model.dimensions[this.model.hierarchies[this.selectedHierarchy['name']]['levels'][0]]['key_ref']
      }
      return `${label}|${key}`
    },
    getModel: function () {
      var apiRequestUrl = `${this.apiurl}${this.datapackage}/model`
      return axios.get(apiRequestUrl).then(response => {
        console.log(response.data.model)
        this.model = response.data.model
        this.selectedHierarchy['levels'] = this.model['hierarchies'][this.selectedHierarchy['name']]['levels']
      })
    },
    updateData: function () {
      this.getURLParameters()
      this.getData()
    },
    getCurrentLevel: function () {
      var levelsLength = this.selectedHierarchy['levelsParams'].length
      var levelName = this.model['hierarchies'][this.selectedHierarchy['name']]['levels'][levelsLength]
      var levelLabel = this.model['dimensions'][levelName]['label_ref']
      var levelKey = this.model['dimensions'][levelName]['key_ref']
      return [levelLabel, levelKey]
    },
    getData: function ($event) {
      var apiRequestUrl

      var drilldown = this.getDrilldown()
      var hierarquiesFilter = this.getHierarquies()

      apiRequestUrl = `${this.apiurl}${this.datapackage}/aggregate?cut=date_2.Jahr:2017${hierarquiesFilter}&drilldown=${drilldown}&order=${this.config.value}:desc&pagesize=30`

      axios.get(apiRequestUrl).then(response => {
        this.data = response.data

        var color = d3.scale.ordinal().range(this.colors)
        color = color.domain([this.data.total_cell_count, 0])

        for (var i in this.data['cells']) {
          // console.log(this.data['cells'][i])
          var level = this.getCurrentLevel()
          var levelsParams = ''
          if (this.selectedHierarchy['levelsParams'].length >= 1) {
            levelsParams = `${this.selectedHierarchy['levelsParams'].join('/')}/`
          }
          this.data['cells'][i]['_value'] = this.data['cells'][i][this.config['value']]
          this.data['cells'][i]['_color'] = color(i)
          this.data['cells'][i]['_label'] = this.data['cells'][i][level[0]]
          this.data['cells'][i]['_url'] = `#${this.selectedHierarchy['name']}/${levelsParams}${this.data['cells'][i][level[1]]}`
          // cell._current_key = cell[site.keyrefs[dimension]]
          // dimension = dimension.split('.')[0]
          // cell._current_label = cell[site.labelrefs[dimension]]
          // cell._current_key = cell[site.keyrefs[dimension]]
          // cell._value = cell[site.aggregate]
          // cell._value_fmt = OSDE.amount(cell._value)
          // cell._percentage = cell[site.aggregate] / data.summary[site.aggregate]
          // cell._small = cell._percentage < 0.01
          // cell._percentage_fmt = (cell._percentage * 100).toFixed(2) + '%'
          // cell._percentage_fmt = cell._percentage_fmt.replace('.', ',')
        }

        this.treemap.render(this.data)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style >
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


</style>
