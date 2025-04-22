"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import ReactMarkdown from "react-markdown";
import { CreatableMultiSelect } from "../inputs/creatable-multiselect";

type DeleteButtonProps = {
  postId: string;
};

export function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async (postId: string) => {
    const res = await fetch(`/api/posts/${postId}/delete`, {
      method: "DELETE",
    });
    if (res.ok) {
      /*  alert({
        title: "Post deleted",
        description: "The post was deleted successfully.",
      }); */
      router.push("/admin/posts");
      router.refresh();
    } else {
      alert({
        title: "Error deleting post",
        description: "Something went wrong while deleting the post.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" type="button">
          Delete Post
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(postId)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
