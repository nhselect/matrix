<template>
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
          placeholder="Model"
        >
          {{ model }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { IResource } from '~/interfaces'

@Component
export default class Picker extends Vue {
  @Prop({ required: true }) readonly resources!: IResource[]
  type = ''
  manufacturer = ''
  model = ''

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

    if (resource && resource[0].links) {
      return resource[0].links
    }
  }

  @Watch('type')
  onTypeChanged() {
    this.$emit('clear')
    this.manufacturer = ''
    this.model = ''
    if (this.getManufacturers().length === 1) {
      this.manufacturer = this.getManufacturers()[0]
    }
  }

  @Watch('manufacturer')
  onManufacturerChanged() {
    this.$emit('clear')
    this.model = ''

    if (this.getModels().length === 1) {
      this.model = this.getModels()[0]
    }
  }

  @Watch('model')
  onModelChanged() {
    if (this.model) {
      this.$emit('changeModel', this.getLinks())
    }
  }
}
</script>

<style scoped>
.margin {
  margin: 5%;
}
</style>
