import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset } from "./src/sanity/env";
import { blogPostType } from "./src/sanity/schemas/blogPost";

export default defineConfig({
  basePath: "/studio",
  name: "medstudy-akademie",
  title: "MedStudy Akademie CMS",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Blog Posts")
              .schemaType("blogPost")
              .child(S.documentTypeList("blogPost").title("All Blog Posts")),
          ]),
    }),
  ],
  schema: {
    types: [blogPostType],
  },
});
