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
  <div>
    <nav
      class="relative z-0 btn-group rounded-md shadow-sm -space-x-px"
      aria-label="Pagination"
    >
      <sba-button
        href="#"
        class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-2 py-2 border text-sm font-medium"
        @click="$emit('update:modelValue', modelValue - 1)"
      >
        <span
          class="sr-only"
          v-text="$t('term.go_to_previous_page')"
        />
        <font-awesome-icon
          class="h-5 w-5"
          :icon="['fas','angle-double-left']"
        />
      </sba-button>
      <sba-button
        v-for="(page, idx) in pageRange"
        :key="'page_' + idx"
        href="#"
        class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        :class="{'bg-indigo-50 border border-indigo-500 z-10': page === modelValue, 'cursor-not-allowed': page === skipPageString}"
        @click="() => changePage(page)"
      >
        <span
          class="sr-only"
          v-text="$t('term.go_to_page_n', {page})"
        />
        <span v-text="page" />
      </sba-button>

      <sba-button
        href="#"
        class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-2 py-2 border text-sm font-medium"
        @click="$emit('update:modelValue', modelValue+1)"
      >
        <span
          class="sr-only"
          v-text="$t('term.go_to_previous_page')"
        />
        <font-awesome-icon
          class="h-5 w-10"
          :icon="['fas','angle-double-right']"
        />
      </sba-button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SbaPaginationNav',
  props: {
    modelValue: {type: Number, default: 1},
    pageCount: {type: Number, required: true},
    // Define amount of pages shown before and after current page.
    delta: {type: Number, default: 2}
  },
  emits: ['update:modelValue'],
  data() {
    return {
      skipPageString: '...'
    }
  },
  computed: {
    pageRange() {
      const current = this.modelValue;
      const delta = this.delta;
      const left = current - delta;
      const right = current + delta + 1;

      let prevPageNum;

      return Array(this.pageCount).fill(0)
        .reduce((pageNumsRemaining, cur, idx) => {
          const pageNum = idx + 1;
          if (pageNum === 1 || pageNum === this.pageCount || (pageNum >= left && pageNum < right)) {
            pageNumsRemaining.push(pageNum);
          }
          return pageNumsRemaining;
        }, [])
        .reduce((paginationNavEntries, pageNum) => {
          if (prevPageNum) {
            if (pageNum - prevPageNum === 2) {
              paginationNavEntries.push(prevPageNum + 1);
            } else if (pageNum - prevPageNum !== 1) {
              paginationNavEntries.push(this.skipPageString);
            }
          }
          paginationNavEntries.push(pageNum);
          prevPageNum = pageNum;
          return paginationNavEntries;
        }, []);
    }
  },
  methods: {
    changePage(page) {
      if (page !== this.skipPageString) {
        this.$emit('update:modelValue', page)
      }
    }
  }
}
</script>

