import {
  ChevronDown,
  LucideHeart,
  LucideSearch,
  LucideUser,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav
      className={`min-h-[170px] px-[150px] py-[25px] bg-smBlack text-white flex items-center justify-between flex-col ${
        location.pathname === "/"
          ? "bg-transparent absolute z-40 w-full"
          : "bg-smBlack static"
      }`}
    >
      {/* TOP */}
      <section className="flex items-center justify-between w-full">
        <div className="min-w-[177px] min-h-[44px] bg-white rounded-full relative flex items-center justify-center px-4">
          <input
            type="search"
            name=""
            id=""
            className="bg-transparent placeholder:text-sm border-none outline-none text-smBlack text-sm"
            placeholder="Search"
          />
          <LucideSearch className="text-[7px] h-4 w-4 absolute right-[16px] text-[#B5B5B5]" />
        </div>

        <div>
          <img src="/sm_logo.svg" alt="" />
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
            <img src="/cart.svg" alt="" className="h-4 w-4" />
          </div>
        </div>
      </section>

      {/* BOTTOM */}
      <section>
        <ul className="space-x-[35px]">
          <Link
            className={`
              hover:text-smGreen hover:underline underline-offset-8 duration-300 transition-colors ${
                location.pathname === "/" ? "text-smGreen underline" : ""
              }
              `}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`
            hover:text-smGreen hover:underline underline-offset-4 duration-300 transition-colors ${
              location.pathname === "/products" ? "text-smGreen underline" : ""
            }
            `}
            to="/products"
          >
            Products
          </Link>
          <Link
            className={`
            hover:text-smGreen hover:underline underline-offset-4 duration-300 transition-colors ${
              location.pathname === "/elements" ? "text-smGreen underline" : ""
            }
            `}
            to="/elements"
          >
            Elements
          </Link>
          <Link
            className={`
            hover:text-smGreen hover:underline underline-offset-4 duration-300 transition-colors ${
              location.pathname === "/pages" ? "text-smGreen underline" : ""
            }
            `}
            to="/pages"
          >
            Pages
          </Link>
          <Link
            className={`
            hover:text-smGreen hover:underline underline-offset-4 duration-300 transition-colors ${
              location.pathname === "/shop" ? "text-smGreen underline" : ""
            }
            `}
            to="/shop"
          >
            Shop
          </Link>
          <Link
            className={`
            hover:text-smGreen hover:underline underline-offset-4 duration-300 transition-colors ${
              location.pathname === "/sale" ? "text-smGreen underline" : ""
            }
            `}
            to="/sale"
          >
            Sale
          </Link>
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
