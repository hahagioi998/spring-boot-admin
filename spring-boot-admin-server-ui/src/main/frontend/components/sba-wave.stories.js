/*
 * Copyright 2014-2019 the original author or authors.
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

import SbaWave from "./sba-wave.vue";

export default {
  component: SbaWave,
  title: 'Components/Background Wave',
};

const TemplateWithProps = (args) => ({
  components: {SbaWave},
  setup() { return { args }; },
  template: '<div class="bg-white h-full absolute top-0 left-0"><sba-wave v-bind="args" /></div>',
});

export const Default = TemplateWithProps.bind({});
Default.args = {
  startColor: "#ff0000",
  stopColor: "#00fa73",
};
