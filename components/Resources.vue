<template>
  <div v-if="resources.length > 0">
    <div type="flex" justify="space-around" align="center">
      <b-field label="Resource Type">
        <b-select
          v-model="type"
          placeholder="Resource Type"
          class="margin"
          rounded
        >
          <option
            v-for="type in getTypes()"
            :key="type"
            :label="type"
            :value="type"
          >
            {{ type }}
          </option>
        </b-select>
      </b-field>
      <b-field v-if="type" label="Manufacturer">
        <b-select
          v-model="manufacturer"
          placeholder="Manufacturer"
          class="margin"
          rounded
        >
          <option
            v-for="manufacturer in getManufacturers()"
            :key="manufacturer"
            :label="manufacturer"
            :value="manufacturer"
          >
            {{ manufacturer }}
          </option>
        </b-select>
      </b-field>
      <b-field v-if="manufacturer" label="Model">
        <b-select v-model="model" placeholder="Model" class="margin" rounded>
          <option
            v-for="model in getModels()"
            :key="model"
            :label="model"
            :value="model"
          >
            {{ model }}
          </option>
        </b-select>
      </b-field>
    </div>
    <div v-if="model" justify="space-around" align="center">
      <b-button
        v-for="link in getLinks()"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        type="is-primary"
        outlined
        class="margin"
      >
        {{ link.linkType }}
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { IResource } from '~/interfaces'

@Component
export default class Resources extends Vue {
  resources: IResource[] = []
  type = ''
  manufacturer = ''
  model = ''

  @Watch('type')
  onTypeChanged() {
    this.manufacturer = ''
    this.model = ''
  }

  @Watch('manufacturer')
  onManufacturerChanged() {
    this.model = ''
  }

  async fetch(): Promise<void> {
    const resources = (await this.$content('resources').fetch()) as IResource[]
    if (Array.isArray(resources)) {
      this.resources = resources
    } else {
      this.resources = [resources]
    }
  }

  getTypes() {
    return [...new Set(this.resources.map((resource) => resource.type))].sort()
  }

  getManufacturers() {
    return [
      ...new Set(
        this.resources
          .filter((resource) => {
            return resource.type === this.type
          })
          .map((resource) => resource.manufacturer)
      ),
    ].sort()
  }

  getModels() {
    return [
      ...new Set(
        this.resources
          .filter((resource) => {
            return (
              resource.type === this.type &&
              resource.manufacturer === this.manufacturer
            )
          })
          .map((resource) => resource.model)
      ),
    ].sort()
  }

  getLinks() {
    const resource = this.resources.filter((resource) => {
      return (
        resource.type === this.type &&
        resource.manufacturer === this.manufacturer &&
        resource.model === this.model
      )
    })

    if (resource) {
      return resource[0].links
    }
  }
}
</script>

<style scoped>
.margin {
  margin: 5%;
}
</style>
