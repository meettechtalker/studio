'use server';

import { z } from 'zod';

const createPostFormSchema = z.object({
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }).max(500),
  sentiment: z.enum(['like', 'dislike'], { required_error: 'You must select a sentiment.' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  tags: z.string().optional(),
  image: z.any().optional(),
});

export async function createPost(values: z.infer<typeof createPostFormSchema>) {
  const validatedFields = createPostFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post.',
    };
  }

  // In a real app, you'd process the data and save it to your database.
  // For example, with Supabase:
  // const { data, error } = await supabase.from('posts').insert([ ... ]);

  console.log('Creating post with values:', validatedFields.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Revalidate path if using server-side data fetching and mutations
  // revalidatePath('/home');
  // redirect('/home');
}
