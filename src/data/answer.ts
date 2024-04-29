import { createRequest } from "@/util/requests";

export const getAnswer = async (
  question: string
): Promise<string | undefined> => {
  const answerResponse = await createRequest<{
    response: string;
  }>("Demo", {
    action: "getAnswer",
    question,
  });

  if (answerResponse.data) {
    return answerResponse.data.response;
  }
};
