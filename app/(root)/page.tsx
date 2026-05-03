import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";
import Search from "@/components/Search";
// import { sampleBooks } from "@/lib/constants";

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
        <h1 className="text-[19px] md:text-xl lg:text-2xl  text-black tracking-[-0.02em] leading-8 md:leading-10.5 font-semibold font-serif lg:mb-4">
          Recent Books
        </h1>
        <Search />
      </div>
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
