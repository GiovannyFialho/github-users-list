import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "app/graphql/schema.docs.graphql",
  documents: ["app/graphql/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "app/graphql/generated/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ]
    }
  }
};

export default config;
