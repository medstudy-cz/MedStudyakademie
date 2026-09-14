import { QuizProviderFromRoute } from "@/features/quiz/components/QuizProviderFromRoute";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuizProviderFromRoute>
      <main className="min-h-screen flex-1 bg-[#f6fcff]">{children}</main>
    </QuizProviderFromRoute>
  );
}
