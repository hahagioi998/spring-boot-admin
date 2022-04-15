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
  <nav
    id="navigation"
    class="bg-black fixed top-0 w-full h-14 z-50"
  >
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14">
        <div class="flex items-center">
          <div class="flex items-center flex-shrink-0 text-white mr-6">
            <router-link
              class="brand"
              to="/"
              v-html="brand"
            />
          </div>

          <div class="hidden lg:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <!-- LINKS -->
              <template v-for="view in enabledViews">
                <a
                  v-if="view.href"
                  :key="view.name"
                  :href="view.href"
                  class="navbar-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <component :is="view.handle" />
                </a>
                <router-link
                  v-else
                  :key="view.name"
                  :to="{name: view.name}"
                  class="navbar-item"
                >
                  <component
                    :is="view.handle"
                    :applications="applications"
                    :error="error"
                  />
                </router-link>
              </template>
              <!-- LINKS -->
            </div>
          </div>
        </div>

        <div class="hidden lg:block">
          <div class="ml-4 flex items-center md:ml-6">
            <navbar-item-language-selector
              v-if="availableLocales.length > 1"
              :current-locale="$i18n.locale"
              :available-locales="availableLocales"
              @localeChanged="changeLocale"
            />

            <div class="ml-3 relative">
              <div>
                <button
                  id="user-menu-button"
                  type="button"
                  class="h-8 w-8 max-w-xs bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  :aria-expanded="showUserMenu"
                  aria-haspopup="true"
                  @click.stop="showUserMenu = !showUserMenu"
                >
                  <span class="sr-only">Open user menu</span>
                  <font-awesome-icon
                    color="white"
                    class="rounded-full"
                    icon="user-circle"
                    size="2x"
                  />
                </button>
              </div>
            </div>

            <div
              v-if="showUserMenu"
              class="origin-top-right absolute right-0 mt-26 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <a class="block px-4 py-2 text-sm text-gray-700">
                <form
                  action="logout"
                  method="post"
                >
                  <input
                    v-if="csrfToken"
                    type="hidden"
                    :name="csrfParameterName"
                    :value="csrfToken"
                  >
                  <button
                    type="submit"
                    value="logout"
                  >
                    <font-awesome-icon icon="sign-out-alt" />&nbsp;<span v-text="$t('navbar.logout')" />
                  </button>
                </form>
              </a>
            </div>
          </div>
        </div>

        <div class="-mr-2 flex lg:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-controls="mobile-menu"
            :aria-expanded="showMenu"
            @click.stop="showMenu = !showMenu"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              :class="{'block': !showMenu, 'hidden': showMenu}"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              :class="{'block': showMenu, 'hidden': !showMenu}"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div
      v-if="showMenu"
      id="mobile-menu"
      class="lg:hidden bg-black"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <!-- LINKS -->
        <template v-for="view in enabledViews">
          <a
            v-if="view.href"
            :key="view.name"
            :href="view.href"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <component :is="view.handle" />
          </a>
          <router-link
            v-else
            :key="view.name"
            :to="{name: view.name}"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            <component
              :is="view.handle"
              :applications="applications"
              :error="error"
            />
          </router-link>
        </template>
        <!-- LINKS -->
      </div>

      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <font-awesome-icon
              color="white"
              class="h-10 w-10 rounded-full white"
              icon="user-circle"
              size="2x"
            />
          </div>
          <div class="ml-3">
            <div
              class="text-base font-medium leading-none text-white"
              v-text="userName"
            />
          </div>
        </div>
        <div class="mt-3 px-2 space-y-1 is-hidden bg-gray-100">
          <a class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            <form
              action="logout"
              method="post"
            >
              <input
                v-if="csrfToken"
                type="hidden"
                :name="csrfParameterName"
                :value="csrfToken"
              >
              <button
                type="submit"
                value="logout"
              >
                <font-awesome-icon icon="sign-out-alt" />&nbsp;<span v-text="$t('navbar.logout')" />
              </button>
            </form>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import sbaConfig from '../sba-config';
import {compareBy} from "../utils/collections";
import moment from 'moment';
import NavbarItemLanguageSelector from './navbar-item-language-selector.vue';
import {AVAILABLE_LANGUAGES} from '../i18n';

const readCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return (match ? decodeURIComponent(match[3]) : null);
};

export default {
  name: 'SbaNavbar',
  components: {NavbarItemLanguageSelector},
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
  data: () => ({
    showMenu: false,
    showUserMenu: false,
    brand: '<img src="assets/img/icon-spring-boot-admin.svg"><span>Spring Boot Admin</span>',
    userName: 'Stephan Köninger',
    csrfToken: null,
    csrfParameterName: null,
    currentLanguage: null
  }),
  computed: {
    enabledViews() {
      return this.views.filter(
        view => view.handle && (typeof view.isEnabled === 'undefined' || view.isEnabled())
      ).sort(compareBy(v => v.order));
    },
  },
  created() {
    this.brand = sbaConfig.uiSettings.brand;
    //this.userName = sbaConfig.user ? sbaConfig.user.name : null;
    this.availableLocales = AVAILABLE_LANGUAGES;
    this.csrfToken = readCookie('XSRF-TOKEN');
    this.csrfParameterName = sbaConfig.csrf.parameterName;
  },
  mounted() {
    document.documentElement.classList.add('has-navbar-fixed-top');
  },
  beforeUnmount() {
    document.documentElement.classList.remove('has-navbar-fixed-top')
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
      moment.locale(this.$i18n.locale);
    }
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.brand {
  @apply inline-flex items-center;
}

.brand img {
  @apply h-8 w-8 mr-2;
}

.brand span {
  @apply font-semibold text-xl;
}

.navbar-item {
  @apply text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md;
}

.navbar-item.is-active {
  @apply bg-gray-600 text-gray-50;
}
</style>
