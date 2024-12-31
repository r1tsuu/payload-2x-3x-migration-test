import path from "path";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload";

import Users from "./collections/Users";

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: slateEditor({}),
  collections: [
    Users,
    {
      slug: "categories",
      fields: [
        {
          name: "title",
          type: "text",
        },
      ],
    },
    {
      slug: "posts",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "category",
          type: "relationship",
          relationTo: "categories",
        },
      ],
    },
  ],
  secret: "Asd",
  typescript: {
    outputFile: path.resolve(import.meta.dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(
      import.meta.dirname,
      "generated-schema.graphql"
    ),
  },
  db: postgresAdapter({
    logger: true,
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
});
