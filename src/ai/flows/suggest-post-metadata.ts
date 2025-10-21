'use server';

/**
 * @fileOverview An AI agent that suggests relevant categories and tags for a post based on its content.
 *
 * - suggestPostMetadata - A function that handles the post metadata suggestion process.
 * - SuggestPostMetadataInput - The input type for the suggestPostMetadata function.
 * - SuggestPostMetadataOutput - The return type for the suggestPostMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPostMetadataInputSchema = z.object({
  postContent: z
    .string()
    .describe('The text content of the post for which to suggest metadata.'),
});
export type SuggestPostMetadataInput = z.infer<typeof SuggestPostMetadataInputSchema>;

const SuggestPostMetadataOutputSchema = z.object({
  suggestedCategories: z
    .array(z.string())
    .describe('An array of suggested categories for the post.'),
  suggestedTags: z.array(z.string()).describe('An array of suggested tags for the post.'),
});
export type SuggestPostMetadataOutput = z.infer<typeof SuggestPostMetadataOutputSchema>;

export async function suggestPostMetadata(
  input: SuggestPostMetadataInput
): Promise<SuggestPostMetadataOutput> {
  return suggestPostMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPostMetadataPrompt',
  input: {schema: SuggestPostMetadataInputSchema},
  output: {schema: SuggestPostMetadataOutputSchema},
  prompt: `You are a social media expert. Your task is to suggest relevant categories and tags for a given post content.

  Post Content: {{{postContent}}}

  Please provide an array of suggested categories and an array of suggested tags that are most relevant to the post content.
  Categories should be broad, and tags should be specific.
  Categories are used to categorize the general topic of the post.
  Tags are used to provide more specific keywords for the post.

  Ensure that your output is valid JSON.
  `,
});

const suggestPostMetadataFlow = ai.defineFlow(
  {
    name: 'suggestPostMetadataFlow',
    inputSchema: SuggestPostMetadataInputSchema,
    outputSchema: SuggestPostMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
