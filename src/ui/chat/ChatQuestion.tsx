export const ChatQuestion = ({ question }: { question?: string }) => {
  if (!question) return null;
  return (
    <section
      title="Question"
      className="font-bold text-base leading-6 text-themeBlue py-6"
    >
      <p>{question}</p>
    </section>
  );
};
