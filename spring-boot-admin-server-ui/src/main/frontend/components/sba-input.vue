<!--
  - Copyright 2014-2020 the original author or authors.
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

<template>
  <div>
    <label
      v-if="hasLabel"
      :for="id"
      class="block text-sm font-medium text-gray-700"
      v-text="label"
    />
    <div
      class="flex rounded-md shadow-sm"
      :class="{'mt-1': hasLabel}"
    >
      <span
        v-if="$slots.prepend"
        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
      >
        <slot name="prepend" />
      </span>

      <input
        :id="id"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :min="min"
        class="focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 p-2 relative flex-1 block w-full rounded-none sm:text-sm border-gray-300"
        :class="inputFieldClassNames"
        @input="$event => $emit('update:modelValue', $event.target.value)"
      >
      <span
        v-if="$slots.append"
        class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
      >
        <slot name="append" />
      </span>
    </div>
    <span
      v-if="$slots.info"
      class="mt-2 text-sm text-gray-500"
    >
      <slot name="info" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
      default: null
    },
    min: {
      type: Number,
      default: undefined
    }
  },
  emits: ['update:modelValue'],
  computed: {
    hasLabel() {
      return this.label !== null && this.label.trim() !== '';
    },
    id() {
      return (this.name || "").replace(/[^\w]/gi, '')
    },
    inputFieldClassNames() {
      const hasAppend = this.hasSlot('append');
      const hasPrepend = this.hasSlot('prepend');

      const classNames = [];

      if (!hasAppend) {
        classNames.push('rounded-r-md')
      }
      if (!hasPrepend) {
        classNames.push('rounded-l-md')
      }

      return classNames;
    }
  },
  methods: {
    hasSlot(slot) {
      return !!this.$slots[slot]
        && Object.keys(this.$slots[slot]).length > 0
    }
  }
}
</script>

