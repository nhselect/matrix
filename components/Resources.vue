<template>
  <div class="nhsuk-grid-row">
    <div v-if="resources.length > 0" class="nhsuk-grid-column-one-third">
      <picker
        :resources="resources"
        @changeModel="links = $event"
        @clear="links = ''"
      />
    </div>
    <div class="nhsuk-grid-column-two-thirds">
      <div id="resources" class="nhsuk-card ltlc-resources">
        <div class="nhsuk-card__content">
          <h2 class="nhsuk-card__heading">Resources</h2>
          <p v-if="links.length > 0">
            Found resources for <b>{{ links.length }}</b> devices:
          </p>
          <p v-if="links.length == 0">
            Start searching using the
            <a href="#maincontent">filters or search bar</a>.
          </p>
          <Link v-if="links.length > 0" :links="links" />
        </div>
      </div>
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

<style scoped>
.ltlc-resources {
  background: transparent;
}
</style>
