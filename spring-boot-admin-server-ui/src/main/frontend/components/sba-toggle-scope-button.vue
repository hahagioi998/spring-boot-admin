<!--
  - Copyright 2014-2018 the original author or authors.
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
    <sba-button
      v-if="modelValue === APPLICATION"
      class="w-full"
      size="sm"
      :class="classNames"
      :title="$t('term.affects_all_instances', {count: instanceCount})"
      @click="toggleScope('instance')"
    >
      <font-awesome-icon icon="cubes" />&nbsp;
      <span v-text="$t('term.application')" />
    </sba-button>
    <sba-button
      v-else
      class="w-full"
      size="sm"
      :class="classNames"
      :title="$t('term.affects_this_instance_only')"
      @click="toggleScope('application')"
    >
      <font-awesome-icon icon="cube" />&nbsp;&nbsp;
      <span v-text="$t('term.instance')" />
    </sba-button>

    <p
      v-if="showInfo"
      class="text-center text-xs pt-1 truncate"
    >
      <span
        v-if="modelValue === APPLICATION"
        v-text="$t('term.affects_all_instances', {count: instanceCount})"
      />
      <span
        v-else
        v-text="$t('term.affects_this_instance_only')"
      />
    </p>
  </div>
</template>

<script>
import SbaButton from './sba-button.vue';
import {ActionScope} from "./ActionScope.js";

/**
 * The only true button.
 * @example ../../../docs/Button.md
 * @example ../../../docs/ButtonConclusion.md
 * @displayName Best Button
 */
export default {
  name: "SbaToggleScopeButton",
  components: {SbaButton},
  props: {
    /**
     * A test for default function Object
     */
    modelValue: String,
    instanceCount: {
      type: Number,
      required: true
    },
    /**
     * A test for default function Object
     */
    showInfo: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      APPLICATION: ActionScope.APPLICATION,
      INSTANCE: ActionScope.INSTANCE,
      classNames: []
    };
  },
  mounted() {
    this.classNames = [...this.$el.classList];
  },
  methods: {
    toggleScope(newScope) {
      this.$emit('update:modelValue', newScope)
    }
  }
}
</script>
