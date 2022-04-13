/*
 * Copyright 2014-2020 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import './index.css';
import axios from './utils/axios.js';
import moment from 'moment';
import components from './components';
import Notifications from './notifications.js';
import sbaConfig from './sba-config.js'
import sbaShell from './shell/index.vue';
import Store from './store.js';
import ViewRegistry from './viewRegistry';
import views from './views';
import {createApp, h, markRaw, reactive} from 'vue';
import i18n from './i18n';
import router from './router.js';

moment.locale(navigator.language.split('-')[0]);

const applicationStore = new Store();
const viewRegistry = new ViewRegistry();

const installables = [
  Notifications,
  ...views,
  ...sbaConfig.extensions
];

installables.forEach(installable => {
  installable.install({
    viewRegistry,
    applicationStore,
  })
});

let app = createApp({
  setup() {
    let props = reactive({
      views: markRaw(viewRegistry.views),
      applications: applicationStore.applications,
      applicationsInitialized: false,
      error: null
    });

    applicationStore.addEventListener('connected', () => {
      props.applicationsInitialized = true;
      props.error = null;
    });

    applicationStore.addEventListener('changed', (applications) => {
      props.applications = applications;
      props.applicationsInitialized = true;
      props.error = null;
    });

    return () => h(sbaShell, props);
  },
  created() {
    applicationStore.start();
  },
  beforeUnmount() {
    applicationStore.stop();
  }
});

app.use(components);
app.use(i18n);
app.use(router(viewRegistry.routes));

const vue = app.mount('#app');

installables.forEach(view => view.configure ? view.configure({
  vue,
  i18n: vue.$i18n,
  axios
}) : void (0));
