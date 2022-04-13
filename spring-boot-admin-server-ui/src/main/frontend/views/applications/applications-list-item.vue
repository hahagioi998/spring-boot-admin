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
    <sba-modal v-model="isModalShutdownApplicationOpen">
      <template #header>
        <span>shutdown endpoint</span>
      </template>
      <template #body>
        <span v-html="$t('applications.shutdown', {name: application.name})" />
      </template>
      <template #footer>
        <button
          class="button is-success"
          @click="shutdownApplication(application)"
        >
          OK
        </button>
        <button
          class="button"
          @click="closeModal"
        >
          Cancel
        </button>
      </template>
    </sba-modal>

    <sba-modal v-model="isModalRestartApplicationOpen">
      <template #header>
        <span>restart endpoint</span>
      </template>
      <template #body>
        <span v-html="$t('applications.restart', {name: application.name})" />
      </template>
      <template #footer>
        <button
          class="button is-success"
          @click="restartApplication(application)"
        >
          OK
        </button>
        <button
          class="button"
          @click="closeModal"
        >
          Cancel
        </button>
      </template>
    </sba-modal>

    <sba-modal v-model="isApplicationRestarted">
      <template #header>
        <span>restart endpoint</span>
      </template>
      <template #body>
        <span v-html="$t('applications.restarted', {name: application.name})" />
      </template>
      <template #footer>
        <button
          class="button is-success"
          @click="closeModal"
        >
          OK
        </button>
      </template>
    </sba-modal>

    <div
      class="application-list-item card bg-white px-6 py-3"
      :class="{'is-active': isExpanded}"
    >
      <header
        class="hero application-list-item__header"
        :class="headerClass"
        v-on="$attrs"
      >
        <application-summary
          v-if="!isExpanded"
          :application="application"
        />
        <h1
          v-else
          class="title is-size-5"
          v-text="application.name"
        />
        <div
          class="application-list-item__header__actions"
          @click.stop=""
        >
          <router-link
            class="button icon-button"
            title="journal"
            :to="{ name: 'journal', query: { 'application' : application.name } }"
          >
            <font-awesome-icon icon="history" />
          </router-link>
          <sba-icon-button
            v-if="hasNotificationFiltersSupport"
            :id="`nf-settings-${application.name}`"
            :icon="hasActiveNotificationFilter(application) ? 'bell-slash' : 'bell'"
            @click="$emit('toggle-notification-filter-settings', application)"
          />
          <sba-icon-button
            v-if="application.isUnregisterable"
            icon="trash"
            title="unregister"
            @click="$emit('unregister', application)"
          />
          <sba-icon-button
            v-if="hasShutdownEndpoint(application)"
            title="shutdown"
            :icon="['far', 'stop-circle']"
            @click="confirmShutdownApplication(application)"
          />
          <sba-icon-button
            v-if="hasRestartEndpoint(application)"
            title="restart"
            icon="sync-alt"
            @click="confirmRestartApplication(application)"
          />
        </div>
      </header>

      <div
        v-if="isExpanded"
        class="card-content"
      >
        <sba-modal v-model="isModalShutdownInstanceOpen">
          <template #header>
            <span>shutdown endpoint</span>
          </template>
          <template #body>
            <span v-html="$t('instances.shutdown', {name: currentModalInstance.id})" />
          </template>
          <template #footer>
            <button
              class="button is-success"
              @click="shutdownInstance"
            >
              OK
            </button>
            <button
              class="button"
              @click="closeModal"
            >
              Cancel
            </button>
          </template>
        </sba-modal>

        <sba-modal v-model="isModalRestartInstanceOpen">
          <template #header>
            <span>restart endpoint</span>
          </template>
          <template #body>
            <span v-html="$t('instances.restart', {name: currentModalInstance.id})" />
          </template>
          <template #footer>
            <button
              class="button is-success"
              @click="restartInstance"
            >
              OK
            </button>
            <button
              class="button"
              @click="closeModal"
            >
              Cancel
            </button>
          </template>
        </sba-modal>

        <sba-modal v-model="isInstanceRestarted">
          <template #header>
            <span>restart endpoint</span>
          </template>
          <template #body>
            <span v-html="$t('instances.restarted')" />
          </template>
          <template #footer>
            <button
              class="button is-success"
              @click="closeModal"
            >
              OK
            </button>
          </template>
        </sba-modal>

        <instances-list :instances="application.instances">
          <template #actions="{instance}">
            <sba-icon-button
              v-if="hasNotificationFiltersSupport"
              :id="`nf-settings-${instance.id}`"
              :icon="hasActiveNotificationFilter(instance) ? 'bell-slash' : 'bell'"
              @click.stop="$emit('toggle-notification-filter-settings', instance)"
            />
            <sba-icon-button
              v-if="instance.isUnregisterable"
              icon="trash"
              title="unregister"
              @click.stop="$emit('unregister', instance)"
            />
            <sba-icon-button
              v-if="instance.hasEndpoint('shutdown')"
              :icon="['far', 'stop-circle']"
              title="shutdown"
              @click.stop="confirmShutdownInstance(instance)"
            />
            <sba-icon-button
              v-if="instance.hasEndpoint('restart')"
              icon="sync-alt"
              title="restart"
              @click.stop="confirmRestartInstance(instance)"
            />
          </template>
        </instances-list>
      </div>
    </div>
  </div>
</template>
<script>
import Application from '@/services/application.js';
import ApplicationSummary from './application-summary.vue';
import InstancesList from './instances-list.vue';
import {HealthStatus} from '../../HealthStatus.js';

export default {
  components: {ApplicationSummary, InstancesList},
  props: {
    application: {
      type: Application,
      required: true
    },
    isExpanded: {
      type: Boolean,
      default: false
    },
    notificationFilters: {
      type: Array,
      default: () => []
    },
    hasNotificationFiltersSupport: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isModalShutdownApplicationOpen: false,
      isModalRestartApplicationOpen: false,
      isModalShutdownInstanceOpen: false,
      isModalRestartInstanceOpen: false,
      isApplicationRestarted: false,
      isInstanceRestarted: false,
      currentModalInstance: undefined
    }
  },
  computed: {
    headerClass() {
      if (!this.isExpanded) {
        return 'is-selectable';
      }
      if (this.application.status === HealthStatus.UP) {
        return 'is-primary';
      }
      if (this.application.status === HealthStatus.RESTRICTED) {
        return 'is-warning';
      }
      if (this.application.status === HealthStatus.DOWN) {
        return 'is-danger';
      }
      if (this.application.status === HealthStatus.OUT_OF_SERVICE) {
        return 'is-danger';
      }
      if (this.application.status === HealthStatus.OFFLINE) {
        return 'is-light';
      }
      return 'is-light';
    }
  },
  methods: {
    hasActiveNotificationFilter(object) {
      return this.notificationFilters.some(f => f.affects(object));
    },
    hasShutdownEndpoint(application) {
      return application.instances.some(i => i.hasEndpoint('shutdown'));
    },
    hasRestartEndpoint(application) {
      return application.instances.some(i => i.hasEndpoint('restart'));
    },
    confirmShutdownApplication() {
      this.isModalShutdownApplicationOpen = true;
    },
    confirmShutdownInstance(instance) {
      this.isModalShutdownInstanceOpen = true;
      this.currentModalInstance = instance;
    },
    confirmRestartApplication() {
      this.isModalRestartApplicationOpen = true;
    },
    confirmRestartInstance(instance) {
      this.isModalRestartInstanceOpen = true;
      this.currentModalInstance = instance;
    },
    closeModal() {
      this.currentModalInstance = undefined;
      this.isModalShutdownApplicationOpen = false;
      this.isModalShutdownInstanceOpen = false;
      this.isModalRestartApplicationOpen = false;
      this.isModalRestartInstanceOpen = false;
      this.isApplicationRestarted = false;
      this.isInstanceRestarted = false;
    },
    shutdownApplication(application) {
      this.$emit('shutdown', application);
      this.closeModal();
    },
    shutdownInstance() {
      this.$emit('shutdown', this.currentModalInstance);
      this.closeModal();
    },
    restartApplication(application) {
      this.$emit('restart', application);
      this.closeModal();
      this.isApplicationRestarted = true;
    },
    restartInstance() {
      this.$emit('restart', this.currentModalInstance);
      this.closeModal();
      this.isInstanceRestarted = true;
    }
  }
}
</script>
<style lang="css">
.application-list-item {
  transition: all ease-out 250ms;
}
.application-list-item .icon-button {
  padding: 0.5em 1em;
}
.application-list-item.is-active {
  @apply my-1 -mx-1;
  max-width: unset;
}
.application-list-item__header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.application-list-item:not(.is-active):hover {
  @apply bg-gray-100;
}
.application-list-item__header > *:not(:first-child) {
  margin-left: 12px;
}
.application-list-item__header .title {
  flex-grow: 1;
  flex-basis: 50%;
  margin: 0.75rem 0;
}
.application-list-item__header__actions {
  justify-self: end;
  opacity: 0;
  transition: all ease-out 86ms;
  will-change: opacity;
  margin-right: 16px;
  display: flex;
}
*:hover > .application-list-item__header__actions, *.is-active .application-list-item__header__actions {
  opacity: 1;
}
.application-list-item__header__actions > * {
  width: calc(32px / 2);
  height: calc(32px / 2);
}

</style>
