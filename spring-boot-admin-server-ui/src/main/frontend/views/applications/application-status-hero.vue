<template>
  <sba-panel>
    <div class="flex flex-row md:flex-col items-center justify-center">
      <template v-if="downCount === 0">
        <font-awesome-icon
          icon="check-circle"
          class="text-green-500 text-9xl pr-4 md:pb-4 md:pr-0"
        />
        <div>
          <h1
            class="font-bold text-2xl"
            v-text="$t('applications.all_up')"
          />
          <p
            class="text-gray-400"
            v-text="lastUpdate"
          />
        </div>
      </template>
      <template v-else>
        <font-awesome-icon
          icon="minus-circle"
          class="text-red-500 text-9xl pb-4"
        />
        <div>
          <h1
            class="font-bold text-2xl"
            v-text="$t('applications.instances_down')"
          />
          <p
            class="text-gray-400"
            v-text="lastUpdate"
          />
        </div>
      </template>
    </div>
  </sba-panel>
</template>

<script>
import SbaPanel from '@/components/sba-panel.vue';

const options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
};

export default {
  name: 'ApplicationStatusHero',
  components: {SbaPanel},
  props: {
    applications: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      lastUpdate: new Date(),
      dateTimeFormat: new Intl.DateTimeFormat(this.$i18n.locale, options)
    }
  },
  computed: {
    downCount() {
      return this.applications.reduce((current, next) => {
        return current + (next.instances.filter(instance => instance.statusInfo.status !== 'UP').length);
      }, 0);
    },
    applicationsCount() {
      return this.applications.length;
    },
    instancesCount() {
      return this.applications.reduce((current, next) => current + next.instances.length, 0);
    }
  },
  watch: {
    downCount() {
      this.updateLastUpdateTime();
    }
  },
  beforeMount() {
    this.updateLastUpdateTime();
  },
  methods: {
    updateLastUpdateTime() {
      this.lastUpdate = this.dateTimeFormat.format(new Date())
    }
  }
}
</script>

<style scoped>
.fill-green {
  fill: #22B061;
}
.fill-red {
  fill: #E03616;
}
.svg-shadow {
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
}
</style>
