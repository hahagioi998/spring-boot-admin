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
  <div class="h-full">
    <sba-wave
      :start-color="backgroundColors.start"
      :stop-color="backgroundColors.stop"
    />
    <div class="h-full">
      <instance-sidebar
        v-if="instance"
        :key="instanceId"
        class="w-10 md:w-60"
        :views="views"
        :instance="instance"
        :application="application"
      />
      <main class="h-full relative z-0 ml-10 md:ml-60">
        <div class="">
          <router-view
            v-if="instance"
            :instance="instance"
            :application="application"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import InstanceSidebar from './sidebar.vue';
  import {findApplicationForInstance, findInstance} from "../../../store.js";
  import sbaConfig from "../../../sba-config.js";

  export default {
    components: {InstanceSidebar},
    props: {
      views: {
        type: Array,
        default: () => []
      },
      applications: {
        type: Array,
        default: () => [],
      },
      error: {
        type: Error,
        default: null
      }
    },
    data() {
      return {
        instanceId: this.$route.params.instanceId,
        backgroundColors: {}
      }
    },
    computed: {
      instance() {
        return findInstance(this.applications, this.instanceId);
      },
      application() {
        return findApplicationForInstance(this.applications, this.instanceId);
      }
    },
    watch: {
      '$route': {
        immediate: true,
        handler() {
          this.instanceId = this.$route.params.instanceId;
        }
      }
    },
    created() {
      this.backgroundColors = sbaConfig.uiSettings.background;
    },
    install({viewRegistry}) {
      viewRegistry.addView({
        name: 'instances',
        path: '/instances/:instanceId',
        component: this,
        props: true,
        isEnabled() {
          return false;
        }
      });
    }
  }
</script>

