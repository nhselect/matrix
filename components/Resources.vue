<template>
  <div v-if="resources.length > 0">
    <picker
      :resources="resources"
      @changeModel="links = $event"
      @clear="links = ''"
    />
    <link v-if="links" :links="links" justify="space-around" align="center" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Picker from '@/components/Picker.vue'
import Link from '~/components/Link.vue'
import { IResource } from '~/interfaces'

@Component({
  components: { Picker, Link },
})
export default class Resources extends Vue {
  resources: IResource[] = []
  links = ''

  async fetch(): Promise<void> {
    const resources = (await this.$content('resources').fetch()) as IResource[]
    if (Array.isArray(resources)) {
      this.resources = resources
    } else {
      this.resources = [resources]
    }
  }
}
</script>

<style scoped>
.margin {
  margin: 5%;
}
</style>
