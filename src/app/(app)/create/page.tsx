import { CreatePostForm } from "@/components/forms/create-post-form";

export default function CreatePostPage() {
  return (
    <div className="max-w-2xl mx-auto w-full space-y-6">
      <h1 className="text-3xl font-headline font-bold">Create Post</h1>
      <p className="text-muted-foreground">Share what's on your mind. Is it a like or a dislike?</p>
      <CreatePostForm />
    </div>
  );
}
