<template>
  <ul class="nhsuk-grid-row nhsuk-card-group">
    <li
      v-for="resource in links"
      :key="resource.id"
      class="nhsuk-grid-column-full nhsuk-card-group__item"
    >
      <div class="nhsuk-card">
        <div class="nhsuk-card__content">
          <h3 class="nhsuk-card__heading nhsuk-heading-s">
            {{ resource.manufacturer }} - {{ resource.model }}
            <small>({{ resource.type }})</small>
          </h3>
          <ul class="nhsuk-list ltlc-resource__list">
            <li v-for="link in resource.links" :key="link.id">
              <a
                :href="link.url"
                target="_blank"
                class="nhsuk-u-font-weight-bold"
              >
                {{ link.linkType }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { ILink } from '~/interfaces'

@Component
export default class Link extends Vue {
  @Prop({ required: true }) readonly links!: ILink[]
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/button/button';
@import 'node_modules/nhsuk-frontend/packages/components/card/card';

h3.nhsuk-heading-s {
  margin-bottom: 8px;
}

.nhsuk-card-group__item .nhsuk-card {
  margin-bottom: 16px;
}

.nhsuk-card__heading > small {
  font-weight: normal;
}

.nhsuk-header {
  border-bottom: 10px solid $color_nhsuk-pink;
}
</style>
