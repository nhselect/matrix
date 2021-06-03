<template>
  <div>
    <a
      v-for="link in links"
      :key="link.url"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
    >
      <b-button type="is-primary" outlined class="margin">
        {{ link.linkType }}
      </b-button>
    </a>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { ILink } from '~/interfaces'

@Component
export default class Link extends Vue {
  @Prop({ required: true }) readonly links!: ILink[]
}
</script>

<style scoped>
.margin {
  margin: 5%;
}
</style>
