<!--
  - Copyright 2014-2019 the original author or authors.
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
  <div class="shadow rounded-lg break-inside-avoid mb-6">
    <header
      v-if="showTitle"
      ref="header"
      v-sticks-below="headerSticksBelow"
      class="rounded-t-lg flex justify-between px-4 py-5 sm:px-6 items-center border-b bg-white backdrop-filter backdrop-blur-sm bg-opacity-80 transition-all"
    >
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        <span v-text="title" />&nbsp;
        <span
          v-if="subtitle"
          class="text-sm text-gray-500"
          v-text="subtitle"
        />
        <slot
          v-if="'title' in $slots"
          name="title"
        />
      </h3>

      <div>
        <slot
          v-if="'actions' in $slots"
          name="actions"
        />
        <sba-icon-button
          v-if="closeable"
          :icon="['far', 'times-circle']"
          @click.stop="$emit('close', $event)"
        />
      </div>
    </header>
    <div
      v-if="'default' in $slots"
      class=" border-gray-200 px-4 py-3 bg-white"
    >
      <sba-loading-spinner
        v-if="loading"
        size="sm"
        class=""
        :loading="loading"
      />
      <slot v-if="!loading" />
    </div>
    <footer v-if="'footer' in $slots">
      <div class="px-4 py-3 border-t bg-gray-50">
        <slot name="footer" />
      </div>
    </footer>
  </div>
</template>

<script>
import SbaIconButton from './sba-icon-button.vue';
import SbaLoadingSpinner from "./sba-loading-spinner.vue";
import sticksBelow from "../directives/sticks-below.js";
import {throttle} from "lodash-es";

export default {
  components: {SbaLoadingSpinner, SbaIconButton},
  directives: {sticksBelow},
  props: {
    title: {
      type: String,
      default: undefined
    },
    subtitle: {
      type: String,
      default: undefined
    },
    closeable: {
      type: Boolean,
      default: false
    },
    headerSticksBelow: {
      type: String,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headerTopValue: 0,
      onScrollFn: undefined
    }
  },
  computed: {
    showTitle() {
      return this.title || 'title' in this.$slots || 'actions' in this.$slots;
    }
  },
  mounted() {
    if (this.headerSticksBelow) {
      const header = this.$refs.header;
      this.headerTopValue = +header.style.top.substr(0, header.style.top.length - 2)

      this.onScrollFn = throttle(this.onScroll, 150);
      document.addEventListener('scroll', this.onScrollFn);
    }
  },
  beforeUnmount() {
    if (this.headerSticksBelow) {
      document.removeEventListener('scroll', this.onScrollFn);
    }
  },
  methods: {
    onScroll() {
      const header = this.$refs.header;
      const boundingClientRect = header.getBoundingClientRect();
      if (boundingClientRect.top <= this.headerTopValue) {
        header.classList.add("!rounded-none", "!py-2")
      } else {
        header.classList.remove("!rounded-none", "!py-2")
      }
    }
  }
}
</script>
