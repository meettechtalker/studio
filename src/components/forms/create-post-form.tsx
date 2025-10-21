"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { createPost } from '@/lib/actions';
import { suggestPostMetadata } from '@/ai/flows/suggest-post-metadata';
import { Loader2, Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react';

const createPostFormSchema = z.object({
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }).max(500),
  sentiment: z.enum(['like', 'dislike'], { required_error: 'You must select a sentiment.' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  tags: z.string().optional(),
  image: z.any().optional(),
});

type CreatePostFormValues = z.infer<typeof createPostFormSchema>;

const categories = ["Technology", "Food", "Travel", "Movies", "Books", "Music", "Lifestyle", "Opinion", "Other"];

export function CreatePostForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      content: '',
      tags: '',
    },
    mode: 'onChange',
  });

  async function handleAiSuggest() {
    const content = form.getValues('content');
    if (!content || content.length < 10) {
      toast({
        title: 'Content too short',
        description: 'Please write a bit more before using AI suggestions.',
        variant: 'destructive',
      });
      return;
    }
    setIsAiLoading(true);
    try {
      const result = await suggestPostMetadata({ postContent: content });
      if (result.suggestedCategories[0] && categories.includes(result.suggestedCategories[0])) {
        form.setValue('category', result.suggestedCategories[0], { shouldValidate: true });
      }
      form.setValue('tags', result.suggestedTags.join(', '), { shouldValidate: true });
      toast({
        title: 'AI Suggestions Applied!',
        description: 'Category and tags have been populated.',
      });
    } catch (error) {
      toast({
        title: 'Error with AI Suggestion',
        description: 'Could not get suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAiLoading(false);
    }
  }

  async function onSubmit(data: CreatePostFormValues) {
    setIsSubmitting(true);
    try {
      await createPost(data);
      toast({
        title: 'Post Created!',
        description: 'Your preference has been shared with the world.',
      });
      router.push('/home');
    } catch (error) {
      toast({
        title: 'Failed to Create Post',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="sentiment"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="font-headline">Is this a like or a dislike?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex-1">
                    <FormControl>
                      <RadioGroupItem value="like" id="like" className="sr-only" />
                    </FormControl>
                    <FormLabel htmlFor="like" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-success [&:has([data-state=checked])]:bg-success/10 cursor-pointer">
                      <ThumbsUp className="mb-3 h-6 w-6 text-success" />
                      Like
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex-1">
                    <FormControl>
                      <RadioGroupItem value="dislike" id="dislike" className="sr-only" />
                    </FormControl>
                    <FormLabel htmlFor="dislike" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-destructive [&:has([data-state=checked])]:bg-destructive/10 cursor-pointer">
                      <ThumbsDown className="mb-3 h-6 w-6 text-destructive" />
                      Dislike
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline">Your Thoughts</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell everyone what you think..."
                  className="min-h-32 resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-headline">Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-headline">Tags</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. tech, review, opinion" {...field} />
                </FormControl>
                <FormDescription>Separate tags with commas.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={handleAiSuggest} disabled={isAiLoading || isSubmitting}>
              {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Suggest with AI
            </Button>
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline">Add an Image</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" {...form.register('image')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Posting...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
