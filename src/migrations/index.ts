import * as migration_20241231_220035 from './20241231_220035';
import * as migration_20241231_220051 from './20241231_220051';
import * as migration_20241231_220502 from './20241231_220502';
import * as migration_20241231_221804_relationships_v2_v3 from './20241231_221804_relationships_v2_v3';
import * as migration_20241231_222146 from './20241231_222146';

export const migrations = [
  {
    up: migration_20241231_220035.up,
    down: migration_20241231_220035.down,
    name: '20241231_220035',
  },
  {
    up: migration_20241231_220051.up,
    down: migration_20241231_220051.down,
    name: '20241231_220051',
  },
  {
    up: migration_20241231_220502.up,
    down: migration_20241231_220502.down,
    name: '20241231_220502',
  },
  {
    up: migration_20241231_221804_relationships_v2_v3.up,
    down: migration_20241231_221804_relationships_v2_v3.down,
    name: '20241231_221804_relationships_v2_v3',
  },
  {
    up: migration_20241231_222146.up,
    down: migration_20241231_222146.down,
    name: '20241231_222146'
  },
];
