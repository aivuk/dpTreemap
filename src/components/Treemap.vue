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
    var data = {'total_cell_count': 28, 'cells': [{'administrative_classification_2.Einzelplan': '10', 'administrative_classification_2.Einzelplanbezeichnung': 'Bildung,  Jugend und Wissenschaft', '_count': 628, 'Betrag.sum': 5247667600, '_current_label': 'Bildung,  Jugend und Wissenschaft', '_current_key': '10', '_value': 5247667600, '_value_fmt': '€5.247.667.600', '_percentage': 1, '_small': false, '_percentage_fmt': '100, 00%', '_url': '#einzelplan/administrative_classification_2: 10', '_color': '#CF3D1E'}, {'administrative_classification_2.Einzelplan': '29', 'administrative_classification_2.Einzelplanbezeichnung': 'Allgemeine Finanz- und Personalangelegenheiten', '_count': 77, 'Betrag.sum': 4137790900, '_current_label': 'Allgemeine Finanz- und Personalangelegenheiten', '_current_key': '29', '_value': 4137790900, '_value_fmt': '€4.137.790.900', '_percentage': 0.7885009523087934, '_small': false, '_percentage_fmt': '78, 85%', '_url': '#einzelplan/administrative_classification_2: 29', '_color': '#F15623'}, {'administrative_classification_2.Einzelplan': '39', 'administrative_classification_2.Einzelplanbezeichnung': 'Amt für Soziales', '_count': 1843, 'Betrag.sum': 3943884200, '_current_label': 'Amt für Soziales', '_current_key': '39', '_value': 3943884200, '_value_fmt': '€3.943.884.200', '_percentage': 0.7515499266759961, '_small': false, '_percentage_fmt': '75, 15%', '_url': '#einzelplan/administrative_classification_2: 39', '_color': '#F68B1F'}, {'administrative_classification_2.Einzelplan': '40', 'administrative_classification_2.Einzelplanbezeichnung': 'Jugendamt', '_count': 1415, 'Betrag.sum': 2336095100, '_current_label': 'Jugendamt', '_current_key': '40', '_value': 2336095100, '_value_fmt': '€2.336.095.100', '_percentage': 0.445168268660919, '_small': false, '_percentage_fmt': '44, 52%', '_url': '#einzelplan/administrative_classification_2: 40', '_color': '#FFC60B'}, {'administrative_classification_2.Einzelplan': '5', 'administrative_classification_2.Einzelplanbezeichnung': 'Inneres und Sport', '_count': 925, 'Betrag.sum': 2152967000, '_current_label': 'Inneres und Sport', '_current_key': '5', '_value': 2152967000, '_value_fmt': '€2.152.967.000', '_percentage': 0.41027122220927253, '_small': false, '_percentage_fmt': '41, 03%', '_url': '#einzelplan/administrative_classification_2: 5', '_color': '#DFCE21'}, {'administrative_classification_2.Einzelplan': '12', 'administrative_classification_2.Einzelplanbezeichnung': 'Stadtentwicklung und Umwelt', '_count': 749, 'Betrag.sum': 2116265700, '_current_label': 'Stadtentwicklung und Umwelt', '_current_key': '12', '_value': 2116265700, '_value_fmt': '€2.116.265.700', '_percentage': 0.4032773912737918, '_small': false, '_percentage_fmt': '40, 33%', '_url': '#einzelplan/administrative_classification_2: 12', '_color': '#BCD631'}, {'administrative_classification_2.Einzelplan': '6', 'administrative_classification_2.Einzelplanbezeichnung': 'Justiz und Verbraucherschutz', '_count': 849, 'Betrag.sum': 921739700, '_current_label': 'Justiz und Verbraucherschutz', '_current_key': '6', '_value': 921739700, '_value_fmt': '€921.739.700', '_percentage': 0.1756475009964427, '_small': false, '_percentage_fmt': '17, 56%', '_url': '#einzelplan/administrative_classification_2: 6', '_color': '#95C93D'}, {'administrative_classification_2.Einzelplan': '11', 'administrative_classification_2.Einzelplanbezeichnung': 'Gesundheit und Soziales', '_count': 427, 'Betrag.sum': 917155900, '_current_label': 'Gesundheit und Soziales', '_current_key': '11', '_value': 917155900, '_value_fmt': '€917.155.900', '_percentage': 0.17477400817079192, '_small': false, '_percentage_fmt': '17, 48%', '_url': '#einzelplan/administrative_classification_2: 11', '_color': '#48B85C'}, {'administrative_classification_2.Einzelplan': '13', 'administrative_classification_2.Einzelplanbezeichnung': 'Wirtschaft,  Technologie und Forschung', '_count': 187, 'Betrag.sum': 774322600, '_current_label': 'Wirtschaft,  Technologie und Forschung', '_current_key': '13', '_value': 774322600, '_value_fmt': '€774.322.600', '_percentage': 0.14755557307021505, '_small': false, '_percentage_fmt': '14, 76%', '_url': '#einzelplan/administrative_classification_2: 13', '_color': '#00833D'}, {'administrative_classification_2.Einzelplan': '3', 'administrative_classification_2.Einzelplanbezeichnung': 'Regierende/r Bürgermeister/in', '_count': 326, 'Betrag.sum': 634070400, '_current_label': 'Regierende/r Bürgermeister/in', '_current_key': '3', '_value': 634070400, '_value_fmt': '€634.070.400', '_percentage': 0.12082899458037319, '_small': false, '_percentage_fmt': '12, 08%', '_url': '#einzelplan/administrative_classification_2: 3', '_color': '#00B48D'}, {'administrative_classification_2.Einzelplan': '15', 'administrative_classification_2.Einzelplanbezeichnung': 'Finanzen  ', '_count': 257, 'Betrag.sum': 481631400, '_current_label': 'Finanzen  ', '_current_key': '15', '_value': 481631400, '_value_fmt': '€481.631.400', '_percentage': 0.09178008911997398, '_small': false, '_percentage_fmt': '9, 18%', '_url': '#einzelplan/administrative_classification_2: 15', '_color': '#60C4B1'}, {'administrative_classification_2.Einzelplan': '27', 'administrative_classification_2.Einzelplanbezeichnung': 'Zuweisungen an und Programme für die Bezirke', '_count': 50, 'Betrag.sum': 470627000, '_current_label': 'Zuweisungen an und Programme für die Bezirke', '_current_key': '27', '_value': 470627000, '_value_fmt': '€470.627.000', '_percentage': 0.08968308129882312, '_small': false, '_percentage_fmt': '8, 97%', '_url': '#einzelplan/administrative_classification_2: 27', '_color': '#27C4F4'}, {'administrative_classification_2.Einzelplan': '33', 'administrative_classification_2.Einzelplanbezeichnung': 'Bezirksamt - Politisch-Administrativer Bereich -', '_count': 1898, 'Betrag.sum': 435526100, '_current_label': 'Bezirksamt - Politisch-Administrativer Bereich -', '_current_key': '33', '_value': 435526100, '_value_fmt': '€435.526.100', '_percentage': 0.08299422394817843, '_small': false, '_percentage_fmt': '8, 30%', '_url': '#einzelplan/administrative_classification_2: 33', '_color': '#478DCB'}, {'administrative_classification_2.Einzelplan': '37', 'administrative_classification_2.Einzelplanbezeichnung': 'Schul- und Sportamt', '_count': 1280, 'Betrag.sum': 422334300, '_current_label': 'Schul- und Sportamt', '_current_key': '37', '_value': 422334300, '_value_fmt': '€422.334.300', '_percentage': 0.08048038332305957, '_small': false, '_percentage_fmt': '8, 05%', '_url': '#einzelplan/administrative_classification_2: 37', '_color': '#3E67B1'}, {'administrative_classification_2.Einzelplan': '45', 'administrative_classification_2.Einzelplanbezeichnung': 'Allgemeine Finanzangelegenheiten', '_count': 246, 'Betrag.sum': 334837700, '_current_label': 'Allgemeine Finanzangelegenheiten', '_current_key': '45', '_value': 334837700, '_value_fmt': '€334.837.700', '_percentage': 0.06380695682782957, '_small': false, '_percentage_fmt': '6, 38%', '_url': '#einzelplan/administrative_classification_2: 45', '_color': '#4251A3'}, {'administrative_classification_2.Einzelplan': '38', 'administrative_classification_2.Einzelplanbezeichnung': 'Straßen- und Grünflächenamt', '_count': 859, 'Betrag.sum': 258668100, '_current_label': 'Straßen- und Grünflächenamt', '_current_key': '38', '_value': 258668100, '_value_fmt': '€258.668.100', '_percentage': 0.04929201308406043, '_small': false, '_percentage_fmt': '4, 93%', '_url': '#einzelplan/administrative_classification_2: 38', '_color': '#59449B'}, {'administrative_classification_2.Einzelplan': '9', 'administrative_classification_2.Einzelplanbezeichnung': 'Arbeit,  Integration und Frauen', '_count': 232, 'Betrag.sum': 183757200, '_current_label': 'Arbeit,  Integration und Frauen', '_current_key': '9', '_value': 183757200, '_value_fmt': '€183.757.200', '_percentage': 0.03501692828257644, '_small': false, '_percentage_fmt': '3, 50%', '_url': '#einzelplan/administrative_classification_2: 9', '_color': '#6E3F7C'}, {'administrative_classification_2.Einzelplan': '35', 'administrative_classification_2.Einzelplanbezeichnung': 'Amt für Bürgerdienste', '_count': 507, 'Betrag.sum': 145715400, '_current_label': 'Amt für Bürgerdienste', '_current_key': '35', '_value': 145715400, '_value_fmt': '€145.715.400', '_percentage': 0.027767650527255196, '_small': false, '_percentage_fmt': '2, 78%', '_url': '#einzelplan/administrative_classification_2: 35', '_color': '#6A246D'}, {'administrative_classification_2.Einzelplan': '36', 'administrative_classification_2.Einzelplanbezeichnung': 'Amt für Weiterbildung und Kultur', '_count': 1183, 'Betrag.sum': 140904900, '_current_label': 'Amt für Weiterbildung und Kultur', '_current_key': '36', '_value': 140904900, '_value_fmt': '€140.904.900', '_percentage': 0.026850957556839156, '_small': false, '_percentage_fmt': '2, 69%', '_url': '#einzelplan/administrative_classification_2: 36', '_color': '#8A4873'}, {'administrative_classification_2.Einzelplan': '41', 'administrative_classification_2.Einzelplanbezeichnung': 'Gesundheitsamt', '_count': 396, 'Betrag.sum': 96016700, '_current_label': 'Gesundheitsamt', '_current_key': '41', '_value': 96016700, '_value_fmt': '€96.016.700', '_percentage': 0.01829702399595584, '_small': false, '_percentage_fmt': '1, 83%', '_url': '#einzelplan/administrative_classification_2: 41', '_color': '#EB0080'}, {'administrative_classification_2.Einzelplan': '42', 'administrative_classification_2.Einzelplanbezeichnung': 'Stadtentwicklungsamt', '_count': 500, 'Betrag.sum': 89328600, '_current_label': 'Stadtentwicklungsamt', '_current_key': '42', '_value': 89328600, '_value_fmt': '€89.328.600', '_percentage': 0.01702253397299783, '_small': false, '_percentage_fmt': '1, 70%', '_url': '#einzelplan/administrative_classification_2: 42', '_color': '#EF58A0'}, {'administrative_classification_2.Einzelplan': '34', 'administrative_classification_2.Einzelplanbezeichnung': 'Ordnungsamt', '_count': 342, 'Betrag.sum': 68579000, '_current_label': 'Ordnungsamt', '_current_key': '34', '_value': 68579000, '_value_fmt': '€68.579.000', '_percentage': 0.013068472553406393, '_small': false, '_percentage_fmt': '1, 31%', '_url': '#einzelplan/administrative_classification_2: 34', '_color': '#C05A89'}, {'administrative_classification_2.Einzelplan': '1', 'administrative_classification_2.Einzelplanbezeichnung': 'Abgeordnetenhaus', '_count': 48, 'Betrag.sum': 56117300, '_current_label': 'Abgeordnetenhaus', '_current_key': '1', '_value': 56117300, '_value_fmt': '€56.117.300', '_percentage': 0.01069376040509883, '_small': false, '_percentage_fmt': '1, 07%', '_url': '#einzelplan/administrative_classification_2: 1', '_color': '#CF3D1E'}, {'administrative_classification_2.Einzelplan': '43', 'administrative_classification_2.Einzelplanbezeichnung': 'Umwelt- und Naturschutzamt', '_count': 223, 'Betrag.sum': 22267500, '_current_label': 'Umwelt- und Naturschutzamt', '_current_key': '43', '_value': 22267500, '_value_fmt': '€22.267.500', '_percentage': 0.00424331373427692, '_small': true, '_percentage_fmt': '0, 42%', '_url': '#einzelplan/administrative_classification_2: 43', '_color': '#F15623'}, {'administrative_classification_2.Einzelplan': '20', 'administrative_classification_2.Einzelplanbezeichnung': 'Rechnungshof  ', '_count': 40, 'Betrag.sum': 18381000, '_current_label': 'Rechnungshof  ', '_current_key': '20', '_value': 18381000, '_value_fmt': '€18.381.000', '_percentage': 0.00350269898954728, '_small': true, '_percentage_fmt': '0, 35%', '_url': '#einzelplan/administrative_classification_2: 20', '_color': '#F68B1F'}, {'administrative_classification_2.Einzelplan': '31', 'administrative_classification_2.Einzelplanbezeichnung': 'Bezirksverordnetenversammlung', '_count': 141, 'Betrag.sum': 11167800, '_current_label': 'Bezirksverordnetenversammlung', '_current_key': '31', '_value': 11167800, '_value_fmt': '€11.167.800', '_percentage': 0.0021281454640915136, '_small': true, '_percentage_fmt': '0, 21%', '_url': '#einzelplan/administrative_classification_2: 31', '_color': '#FFC60B'}, {'administrative_classification_2.Einzelplan': '21', 'administrative_classification_2.Einzelplanbezeichnung': 'Beauftragte/r für Datenschutz  und Informationsfreiheit', '_count': 66, 'Betrag.sum': 5439100, '_current_label': 'Beauftragte/r für Datenschutz  und Informationsfreiheit', '_current_key': '21', '_value': 5439100, '_value_fmt': '€5.439.100', '_percentage': 0.0010364795209208753, '_small': true, '_percentage_fmt': '0, 10%', '_url': '#einzelplan/administrative_classification_2: 21', '_color': '#DFCE21'}, {'administrative_classification_2.Einzelplan': '2', 'administrative_classification_2.Einzelplanbezeichnung': 'Verfassungsgerichtshof', '_count': 19, 'Betrag.sum': 733700, '_current_label': 'Verfassungsgerichtshof', '_current_key': '2', '_value': 733700, '_value_fmt': '€733.700', '_percentage': 0.00013981449587241386, '_small': true, '_percentage_fmt': '0, 01%', '_url': '#einzelplan/administrative_classification_2: 2', '_color': '#BCD631'}], 'summary': {'administrative_classification_2.Einzelplan': '10', 'administrative_classification_2.Einzelplanbezeichnung': 'Bildung,  Jugend und Wissenschaft', '_count': 628, 'Betrag.sum': 5247667600, '_value': 5247667600, '_value_fmt': '€5.247.667.600'}, 'cell': [{'ref': 'date_2.Jahr', 'operator': ': ', 'value': [2017]}, {'ref': 'direction_2.Titelart', 'operator': ': ', 'value': ['Ausgabetitel']}], 'aggregates': ['_count', 'Betrag.sum'], 'attributes': ['administrative_classification_2.Einzelplan', 'administrative_classification_2.Einzelplanbezeichnung'], 'order': [['Betrag.sum', 'desc']], 'page': 1, 'page_size': 500, 'status': 'ok'}
    console.log(data)
    treemap.render(data)
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
