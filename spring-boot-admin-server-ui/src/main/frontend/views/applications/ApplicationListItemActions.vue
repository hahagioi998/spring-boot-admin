<template>
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
      :icon="hasActiveNotificationFilter ? 'bell-slash' : 'bell'"
      @click="$emit('filter-settings', application)"
    />
    <sba-icon-button
      v-if="application.isUnregisterable"
      icon="trash"
      title="unregister"
      @click="$emit('unregister', application)"
    />
    <sba-icon-button
      v-if="application.hasShutdownEndpoint"
      title="shutdown"
      :icon="['far', 'stop-circle']"
      @click="$emit('shutdown', application)"
    />
    <sba-icon-button
      v-if="application.hasRestartEndpoint"
      title="restart"
      icon="sync-alt"
      @click="$emit('restart', application)"
    />
  </div>
</template>
<script>
import Application from "../../services/application.js";

export default {
  name: 'ApplicationListItemActions',
  props: {
    application: {
      type: Application,
      required: true
    },
    hasActiveNotificationFilter: {
      type: Boolean,
      default: false
    },
    hasNotificationFiltersSupport: {
      type: Boolean,
      default: false
    },
  },
  emits: ['filter-settings', 'unregister', 'shutdown', 'restart']
}
</script>
<style scoped>
.application-list-item__header > *:not(:first-child) {
  margin-left: 12px;
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
