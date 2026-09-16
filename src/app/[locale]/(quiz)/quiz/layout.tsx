import { QuizProviderFromRoute } from "@/features/quiz/components/QuizProviderFromRoute";
import { QuizLeaveGuard } from "@/features/quiz/components/QuizLeaveGuard";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuizProviderFromRoute>
      <QuizLeaveGuard />
      <div className="bg-[#f6fcff]">{children}</div>
    </QuizProviderFromRoute>
  );
}
