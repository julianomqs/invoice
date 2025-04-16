import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://server:3000/graphql",
  documents: "src/**/*.ts",
  generates: {
    "src/graphql/": {
      preset: "client",
      config: {
        scalars: {
          Date: "Date"
        },
        skipTypename: true
      }
    }
  }
};

export default config;
