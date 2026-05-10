import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";
import Search from "@/components/Search";

export const dynamic = "force-dynamic";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const { query } = await searchParams;
  const bookResults = await getAllBooks(query);
  const books = bookResults.success ? (bookResults.data ?? []) : [];
  return (
    <main className="wrapper container">
      <HeroSection />
      {books.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
          <h1 className="text-[19px] md:text-xl lg:text-2xl  text-black tracking-[-0.02em] leading-8 md:leading-10.5 font-semibold font-serif lg:mb-4">
            Recent Books
          </h1>
          <Search />
        </div>
      )}
      {bookResults.success && books.length == 0 && (
        <p className="mb-10 text-sm text-gray-600 md:text-base">
          Upload a book to start learning and build your personal library.
        </p>
      )}
      {!bookResults.success && (
        <p className="mb-10 text-sm text-red-600 md:text-base">
          We couldn’t load your library right now. Please try again.
        </p>
      )}

      <div className="library-books-grid">
        {books.map((book) => (
          <BookCard
            key={book._id}
            title={book.title}
            author={book.author}
            coverURL={book.coverURL}
            slug={book.slug}
          />
        ))}
      </div>
    </main>
  );
};

export default Page;
