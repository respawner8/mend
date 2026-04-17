import { SiteHeader } from "@/components/site/site-header";
import { QuizRunner } from "@/components/quiz/quiz-runner";

export default function QuizPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <QuizRunner />
      </main>
    </>
  );
}
