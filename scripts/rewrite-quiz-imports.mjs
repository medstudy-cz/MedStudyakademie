import fs from "fs";
import path from "path";

const root = "D:/medstady/medstudy-akademie-web/src/features/quiz";

const replacements = [
  ["@/components/quiz/", "@/features/quiz/components/quiz/"],
  ["@/components/ui/", "@/features/quiz/components/ui/"],
  ["@/components/navbar", "@/features/quiz/components/QuizNavbar"],
  ["@/components/QuizProviderFromRoute", "@/features/quiz/components/QuizProviderFromRoute"],
  ["@/context/QuizContext", "@/features/quiz/context/QuizContext"],
  ["@/services/", "@/features/quiz/services/"],
  ["@/utils/", "@/features/quiz/utils/"],
  ["@/dictionaries/", "@/features/quiz/dictionaries/"],
  ["@/integrations/", "@/features/quiz/integrations/"],
  ["@/sanity/lib/types", "@/features/quiz/sanity/types"],
  ["@/sanity/lib/api", "@/features/quiz/sanity/api"],
  ["@/sanity/lib/queries", "@/features/quiz/sanity/queries"],
  ["@/data/", "@/features/quiz/data/"],
  ['src="/main.png"', 'src="/quiz/main.png"'],
  ["src='/main.png'", "src='/quiz/main.png'"],
  ['"/back.png"', '"/quiz/back.png"'],
  ["'/back.png'", "'/quiz/back.png'"],
  ['"/studentIcon.png"', '"/quiz/studentIcon.png"'],
  ['"/parentsIcon.png"', '"/quiz/parentsIcon.png"'],
  ['"/checkCircle.svg"', '"/quiz/checkCircle.svg"'],
];

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(ent.name)) {
      let s = fs.readFileSync(p, "utf8");
      const orig = s;
      for (const [from, to] of replacements) {
        s = s.split(from).join(to);
      }
      if (s !== orig) {
        fs.writeFileSync(p, s);
        console.log("updated", p);
      }
    }
  }
}

walk(root);
console.log("done");
