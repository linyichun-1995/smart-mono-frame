import presetWind4 from '@unocss/preset-wind4';
import presetAttributify from '@unocss/preset-attributify';
import { defineConfig } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import path from 'path';

export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify({
      /* preset options */
    }),
    presetIcons({
      extraProperties: {
        width: '1em',
        height: '1em',
      },
      customizations: {
        customize(props) {
          props.width = '1em';
          props.height = '1em';

          return props;
        },
      },
      collections: {
        'my-yet-other-icons': FileSystemIconLoader(
          path.resolve(__dirname, './apps/vue-element-plus/src/assets'),
        ),
      },
    }),
  ],
});
