import { CONVERSATION_RESPONSE } from "../response_generating/response_utilities";

const textToResponseURL =
  "https://europe-west1-talkgpt-8b68a.cloudfunctions.net/textToResponse";


export async function getResponseAndBase64AudioFromPrompt(
  prompt: CONVERSATION_RESPONSE
): Promise<[string, string]> {
  type BODY_TYPE = {
    response: string;
    prompt: string;
    audio: string;
  };
  const res: Response = await fetch(textToResponseURL, {
    method: "POST",
    body: JSON.stringify(prompt),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(JSON.stringify(res, null, 2))
  const responseObject: BODY_TYPE = JSON.parse(await res.text());
  if (res.status == 200) {
    return Promise.resolve([responseObject.response, responseObject.audio]);
  }
  return Promise.reject();
}
