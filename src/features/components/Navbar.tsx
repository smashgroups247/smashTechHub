// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Rocket, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
// import { assets } from "../../../assets/assets";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProductsOpen, setIsProductsOpen] = useState(false);
//   const [hoveredItem, setHoveredItem] = useState("Ecommerce"); // default
//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         e.target instanceof Node &&
//         !dropdownRef.current.contains(e.target)
//       ) {
//         setIsProductsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Product groups
//   const productGroups = [
//     { title: "Most Viewed", items: ["Ecommerce", "Estate management", "Accounting"] },
//     { title: "Management", items: ["Expense Management", "Attendance management", "Employee Verification"] },
//     { title: "Platforms", items: ["Dating", "Ride-hailing", "Food-delivery"] },
//     { title: "Industries", items: ["Fintech", "Logistics", "Church"] },
//   ];

//   // Details for right column
//   const productDetails: Record<
//     string,
//     Array<{ title: string; description: string; image: string }>
//   > = {
//     Ecommerce: [
//       { title: "Smashwise", description: "Buy anything, sell everything", image: assets.smashwise },
//       { title: "Smashwise", description: "Buy anything, sell everything", image: assets.smashwise },
//       { title: "Smashwise", description: "Buy anything, sell everything", image: assets.smashwise }

//     ],
//     "Estate management": [
//       { title: "Paradise Estate", description: "Manage your properties", image: assets.paradise },
//       { title: "Paradise Estate", description: "Manage your properties", image: assets.paradise },
//       { title: "Paradise Estate", description: "Manage your properties", image: assets.paradise }
//     ],
//     Accounting: [
//       { title: "Smashoffice", description: "Manage your accounting", image: assets.smashTechnology_logo },
//       { title: "Smashoffice", description: "Manage your accounting", image: assets.smashTechnology_logo },
//       { title: "Smashoffice", description: "Manage your accounting", image: assets.smashTechnology_logo }

//     ],
//     "Expense Management": [
//       { title: "SmashInvoice", description: "Track expenses easily", image: assets.smashTechnology_logo },
//       { title: "SmashInvoice", description: "Track expenses easily", image: assets.smashTechnology_logo },
//       { title: "SmashInvoice", description: "Track expenses easily", image: assets.smashTechnology_logo }

//     ],
//     "Attendance management": [
//       { title: "Smashoffice", description: "Smart attendance tracking", image: assets.smashTechnology_logo },
//       { title: "Smashoffice", description: "Smart attendance tracking", image: assets.smashTechnology_logo },
//       { title: "Smashoffice", description: "Smart attendance tracking", image: assets.smashTechnology_logo }
//     ],
//     "Employee Verification": [
//       { title: "Smashverify", description: "Manage your staff", image: assets.smashTechnology_logo },
//       { title: "Smashverify", description: "Manage your staff", image: assets.smashTechnology_logo },
//       { title: "Smashverify", description: "Manage your staff", image: assets.smashTechnology_logo }

//     ],
//     Dating: [
//       { title: "Qiimeet", description: "Find Love, Make it Last", image: assets.qiimeet },
//       { title: "Qiimeet", description: "Find Love, Make it Last", image: assets.qiimeet },
//       { title: "Qiimeet", description: "Find Love, Make it Last", image: assets.qiimeet }
//     ],
//     "Ride-hailing": [
//       { title: "Ridesmash", description: "Ride in Style, Ride in Comfort", image: assets.ridesmash },
//       { title: "Ridesmash", description: "Ride in Style, Ride in Comfort", image: assets.ridesmash },
//       { title: "Ridesmash", description: "Ride in Style, Ride in Comfort", image: assets.ridesmash }
//     ],
//     "Food-delivery": [
//       { title: "Smashfood", description: "Tasty meals at all times", image: assets.smashfood },
//       { title: "Smashfood", description: "Tasty meals at all times", image: assets.smashfood },
//       { title: "Smashfood", description: "Tasty meals at all times", image: assets.smashfood }
//     ],
//     Fintech: [
//       { title: "SmashRemit", description: "Manage your payments", image: assets.smashRemit },
//       { title: "SmashRemit", description: "Manage your payments", image: assets.smashRemit },
//       { title: "SmashRemit", description: "Manage your payments", image: assets.smashRemit }
//     ],
//     Logistics: [
//       { title: "SmashLogistics", description: "Send parcel seamlessly", image: assets.smashLogistics_logo },
//       { title: "SmashLogistics", description: "Send parcel seamlessly", image: assets.smashLogistics_logo },
//       { title: "SmashLogistics", description: "Send parcel seamlessly", image: assets.smashLogistics_logo }
//     ],
//     Church: [
//       { title: "Church", description: "Manage your church seamlessly", image: assets.smashTechnology_logo },
//       { title: "Church", description: "Manage your church seamlessly", image: assets.smashTechnology_logo },
//       { title: "Church", description: "Manage your church seamlessly", image: assets.smashTechnology_logo }
//     ],
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
//         {/* Logo */}
//         <Link href="/" className="relative w-40 h-12">
//           <Image src={assets.Logo} alt="Logo" fill className="object-contain" />
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-8 text-sm">
//           <Link href="#" className="text-white/80 hover:text-white">
//             Home
//           </Link>
//           <Link href="#" className="text-white/80 hover:text-white">
//             About
//           </Link>

//           {/* Products Mega Menu */}
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setIsProductsOpen((prev) => !prev)}
//               className="flex items-center gap-2 text-white/80 hover:text-white"
//             >
//               Products
//               <ChevronDown
//                 className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : ""
//                   }`}
//               />
//             </button>

//             {isProductsOpen && (
//               <div className="absolute left-1/2 top-full z-40 -translate-x-1/2 mt-6 w-[1300px] bg-white  shadow-2xl p-8">
//                 <div className="max-w-7xl mx-auto grid grid-cols-[280px_1fr] gap-12">
//                   {/* LEFT COLUMN */}
//                   <div className="bg-orange-50 rounded-2xl p-6">
//                     <ul className="space-y-3.5">
//                       {productGroups
//                         .flatMap((group) => group.items)
//                         .map((item) => (
//                           <li
//                             key={item}
//                             onMouseEnter={() => setHoveredItem(item)}
//                             className={`flex justify-between items-center text-sm text-gray-700 transition hover:text-orange-500 cursor-pointer ${hoveredItem === item ? "font-semibold text-orange-500" : ""
//                               }`}
//                           >
//                             <span>{item}</span>
//                             <ChevronRight
//                               className={`w-4 h-4 text-orange-500 transition-transform ${hoveredItem === item ? "rotate-0 opacity-100" : "rotate-0 opacity-0"
//                                 }`}
//                             />
//                           </li>
//                         ))}
//                     </ul>

//                   </div>

//                   {/* RIGHT COLUMN */}
//                   <div className="grid grid-cols-3 gap-6">
//                     {(productDetails[hoveredItem] || []).map((product, idx) => (
//                       <a
//                         key={idx}
//                         href="#"
//                         className="group flex flex-row gap-3 p-4 rounded-2xl hover:bg-gray-50 transition"
//                       >
//                         <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-md">
//                           <Image
//                             src={product.image}
//                             alt={product.title}
//                             className=""
//                             priority
//                           />
//                         </div>
//                         <div>
//                           <h4 className="font-bold text-gray-900 mb-1 group-hover:text-orange-500 transition">
//                             {product.title}
//                           </h4>
//                           <p className="text-sm text-gray-600 leading-snug">
//                             {product.description}
//                           </p>
//                         </div>
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <Link href="#" className="text-white/80 hover:text-white">
//             Pricing
//           </Link>
//           <Link href="#" className="text-white/80 hover:text-white">
//             Contact
//           </Link>
//         </div>

//         {/* CTA */}
//         <button className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full">
//           Start a Project <Rocket className="w-4 h-4" />
//         </button>

//         {/* Mobile Toggle */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden text-white"
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 space-y-4">
//           {["Home", "About", "Products", "Pricing", "Contact"].map((item) => (
//             <Link
//               key={item}
//               href="#"
//               className="block text-white text-lg"
//               onClick={() => setIsOpen(false)}
//             >
//               {item}
//             </Link>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rocket, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { assets } from "../../../assets/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("Ecommerce"); // default
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Product groups
  const productGroups = [
    { title: "Most Viewed", items: ["Ecommerce", "Estate management", "Accounting"] },
    { title: "Management", items: ["Expense Management", "Attendance management", "Employee Verification"] },
    { title: "Platforms", items: ["Dating", "Ride-hailing", "Food-delivery"] },
    { title: "Industries", items: ["Fintech", "Logistics", "Church"] },
  ];

  // Details for right column
  const productDetails: Record<
    string,
    Array<{ title: string; description: string; image: string }>
  > = {
    Ecommerce: [
      { title: "Smashwise", description: "Buy anything, sell everything", image: assets.smashwise },
      { title: "Smashwise", description: "Buy anything, sell everything", image: assets.smashwise },
      { title: "Smashwise", description: "Buy anything, sell everything", image: assets.smashwise }
    ],
    "Estate management": [
      { title: "Paradise Estate", description: "Manage your properties", image: assets.paradise },
      { title: "Paradise Estate", description: "Manage your properties", image: assets.paradise },
      { title: "Paradise Estate", description: "Manage your properties", image: assets.paradise }
    ],
    Accounting: [
      { title: "Smashoffice", description: "Manage your accounting", image: assets.smashTechnology_logo },
      { title: "Smashoffice", description: "Manage your accounting", image: assets.smashTechnology_logo },
      { title: "Smashoffice", description: "Manage your accounting", image: assets.smashTechnology_logo }
    ],
    "Expense Management": [
      { title: "SmashInvoice", description: "Track expenses easily", image: assets.smashTechnology_logo },
      { title: "SmashInvoice", description: "Track expenses easily", image: assets.smashTechnology_logo },
      { title: "SmashInvoice", description: "Track expenses easily", image: assets.smashTechnology_logo }
    ],
    "Attendance management": [
      { title: "Smashoffice", description: "Smart attendance tracking", image: assets.smashTechnology_logo },
      { title: "Smashoffice", description: "Smart attendance tracking", image: assets.smashTechnology_logo },
      { title: "Smashoffice", description: "Smart attendance tracking", image: assets.smashTechnology_logo }
    ],
    "Employee Verification": [
      { title: "Smashverify", description: "Manage your staff", image: assets.smashTechnology_logo },
      { title: "Smashverify", description: "Manage your staff", image: assets.smashTechnology_logo },
      { title: "Smashverify", description: "Manage your staff", image: assets.smashTechnology_logo }
    ],
    Dating: [
      { title: "Qiimeet", description: "Find Love, Make it Last", image: assets.qiimeet },
      { title: "Qiimeet", description: "Find Love, Make it Last", image: assets.qiimeet },
      { title: "Qiimeet", description: "Find Love, Make it Last", image: assets.qiimeet }
    ],
    "Ride-hailing": [
      { title: "Ridesmash", description: "Ride in Style, Ride in Comfort", image: assets.ridesmash },
      { title: "Ridesmash", description: "Ride in Style, Ride in Comfort", image: assets.ridesmash },
      { title: "Ridesmash", description: "Ride in Style, Ride in Comfort", image: assets.ridesmash }
    ],
    "Food-delivery": [
      { title: "Smashfood", description: "Tasty meals at all times", image: assets.smashfood },
      { title: "Smashfood", description: "Tasty meals at all times", image: assets.smashfood },
      { title: "Smashfood", description: "Tasty meals at all times", image: assets.smashfood }
    ],
    Fintech: [
      { title: "SmashRemit", description: "Manage your payments", image: assets.smashRemit },
      { title: "SmashRemit", description: "Manage your payments", image: assets.smashRemit },
      { title: "SmashRemit", description: "Manage your payments", image: assets.smashRemit }
    ],
    Logistics: [
      { title: "SmashLogistics", description: "Send parcel seamlessly", image: assets.smashLogistics_logo },
      { title: "SmashLogistics", description: "Send parcel seamlessly", image: assets.smashLogistics_logo },
      { title: "SmashLogistics", description: "Send parcel seamlessly", image: assets.smashLogistics_logo }
    ],
    Church: [
      { title: "Church", description: "Manage your church seamlessly", image: assets.smashTechnology_logo },
      { title: "Church", description: "Manage your church seamlessly", image: assets.smashTechnology_logo },
      { title: "Church", description: "Manage your church seamlessly", image: assets.smashTechnology_logo }
    ],
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 mt-9 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="relative w-40 h-12">
          <Image src={assets.Logo} alt="Logo" fill className="object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-md">
          <Link href="/" className="text-white/80 hover:text-white">
            Home
          </Link>
          <Link href="#" className="text-white/80 hover:text-white">
            About
          </Link>
          <Link href="/portfolio" className="text-white/80 hover:text-white">
            Portfolio
          </Link>

          {/* Products Mega Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProductsOpen((prev) => !prev)}
              className="flex items-center gap-2 text-white/80 hover:text-white"
            >
              Products
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {isProductsOpen && (
              <div className="absolute left-1/2 top-full z-40 -translate-x-1/2 mt-6 w-[1300px] bg-white  shadow-2xl p-8">
                <div className="grid md:grid-cols-[280px_1fr] grid-cols-1 gap-6 md:gap-12">
                  {/* LEFT COLUMN */}
                  <div className="bg-orange-50 rounded-2xl p-4 md:p-6">
                    <ul className="space-y-3.5">
                      {productGroups
                        .flatMap((group) => group.items)
                        .map((item) => (
                          <li
                            key={item}
                            onMouseEnter={() => setHoveredItem(item)}
                            className={`flex justify-between items-center text-sm text-gray-700 transition hover:text-orange-500 cursor-pointer ${hoveredItem === item ? "font-semibold text-orange-500" : ""
                              }`}
                          >
                            <span>{item}</span>
                            <ChevronRight
                              className={`w-4 h-4 text-orange-500 transition-transform ${hoveredItem === item ? "rotate-0 opacity-100" : "rotate-0 opacity-0"
                                }`}
                            />
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {(productDetails[hoveredItem] || []).map((product, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="group flex flex-row gap-3 p-4 rounded-2xl hover:bg-gray-50 transition"
                      >
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-md">
                          <Image
                            src={product.image}
                            alt={product.title}
                            className="object-contain w-full h-full"
                            priority
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-orange-500 transition">
                            {product.title}
                          </h4>
                          <p className="text-sm text-gray-600 leading-snug">
                            {product.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/pricing" className="text-white/80 hover:text-white">
            Pricing
          </Link>
          <Link href="/contact" className="text-white/80 hover:text-white">
            Contact
          </Link>
        </div>

        {/* CTA */}
        <button className="hidden md:flex items-center gap-2 bg-[#F24F04] hover:bg-orange-600 text-white px-6 py-4 rounded-full">
          Start a Project <Rocket className="w-4 h-4" />
        </button>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 space-y-4">
          {["Home", "About", "Products", "Pricing", "Contact"].map((item) => (
            <Link
              key={item}
              href="#"
              className="block text-white text-lg"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;











