import Link from "next/link";
import Image from "next/image";

const links = [
  {
    title: "Solution",
    href: "#",
  },
  {
    title: "Customers",
    href: "#",
  },
  {
    title: "Pricing",
    href: "/subscriptions",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "About",
    href: "#",
  },
];

const Footer = () => {
  return (
    <footer className="bg-background border-t pt-8">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
            <Link
              href="/"
              aria-label="Go home"
              className="flex items-center gap-0.5"
            >
              <Image
                src="/assets/logo.png"
                alt="BookEcho"
                width={44}
                height={43}
                className="brightness-100 contrast-100"
              />
              <span className="logo-text">BookEcho</span>
            </Link>
            <span className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} BookEcho, All rights reserved
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-end">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors duration-150"
              >
                <p>{link.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Large Footer Text */}
      <div className="relative hidden lg:flex justify-center mt-10 overflow-hidden">
        {/* Fade Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background z-10" />

        <h1
          className="text-[11rem] xl:text-[15rem] font-black leading-none text-transparent whitespace-nowrap select-none"
          style={{
            WebkitTextStroke: "2px rgba(241, 181, 24, 0.35)",
          }}
        >
          BookEcho
        </h1>
      </div>
    </footer>
  );
};
export default Footer;
