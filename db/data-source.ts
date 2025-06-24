import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    database: 'blabesboxd',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: false,
    logging: true,
};

export default new DataSource(dataSourceOptions);