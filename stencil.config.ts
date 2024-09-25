import { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import nested from 'postcss-nested';
import cssnano from 'cssnano';

export const config: Config = {
  namespace: 'customer-feedback',
  plugins: [
    postcss({
      plugins: [nested(), cssnano()],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
      footer: '',
      strict: true,
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: 'images' }],
    },
  ],
};
