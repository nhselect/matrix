<template>
  <div id="picker" class="nhsuk-fieldset">
    <div class="nhsuk-form-group">
      <label class="nhsuk-label" for="search">What are you looking for?</label>
      <input
        id="search"
        v-model="searchQuery"
        class="nhsuk-input nhsuk-u-width-full"
        name="Search"
        type="text"
        placeholder="e.g. model, type, keywords"
      />
      <p v-if="results > 0">
        <strong class="nhsuk-tag nhsuk-tag--green">
          <a href="#resources">Found resources for {{ results }} devices</a>
        </strong>
      </p>
    </div>
    <p><b>Or</b></p>
    <div class="nhsuk-form-group" label="Resource Type">
      <label class="nhsuk-label" for="type">
        Resource Type <small>({{ getTypes().length }} types)</small>
      </label>
      <select
        id="type"
        v-model="type"
        placeholder="Resource Type"
        class="nhsuk-select nhsuk-u-width-full"
      >
        <option></option>
        <option
          v-for="type in getTypes()"
          :key="type"
          :label="type"
          :value="type"
        >
          {{ type }}
        </option>
      </select>
    </div>
    <div class="nhsuk-form-group" label="Manufacturer">
      <label class="nhsuk-label" for="manufacturer">
        Manufacturer
        <small>({{ getManufacturers().length }} manufacturers)</small>
      </label>
      <select
        id="manufacturer"
        v-model="manufacturer"
        placeholder="Manufacturer"
        class="nhsuk-select nhsuk-u-width-full"
      >
        <option></option>
        <option
          v-for="manufacturer in getManufacturers()"
          :key="manufacturer"
          :label="manufacturer"
          :value="manufacturer"
        >
          {{ manufacturer }}
        </option>
      </select>
    </div>
    <div class="nhsuk-form-group" label="Model">
      <label class="nhsuk-label" for="model">
        Model <small>({{ getModels().length }} models)</small>
      </label>
      <select
        id="model"
        v-model="model"
        placeholder="Model"
        class="nhsuk-select nhsuk-u-width-full"
      >
        <option></option>
        <option
          v-for="model in getModels()"
          :key="model"
          :label="model"
          :value="model"
          placeholder="Model"
        >
          {{ model }}
        </option>
      </select>
    </div>
    <div class="nhsuk-form-group">
      <button class="nhsuk-button" @click="clearFilters">Clear Filters</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { IResource } from '~/interfaces'

@Component
export default class Picker extends Vue {
  @Prop({ required: true }) readonly resources!: IResource[]
  search = ''
  searchQuery = ''
  type = ''
  manufacturer = ''
  model = ''
  results = 0

  getTypes() {
    return [
      ...new Set(
        this.resources
          .filter((resource) => {
            return (
              (resource.manufacturer === this.manufacturer ||
                this.manufacturer === '') &&
              (resource.model === this.model || this.model === '')
            )
          })
          .map((resource) => resource.type)
      ),
    ].sort()
  }

  getManufacturers() {
    return [
      ...new Set(
        this.resources
          .filter((resource) => {
            return (
              (resource.type === this.type || this.type === '') &&
              (resource.model === this.model || this.model === '')
            )
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
              (resource.type === this.type || this.type === '') &&
              (resource.manufacturer === this.manufacturer ||
                this.manufacturer === '')
            )
          })
          .map((resource) => resource.model)
      ),
    ].sort()
  }

  getLinksBySearch() {
    this.type = ''
    this.manufacturer = ''
    this.model = ''
    this.results = 0

    const resource = this.resources.filter((resource) => {
      return this.searchQuery
        .toLowerCase()
        .split(' ')
        .every((v) => resource.slug.toLowerCase().includes(v))
    })

    if (resource && resource.length > 0) {
      this.results = resource.length
      return resource
    }

    this.results = 0
    return ''
  }

  getLinks() {
    const resource = this.resources.filter((resource) => {
      return (
        (resource.type === this.type || this.type === '') &&
        (resource.manufacturer === this.manufacturer ||
          this.manufacturer === '') &&
        (resource.model === this.model || this.model === '')
      )
    })

    if (resource && resource.length > 0) {
      return resource
    }

    return ''
  }

  // clear all filters
  clearFilters() {
    this.searchQuery = ''
    this.type = ''
    this.manufacturer = ''
    this.model = ''
    this.results = 0
  }

  @Watch('searchQuery')
  onSearchChanged() {
    this.$emit('clear')

    if (this.searchQuery !== '') {
      this.$emit('changeModel', this.getLinksBySearch())
    }
  }

  @Watch('type')
  onTypeChanged() {
    this.$emit('clear')

    this.searchQuery = ''

    if (this.getManufacturers().length === 1) {
      this.manufacturer = this.getManufacturers()[0]
    }

    if (this.model) {
      this.$emit('changeModel', this.getLinks())
    }
  }

  @Watch('manufacturer')
  onManufacturerChanged() {
    this.$emit('clear')

    this.searchQuery = ''

    if (this.getModels().length === 1) {
      this.model = this.getModels()[0]
    }

    if (this.model) {
      this.$emit('changeModel', this.getLinks())
    }
  }

  @Watch('model')
  onModelChanged() {
    this.searchQuery = ''

    if (this.getTypes().length === 1) {
      this.type = this.getTypes()[0]
    }

    if (this.getManufacturers().length === 1) {
      this.manufacturer = this.getManufacturers()[0]
    }

    if (this.model) {
      this.$emit('changeModel', this.getLinks())
    }
  }
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/fieldset/fieldset';
@import 'node_modules/nhsuk-frontend/packages/components/select/select';
@import 'node_modules/nhsuk-frontend/packages/components/label/label';
@import 'node_modules/nhsuk-frontend/packages/components/input/input';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';
</style>
