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

import ApplicationsListItem from "./applications-list-item.vue";
import {applications} from "../../mocks/applications/data.js";
import Application from "../../services/application.js";

const application = applications[0];

export default {
  component: ApplicationsListItem,
  title: 'Views/Applications/ApplicationListItem',
};

const Template = (args) => ({
  components: {ApplicationsListItem},
  setup() {
    return {
      args
    };
  },
  template: `
    <applications-list-item v-bind="args"/>`,
});

export const OneInstance = Template.bind({});
OneInstance.args = {
  application: new Application(application)
}

export const OneInstanceExpanded = Template.bind({});
OneInstanceExpanded.args = {
  ...OneInstance.args,
  isExpanded: true,
}

export const MultipleInstances = Template.bind({});
MultipleInstances.args = {
  application: new Application({
    ...application, instances: [
      application.instances[0],
      application.instances[0]
    ]
  })
}

export const MultipleInstancesExpanded = Template.bind({});
MultipleInstancesExpanded.args = {
  ...MultipleInstances.args,
  isExpanded: true,
}
