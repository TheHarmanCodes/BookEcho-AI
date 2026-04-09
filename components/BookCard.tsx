import { BookCardProps } from "@/types";

import Link from "next/link";
import Image from "next/image";

const BookCard = ({ title, author, slug, coverURL }: BookCardProps) => {
  return (
    <Link href={`/books/${slug}`}>
      <article>
        <figure className="book-card">
          <div className="book-card-cover-wrapper">
            <Image
              src={coverURL}
              alt={title}
              fill
              className="book-card-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="book-card-meta">
            <h3 className="book-card-title">{title}</h3>
            <p className="book-card-author">{author}</p>
          </figcaption>
        </figure>
      </article>
    </Link>
  );
};

export default BookCard;
