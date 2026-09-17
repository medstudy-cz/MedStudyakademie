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
      <div className="flex min-h-full flex-1 flex-col bg-[#67dcfe]">
        {children}
      </div>
    </QuizProviderFromRoute>
  );
}
