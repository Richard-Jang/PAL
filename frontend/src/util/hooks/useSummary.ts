import { GoogleGenerativeAI } from '@google/generative-ai';
import { useApiCall } from './useApiCall';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * Calls the Gemini API via SDK to summarize the given forum post and its replies
 * in 1 to 2 short paragraphs.
 */
async function summarizeWithGemini(text: string): Promise<string> {
  const prompt = `Summarize the following text in 1 to 2 short paragraphs:\n\n${text}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text() || 'No summary generated.';
}

/**
 * Builds the plain-text body to send to Gemini.
 * Includes the post title, post content, and all comments.
 */
export function buildPostContext(post: {
  title: string;
  content: string;
  comments?: Array<{ author: string; content: string }>;
}): string {
  const header = `Post: ${post.title}\n\n${post.content}`;
  const replies =
    post.comments && post.comments.length > 0
      ? '\n\nReplies:\n' +
      post.comments.map((c) => `- ${c.author}: ${c.content}`).join('\n')
      : '';
  return header + replies;
}

/**
 * Hook to provide Gemini summarization functionality.
 */
export function useSummary() {
  const { isLoading, error, execute } = useApiCall<string>(summarizeWithGemini);

  return {
    isSummarizing: isLoading,
    summaryError: error,
    generateSummary: execute,
  };
}
