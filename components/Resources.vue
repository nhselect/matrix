<template>
  <div class="nhsuk-grid-row">
    <div class="nhsuk-grid-column-one-third" v-if="resources.length > 0">
      <picker
        :resources="resources"
        @changeModel="links = $event"
        @clear="links = ''"
      />
    </div>
    <div class="nhsuk-grid-column-two-thirds">
      <p v-if="links.length > 0">Found <b>{{ links.length }}</b> resources:</p>
      <p v-if="links.length == 0">No resources found, please use the filters and search bar</p>
      <Link
        v-if="links.length > 0"
        :links="links"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Picker from '@/components/Picker.vue'
import Link from '@/components/Link.vue'
import { ILink, IResource } from '~/interfaces'

@Component({
  components: { Picker, Link },
})
export default class Resources extends Vue {
  resources: IResource[] = []
  links: ILink[] = []

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