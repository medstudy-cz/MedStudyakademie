import { QuizPageContent } from "@/features/quiz/components/quiz/QuizPageContent";

type Props = {
  params: Promise<{ locale: string; quizSlug: string }>;
};

export default async function QuizSlugPage(_props: Props) {
  return <QuizPageContent />;
}
