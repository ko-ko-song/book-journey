"use client";
import React from "react";
import deletePost from "@/app/actions/deletePost";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

function PostActionButtons({ postId }: { postId: number }) {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const boolean = confirm("정말로 삭제하시겠습니까?");
    if (boolean) {
      const result = await deletePost(postId);
      if (result) queryClient.invalidateQueries({ queryKey: ["userOwnPosts"] });
    }
  };

  return (
    <div className="flex gap-2 opacity-0 group-hover:opacity-100">
      <div className="px-4 py-1 border-2">
        <Link href={`/posts/edit/${postId}`}>수정</Link>
      </div>
      <button onClick={handleDelete} className="px-4 py-1 border-2">
        삭제
      </button>
    </div>
  );
}

export default PostActionButtons;
