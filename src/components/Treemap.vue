<template>
  <div class="treemap">
  </div>
</template>

<script>
import Treemap from '../treemap'

export default {
  name: 'treemap',
  data () {
    return {
    }
  },
  mounted () {
    var treemap = new Treemap('.treemap')
    var data = {'cell': [{'operator': ':', 'ref': 'year.label', 'value': 2013}, {'operator': ':', 'ref': 'titelart.label', 'value': 'Ausgabetitel'}], 'status': 'ok', 'page_size': 500, 'attributes': ['einzelplan.name', 'einzelplan.label'], 'total_cell_count': 28, 'cells': [{'einzelplan.name': 10, 'amount.sum': 4296528900.0, '_count': 643, 'einzelplan.label': 'Bildung, Jugend und Wissenschaft (10)'}, {'einzelplan.name': 39, 'amount.sum': 3458182600.0, '_count': 1830, 'einzelplan.label': 'Amt f\u00fcr Soziales (39)'}, {'einzelplan.name': 29, 'amount.sum': 2644811600.0, '_count': 41, 'einzelplan.label': 'Allgemeine Finanz- und Personalangelegenheiten (29)'}, {'einzelplan.name': 12, 'amount.sum': 1933980800.0, '_count': 696, 'einzelplan.label': 'Stadtentwicklung und Umwelt (12)'}, {'einzelplan.name': 40, 'amount.sum': 1857490200.0, '_count': 1709, 'einzelplan.label': 'Jugendamt (40)'}, {'einzelplan.name': 5, 'amount.sum': 1798786100.0, '_count': 919, 'einzelplan.label': 'Inneres und Sport (05)'}, {'einzelplan.name': 28, 'amount.sum': 1638816000.0, '_count': 39, 'einzelplan.label': 'Zentrale Personalangelegenheiten (28)'}, {'einzelplan.name': 6, 'amount.sum': 793414600.0, '_count': 852, 'einzelplan.label': 'Justiz und Verbraucherschutz (06)'}, {'einzelplan.name': 13, 'amount.sum': 781713600.0, '_count': 184, 'einzelplan.label': 'Wirtschaft, Technologie und Forschung (13)'}, {'einzelplan.name': 11, 'amount.sum': 583094000.0, '_count': 432, 'einzelplan.label': 'Gesundheit und Soziales (11)'}, {'einzelplan.name': 3, 'amount.sum': 543992100.0, '_count': 311, 'einzelplan.label': 'Regierende/r B\u00fcrgermeister/in (03)'}, {'einzelplan.name': 15, 'amount.sum': 493896200.0, '_count': 234, 'einzelplan.label': 'Finanzen (15)'}, {'einzelplan.name': 37, 'amount.sum': 449977100.0, '_count': 2376, 'einzelplan.label': 'Schul- und Sportamt (37)'}, {'einzelplan.name': 59, 'amount.sum': 407506700.0, '_count': 256, 'einzelplan.label': 'Allgemeine Finanzangelegenheiten (59)'}, {'einzelplan.name': 33, 'amount.sum': 291414300.0, '_count': 1849, 'einzelplan.label': 'Bezirksamt - Politisch- Administrativer Bereich - (33)'}, {'einzelplan.name': 42, 'amount.sum': 186680200.0, '_count': 480, 'einzelplan.label': 'Stadtentwicklungsamt (42)'}, {'einzelplan.name': 9, 'amount.sum': 183142000.0, '_count': 226, 'einzelplan.label': 'Arbeit, Integration und Frauen (09)'}, {'einzelplan.name': 47, 'amount.sum': 182069500.0, '_count': 764, 'einzelplan.label': 'Umwelt, Natur (47)'}, {'einzelplan.name': 35, 'amount.sum': 99244900.0, '_count': 590, 'einzelplan.label': 'Amt f\u00fcr B\u00fcrgerdienste (35)'}, {'einzelplan.name': 41, 'amount.sum': 91174800.0, '_count': 489, 'einzelplan.label': 'Gesundheitsamt (41)'}, {'einzelplan.name': 44, 'amount.sum': 80258300.0, '_count': 190, 'einzelplan.label': 'Wohnen (44)'}, {'einzelplan.name': 46, 'amount.sum': 79627500.0, '_count': 489, 'einzelplan.label': 'Planen, Vermessen (46)'}, {'einzelplan.name': 1, 'amount.sum': 39249300.0, '_count': 48, 'einzelplan.label': 'Abgeordnetenhaus (01)'}, {'einzelplan.name': 20, 'amount.sum': 16036600.0, '_count': 33, 'einzelplan.label': 'Rechnungshof (20)'}, {'einzelplan.name': 43, 'amount.sum': 9136500.0, '_count': 232, 'einzelplan.label': 'Umwelt- und Naturschutzamt (43)'}, {'einzelplan.name': 31, 'amount.sum': 8358200.0, '_count': 133, 'einzelplan.label': 'Bezirksverordnetenversammlung (31)'}, {'einzelplan.name': 21, 'amount.sum': 4542900.0, '_count': 65, 'einzelplan.label': 'Beauftragte/r f\u00fcr Datenschutz und Informationsfreiheit (21)'}, {'einzelplan.name': 2, 'amount.sum': 621400.0, '_count': 16, 'einzelplan.label': 'Verfassungsgerichtshof (02)'}], 'order': [['amount.sum', 'desc']], 'aggregates': ['_count', 'amount.sum'], 'page': 1, 'summary': {'amount.sum': 22953746900.0, '_count': 16126}}
    console.log(data)
    treemap.render(data)
  }
}
</script>

<style scoped>
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
</style>
