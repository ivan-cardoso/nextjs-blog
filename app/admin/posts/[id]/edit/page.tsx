/* import { prisma } from "@/lib/prisma";
import { PostForm } from "@/app/ui/admin/post-form";

export default async function EditPostPage(context: {
  params: { id: string };
}) {
  const { id } = context.params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { tags: true, categories: true },
  });

  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();

  if (!post) return <div>Post not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostForm
        initialData={{
          id: post.id,
          title: post.title,
          description: post.description,
          content: post.content as string,
          category: post.categories,
          tags: post.tags,
        }}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
 */
// app/admin/posts/[id]/edit/page.tsx

/* 
import { prisma } from "@/lib/prisma";
import { PostForm } from "@/app/ui/admin/post-form";
import { Category, Tag } from "@/lib/generated/prisma";
// import { notFound } from 'next/navigation'; // For a proper 404

// Define a more specific type for the data passed to PostForm, including related models
interface PostFormData {
  id: string;
  title: string;
  description: string;
  content: string;
  category: Category[]; // Assuming these are the full Category objects
  tags: Tag[]; // Assuming these are the full Tag objects
}

// Type the page component's props directly
export default async function EditPostPage({
  params,
}: {
  params: { id: string }; // This is the standard way Next.js App Router passes dynamic params
  // searchParams?: { [key: string]: string | string[] | undefined }; // Include if you use searchParams
}) {
  const { id } = params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      tags: true,
      categories: true,
    },
  });

  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();

  if (!post) {
    // For a real 404 page, uncomment the next line and the import above
    // notFound();
    return <div className="p-6 text-center text-red-500">Post not found</div>;
  }

  const initialFormData: PostFormData = {
    id: post.id,
    title: post.title,
    description: post.description,
    content: post.content, // Assuming post.content is already a string
    category: post.categories,
    tags: post.tags,
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 dark:text-gray-100">
        Edit Post:{" "}
        <span className="text-sky-600 dark:text-sky-400">{post.title}</span>
      </h1>
      <PostForm
        initialData={initialFormData}
        categories={categories}
        tags={tags}
        // isEditing={true}
      />
    </div>
  );
}
 */

// No custom interfaces, just direct typing for params
export default async function MinimalTestPage({
  params: paramsProp, // Rename the incoming prop to avoid conflict
}: {
  params: { id: string }; // This is what Next.js should be passing
}) {
  // Attempt to await the params prop as suggested by the runtime warning.
  // This is highly unusual for page params but is a diagnostic step.
  // If `paramsProp` isn't actually a Promise, this `await` might not
  // change its nature, but we're following the error's suggestion.
  const params = await paramsProp;

  // Now, try to access id from the (potentially awaited) params
  const { id } = params;

  return (
    <div>
      <h1>Test Page</h1>
      <p>Post ID: {id}</p>
      <p>Type of paramsProp: {typeof paramsProp}</p>
      <p>Type of params after await: {typeof params}</p>
      <p>
        Is paramsProp a Promise? {paramsProp instanceof Promise ? "Yes" : "No"}
      </p>
    </div>
  );
}
