<template>
  <div v-if="resources.length > 0">
    <vs-row type="flex" justify="space-around" align="center">
      <vs-select
        v-model="type"
        placeholder="Select"
        label="Resource Type"
        class="select"
      >
        <vs-option
          v-for="type in getTypes()"
          :key="type"
          :label="type"
          :value="type"
          >{{ type }}</vs-option
        >
      </vs-select>
      <vs-select
        v-if="type"
        v-model="manufacturer"
        placeholder="Select"
        label="Model"
        class="select"
      >
        <vs-option
          v-for="manufacturer in getManufacturers()"
          :key="manufacturer"
          :label="manufacturer"
          :value="manufacturer"
          >{{ manufacturer }}</vs-option
        >
      </vs-select>
      <vs-select
        v-if="manufacturer"
        v-model="model"
        placeholder="Select"
        label="Model"
        class="select"
      >
        <vs-option
          v-for="model in getModels()"
          :key="model"
          :label="model"
          :value="model"
          >{{ model }}</vs-option
        >
      </vs-select>
    </vs-row>
    <vs-row v-if="model" justify="space-around" align="center">
      <a
        v-for="link in getLinks()"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="select button--green"
        >{{ link.linkType }}</a
      >
    </vs-row>
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
    const types = [...new Set(this.resources.map((resource) => resource.type))]
    console.log(this.type)
    return types
  }

  getManufacturers() {
    const manufacturers = [
      ...new Set(
        this.resources
          .filter((resource) => {
            return resource.type === this.type
          })
          .map((resource) => resource.manufacturer)
      ),
    ]
    console.log(manufacturers)
    return manufacturers
  }

  getModels() {
    const models = [
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
    ]
    console.log(models)
    return models
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
.select {
  margin: 5%;
}
</style>
