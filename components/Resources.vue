<template>
  <div class="grid">
    <vs-row vs-w="12" type="flex" justify="center" align="center">
      <vs-select v-model="value" placeholder="Select">
        <vs-option label="Vuesax" value="1"> Vuesax </vs-option>
        <vs-option label="Vue" value="2"> Vue </vs-option>
        <vs-option label="Javascript" value="3"> Javascript </vs-option>
        <vs-option disabled label="Sass" value="4"> Sass </vs-option>
        <vs-option label="Typescript" value="5"> Typescript </vs-option>
        <vs-option label="Webpack" value="6"> Webpack </vs-option>
        <vs-option label="Nodejs" value="7"> Nodejs </vs-option>
      </vs-select>
      <vs-select v-if="hide" v-model="value" placeholder="Select">
        <vs-option label="Vuesax" value="1"> Vuesax </vs-option>
        <vs-option label="Vue" value="2"> Vue </vs-option>
        <vs-option label="Javascript" value="3"> Javascript </vs-option>
        <vs-option disabled label="Sass" value="4"> Sass </vs-option>
        <vs-option label="Typescript" value="5"> Typescript </vs-option>
        <vs-option label="Webpack" value="6"> Webpack </vs-option>
        <vs-option label="Nodejs" value="7"> Nodejs </vs-option>
      </vs-select>
    </vs-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Resources extends Vue {
  value = ''
  hide = false
}
</script>
