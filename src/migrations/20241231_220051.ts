import {sql, MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres';
 
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    -- Existing table creation and constraints go here
    
    INSERT INTO "categories" ("title", "created_at", "updated_at") VALUES
    ('Technology', now(), now()),
    ('Health', now(), now()),
    ('Lifestyle', now(), now());

    INSERT INTO "posts" ("title", "created_at", "updated_at") VALUES
    ('First Post in Tech', now(), now()),
    ('Health Tips', now(), now()),
    ('Living a Balanced Life', now(), now());

    -- Linking posts with categories via posts_rels table
    INSERT INTO "posts_rels" ("parent_id", "categories_id", "path", "order") VALUES
    ((SELECT "id" FROM "posts" WHERE "title" = 'First Post in Tech'), (SELECT "id" FROM "categories" WHERE "title" = 'Technology'), 'category', 1),
    ((SELECT "id" FROM "posts" WHERE "title" = 'Health Tips'), (SELECT "id" FROM "categories" WHERE "title" = 'Health'), 'category', 2),
    ((SELECT "id" FROM "posts" WHERE "title" = 'Living a Balanced Life'), (SELECT "id" FROM "categories" WHERE "title" = 'Lifestyle'), 'category', 3);
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    DELETE FROM "posts_rels" WHERE "parent_id" IN (
      SELECT "id" FROM "posts" WHERE "title" IN ('First Post in Tech', 'Health Tips', 'Living a Balanced Life')
    );

    DELETE FROM "posts" WHERE "title" IN ('First Post in Tech', 'Health Tips', 'Living a Balanced Life');
    DELETE FROM "categories" WHERE "title" IN ('Technology', 'Health', 'Lifestyle');

    -- Existing table deletion logic goes here
  `);
}
