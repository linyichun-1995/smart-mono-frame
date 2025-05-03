import type { App } from "vue";

import * as componentObj from "./components";

export default {
  install: (app: App) => {
    for (const key in componentObj) {
      app.component(key, componentObj[key as keyof typeof componentObj]);
    }
  },
};
