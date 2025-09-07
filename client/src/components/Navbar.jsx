import {
  ChevronDown,
  LucideHeart,
  LucideSearch,
  LucideUser,
  Menu,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/elements", label: "Elements" },
  { to: "/pages", label: "Pages" },
  { to: "/shop", label: "Shop" },
  { to: "/sale", label: "Sale" },
];

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const lastY = useRef(0);
  const mqlRef = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)")
      : {
          matches: true,
          addEventListener: () => {},
          removeEventListener: () => {},
        }
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      if (!mqlRef.current.matches) return; // only on small screens
      if (!isHome) return; // home only
      const y = window.scrollY;
      const goingUp = y < lastY.current;
      // show solid when scrolling up beyond a small threshold, otherwise transparent
      if (goingUp && y > 10) setSolid(true);
      if (!goingUp) setSolid(false);
      if (y <= 10) setSolid(false);
      lastY.current = y;
    };

    const onChange = () => {
      // reset when breakpoint changes
      setSolid(false);
      lastY.current = window.scrollY || 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    mqlRef.current.addEventListener?.("change", onChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mqlRef.current.removeEventListener?.("change", onChange);
    };
  }, [isHome]);

  const linkClass = (to) =>
    `block py-2 hover:text-smGreen hover:underline underline-offset-4 transition-colors ${
      location.pathname === to ? "text-smGreen underline" : ""
    }`;

  // Mobile bar classes:
  const mobileBar =
    open || !isHome
      ? "bg-white text-gray-900 border-b"
      : solid
      ? "bg-white text-gray-900 border-b"
      : "bg-transparent text-white";

  return (
    <>
      {/* MOBILE HEADER (sm) with transparent->solid on upward scroll, fixed top */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${mobileBar}`}
      >
        <div className="mx-auto max-w-screen-2xl px-4 h-16 flex items-center justify-between">
          {/* left: hamburger */}
          <button
            className="inline-flex items-center justify-center rounded-lg p-2 ring-1 ring-current/20 transition"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="w-5 h-5 transition-transform duration-200 rotate-90" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-200" />
            )}
          </button>

          {/* center: logo */}
          <Link to="/" className="inline-flex items-center">
            <img src="/sm_logo.svg" alt="SimpleWood" className="h-7" />
          </Link>

          {/* right: search + cart */}
          <div className="flex items-center gap-4">
            <button aria-label="Search">
              <LucideSearch className="h-5 w-5" />
            </button>

            <Link to="/cart" className="relative inline-flex" aria-label="Cart">
              <span className="w-5 h-5 bg-smGreen text-white rounded-full flex items-center justify-center text-[10px] absolute -right-2 -top-2">
                2
              </span>
              <img src="/cart.svg" alt="Cart" className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* mobile drawer + overlay */}
        <div
          className={`fixed inset-0 z-50 md:hidden ${
            open ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div
            onClick={() => setOpen(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />
          <aside
            id="mobile-drawer"
            className={`absolute left-0 top-0 h-full w-72 bg-white text-gray-900 shadow-xl transform transition-transform duration-300 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 border-b">
              <div className="relative flex items-center">
                <input
                  type="search"
                  className="w-full bg-gray-100 rounded-full px-4 py-2 pr-10 outline-none"
                  placeholder="Search"
                />
                <LucideSearch className="absolute right-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <nav className="p-4">
              <ul className="space-y-3">
                {LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className={linkClass(l.to)}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span>English</span> <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2">
                  <span>USD</span> <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <LucideHeart className="h-5 w-5" />
                  <LucideUser className="h-5 w-5" />
                </div>
              </div>
            </nav>
          </aside>
        </div>
      </nav>

      {/* DESKTOP/TABLET NAV (md+) — original preserved */}
      <nav
        className={`hidden md:flex min-h-[170px] px-[150px] py-[25px] text-white flex-col ${
          isHome ? "bg-transparent absolute z-40 w-full" : "bg-smBlack static"
        }`}
      >
        {/* TOP */}
        <section className="flex items-center justify-between w-full">
          <div className="min-w-[177px] min-h-[44px] bg-white rounded-full relative flex items-center justify-center px-4">
            <input
              type="search"
              className="bg-transparent placeholder:text-sm border-none outline-none text-smBlack text-sm"
              placeholder="Search"
            />
            <LucideSearch className="text-[7px] h-4 w-4 absolute right-[16px] text-[#B5B5B5]" />
          </div>

          <div>
            <img src="/sm_logo.svg" alt="SimpleWood" />
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center justify-center gap-2">
              <span>English</span> <ChevronDown className="w-4 h-4 mt-1" />
            </span>
            <span className="flex items-center justify-center gap-2">
              <span>USD</span> <ChevronDown className="w-4 h-4 mt-1" />
            </span>

            <LucideHeart className="h-4 w-4 cursor-pointer" />
            <LucideUser className="h-4 w-4 cursor-pointer" />

            <div className="relative">
              <span className="w-3 h-3 bg-smGreen text-white rounded-full flex items-center justify-center text-xs absolute -right-1 -top-1">
                2
              </span>
              <img src="/cart.svg" alt="Cart" className="h-4 w-4" />
            </div>
          </div>
        </section>

        {/* BOTTOM */}
        <section>
          <ul className="space-x-[35px]">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                className={`hover:text-smGreen hover:underline underline-offset-4 duration-300 transition-colors ${
                  location.pathname === l.to ? "text-smGreen underline" : ""
                }`}
                to={l.to}
              >
                {l.label}
              </Link>
            ))}
          </ul>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
