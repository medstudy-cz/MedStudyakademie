import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset } from "./src/sanity/env";
import { blogPostType } from "./src/sanity/schemas/blogPost";
import quizType from "./src/sanity/schemas/quiz";
import simpleQuestionType from "./src/sanity/schemas/simpleQuestion";

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
            S.listItem()
              .title("Quizzes")
              .schemaType("quiz")
              .child(S.documentTypeList("quiz").title("All Quizzes")),
            S.listItem()
              .title("Quiz Questions")
              .schemaType("simpleQuestion")
              .child(
                S.documentTypeList("simpleQuestion").title("All Questions"),
              ),
          ]),
    }),
  ],
  schema: {
    types: [blogPostType, quizType, simpleQuestionType],
  },
});
