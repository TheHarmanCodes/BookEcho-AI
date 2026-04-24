import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";
// import { sampleBooks } from "@/lib/constants";

export const dynamic = "force-dynamic";

const Page = async () => {
  const bookResults = await getAllBooks();
  const books = bookResults.success ? (bookResults.data ?? []) : [];
  return (
    <main className="wrapper container">
      <HeroSection />

      <h1 className="text-[19px] md:text-xl lg:text-2xl  text-black tracking-[-0.02em] leading-8 md:leading-10.5 font-medium lg:mb-4">
        Recent Books
      </h1>
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
