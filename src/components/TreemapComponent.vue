<template>
  <div>
  <div class="treemap">
  </div>
  </div>
</template>

<script>
import Treemap from '../treemap'
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
      colors: [],
      config: {
        'value': 'Betrag.sum',
        'label': 'functional_classification_3.Oberfunktionsbezeichnung',
        'level': 'functional_classification_3.Oberfunktion'
      }
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
    window.addEventListener('hashchange', this.getData)

    this.getData()
  },
  methods: {
    getData: function ($event) {
      var apiRequestUrl, level
      if ($event) {
        // Parse hash arguments
        level = $event['newURL'].split('#')[1]
        console.log('LEVEL', level, !level, level === '')
      }

      if (!level || level === '/' || level === '') {
        apiRequestUrl = `${this.apiurl}${this.datapackage}/aggregate?cut=date_2.Jahr:2017&drilldown=${this.config.label}|${this.config.level}&order=${this.config.value}:desc&pagesize=30`
      } else {
        apiRequestUrl = `${this.apiurl}${this.datapackage}/aggregate?cut=date_2.Jahr:2017|${this.config.level}:"${level}"&drilldown=${this.config.label}|${this.config.level}"&order=${this.config.value}:desc&pagesize=30`
      }

      console.log(apiRequestUrl)
      axios.get(apiRequestUrl).then(response => {
        console.log(response)
        this.data = response.data

        var color = d3.scale.ordinal().range(this.colors)
//        var rootColor = d3.rgb(this.colors[0])
//        color = color.interpolate(d3.interpolateRgb)
//        color = color.range([rootColor.brighter(), rootColor.darker().darker()])
        color = color.domain([this.data.total_cell_count, 0])

        for (var i in this.data['cells']) {
          this.data['cells'][i]['_value'] = this.data['cells'][i][this.config['value']]
          this.data['cells'][i]['_color'] = color(i)
          this.data['cells'][i]['_label'] = this.data['cells'][i][this.config['label']]
          this.data['cells'][i]['_url'] = '#' + this.data['cells'][i][this.config['level']]
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
}

.node.big {
  text-indent: 2px;
}

.node:hover {
  text-indent: 2px;
  text-decoration: none;
}


</style>
