import { NextResponse, type NextRequest } from "next/server";
import { products } from "@/data/products";

const slugs = new Set(products.map((p) => p.slug));

/**
 * Product pages are streamed (Partial Prerendering), so a notFound() inside the
 * page arrives after a 200 status has been sent. Rejecting unknown slugs here
 * gives crawlers and link checkers a real 404.
 */
export function proxy(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/(?:proizvodi|en\/products)\/([^/]+)\/?$/);
  if (match && !slugs.has(decodeURIComponent(match[1]))) {
    return NextResponse.rewrite(new URL("/__not-found", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/proizvodi/:slug", "/en/products/:slug"],
};
