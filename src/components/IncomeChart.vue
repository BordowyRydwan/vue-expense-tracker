<script>
import {Bar, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins;

export default {
  name: 'IncomeChart',
  extends: Bar,
  mixins: [reactiveProp],

  mounted(){
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false});
  }
}
</script>

<style>

</style>