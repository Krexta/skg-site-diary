// cSpell:ignore lcov
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/domain/repository',
        '**/utility',
        '**/index.ts',
        '**/*spec.ts',
        'src/main.ts',
        'src/module',
        'src/infrastructure/service',
        'src/presentation/middleware',
      ],
      reportsDirectory: './coverage',
      reporter: ['text', 'html', 'lcov', 'json-summary', 'json'],
    },
  },
});
