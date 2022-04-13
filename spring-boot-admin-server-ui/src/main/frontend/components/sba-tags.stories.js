import SbaTags from './sba-tags.vue';

export default {
  component: SbaTags,
  title: 'SBA Components/Tags',
};

const Template = (args) => ({
  components: {SbaTags},
  setup() { return { args }; },
  template: '<sba-tags v-bind="args" />'
});

export const SingleTag = Template.bind({});
SingleTag.args = {
  tags: {
    'This is a key': 'This a value',
  }
};

export const MultipleTags = Template.bind({});
MultipleTags.args = {
  tags: {
    'This is a key': 'This a value',
    simpleKey: 'value',
  }
};
