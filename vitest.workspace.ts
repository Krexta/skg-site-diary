// cSpell:ignore unplugin
import swc from 'unplugin-swc';
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      name: 'src',
      globals: true,
      root: './',
    },
    resolve: {
      alias: {
        'src/': `${__dirname}/src/`,
      },
    },
    plugins: [
      swc.vite({
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            dynamicImport: true,
            decorators: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
          target: 'es2022',
          loose: false,
        },
        module: { type: 'es6' },
      }),
    ],
  },
  {
    test: {
      name: 'e2e',
      include: ['**/*.e2e-spec.ts'],
      globals: true,
      root: './',
    },
    resolve: {
      alias: {
        'src/': `${__dirname}/src/`,
      },
    },
    plugins: [
      swc.vite({
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            dynamicImport: true,
            decorators: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
          target: 'es2022',
          loose: false,
        },
      }),
    ],
  },
]);
