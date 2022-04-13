import "../src/main/frontend/index.css";
import "./storybook.css";

import { app } from '@storybook/vue3';
import components from "@/components";
import i18n from "@/i18n";
import mappingsEndpoint from '@/mocks/instance/mappings';

import { initialize, mswDecorator } from 'msw-storybook-addon';

initialize();

app.use(components);
app.use(i18n);

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: {
    handlers: {
      auth: null,
      others: [...mappingsEndpoint]
    }
  }
}
