<template>
    <ul class="nhsuk-grid-row nhsuk-card-group">
      <li 
        v-for="link in links"
        :key="link.id"
        class="nhsuk-grid-column-full nhsuk-card-group__item"
      >
        <div class="nhsuk-card"> 
          <div class="nhsuk-card__content">
            <h3 class="nhsuk-card__heading nhsuk-heading-s">
              <a
                class="nhsuk-card__link"
                :href="link.url"
                rel="noopener noreferrer"
                target="_blank"
              >
                  {{ link.linkType }}
              </a>
            </h3>
            <p class="nhsuk-card__description nhsuk-body-s">
              for <b>{{ link.manufacturer }} - {{ link.model }} ({{ link.type }})</b>
            </p>
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

</style>
