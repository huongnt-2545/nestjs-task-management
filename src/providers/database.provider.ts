import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'postgres',
        database: 'task_management',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        migrations: ['migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
      }),
  },
];
