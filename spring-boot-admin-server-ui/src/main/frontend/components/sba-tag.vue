<template>
  <span class="inline-flex bg-white leading-none rounded-md p-1 shadow-sm text-teal text-sm border border-gray-300">
    <span
      v-if="label"
      class="inline-flex bg-green-200 rounded text-gray-600 py-1 px-3  justify-center items-center"
      v-text="label"
    />
    <span
      class="inline-flex px-2 justify-center items-center"
      :class="{'pl-2': !!label}"
      v-text="value"
    />
  </span>
</template>
<script>
export default {
  name: 'SbaTag',
  props: {
    label: {
      type: [String, Number],
      default: null
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
