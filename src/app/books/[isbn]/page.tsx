import searchBooks from "@/app/actions/searchBooks";
import dayjs from "dayjs";
import Image from "next/image";
import { notFound } from "next/navigation";
import getPostsByISBN from "./_lib/getPostsWithUserProfileByIsbn";
import PostPreviewForBook from "./_components/PostPreviewForBook";
import Link from "next/link";
import BookDetail from "./_components/BookDetail";
import { getBooks } from "@/app/_lib/forGenerateStaticParams/getBooks";
import { getBook } from "@/app/_lib/forGenerateStaticParams/getBook";
import { Metadata } from "next";

type Props = {
  params: {
    isbn: string;
  };
};

export default async function Page({ params }: Props) {
  let { isbn } = params;

  const response = await searchBooks(isbn, 5, 1);
  if (response?.documents.length === 0) notFound();
  const book = response?.documents[0];
  if (!book) notFound();
  const postWithProfiles = await getPostsByISBN(isbn);

  return (
    <div className="w-[800px] bg-white border">
      <BookDetail book={book} />
      <div className="flex justify-end items-center my-2 mx-2">
        <div className="px-4 py-2 rounded-xl border hover:bg-slate-100">
          <Link href={`/posts/new?isbn=${isbn}`}>글 쓰기</Link>
        </div>
      </div>
      <div className="border-t-2">
        <ul>
          {postWithProfiles?.map((postWithProfile) => (
            <PostPreviewForBook key={postWithProfile.id} postWithProfile={postWithProfile} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const books = await getBooks();
  if (!books) return [];
  return books?.map((book) => ({
    isbn: book.isbn,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBook(params.isbn);
  if (!book) return { title: "Book Not Found" };
  return { title: `${book.title} 책 정보` };
}
