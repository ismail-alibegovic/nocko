import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { fraunces, manrope } from "./fonts";

export const metadata: Metadata = {
  title: "404 · Noćko",
  robots: { index: false, follow: false },
};

/** Served for URLs that match no route in either language tree. */
export default function GlobalNotFound() {
  return (
    <html lang="bs" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh items-center bg-navy text-cream">
        <main className="container-x py-24">
          <p className="display display-italic display-xl text-[8rem] leading-none text-gold sm:text-[12rem]">404</p>
          <h1 className="display mt-4 text-5xl sm:text-6xl">Stranica nije pronađena.</h1>
          <p className="mt-3 text-lg text-cream/70" lang="en">
            Page not found.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-gold px-7 py-4 font-semibold text-navy">
              Nazad na početnu
            </Link>
            <Link href="/en" lang="en" className="rounded-full border border-cream/40 px-7 py-4 font-semibold">
              Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
