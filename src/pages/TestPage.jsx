// import { useState } from "react";
// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
// } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import {
//   ChevronDownIcon,
//   FunnelIcon,
//   MinusIcon,
//   PlusIcon,
//   Squares2X2Icon,
// } from "@heroicons/react/20/solid";
// import { TestDataProduct } from "../components/data/product";

// const sortOptions = [
//   { name: "Phổ biến nhất", href: "#", current: true },
//   { name: "Xếp hạng cao nhất", href: "#", current: false },
//   { name: "Mới nhất", href: "#", current: false },
//   { name: "Giá: Thấp đến Cao", href: "#", current: false },
//   { name: "Giá: Cao đến Thấp", href: "#", current: false },
// ];

// const nameLeaf = [
//   {
//     id: "category",
//     name: "Tên các loại lá",
//     options: [
//       { value: "", label: "Lá ổi", checked: false },
//       { value: "", label: "Lá cà chua ", checked: false },
//       { value: "", label: "Lá mít", checked: true },
//       { value: "", label: "Lá đa", checked: false },
//       { value: "", label: "Lá chuối", checked: false },
//     ],
//   },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Example(props) {
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

//   return (
//     <div className="bg-white">
//       <div>
//         <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//               Sản phẩm
//             </h1>

//             <div className="flex items-center">
//               <Menu as="div" className="relative inline-block text-left">
//                 <div>
//                   <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
//                     Sắp xếp
//                     <ChevronDownIcon
//                       aria-hidden="true"
//                       className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                     />
//                   </MenuButton>
//                 </div>

//                 <MenuItems
//                   transition
//                   className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//                 >
//                   <div className="py-1">
//                     {sortOptions.map((option) => (
//                       <MenuItem key={option.name}>
//                         <div>
//                           href={option.href}
//                           className={classNames(
//                             option.current
//                               ? "font-medium text-gray-900"
//                               : "text-gray-500",
//                             "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
//                           )}
//                         >
//                           {option.name}
//                         </div>
//                       </MenuItem>
//                     ))}
//                   </div>
//                 </MenuItems>
//               </Menu>
//             </div>
//           </div>

//           <section aria-labelledby="products-heading" className="pb-24 pt-6">
//             <div className="grid grid-cols-1

//             gap-y-10 lg:grid-cols-4">
//               <form className="hidden lg:block">
//                 {nameLeaf.map((section) => (
//                   <Disclosure
//                     key={section.id}
//                     as="div"
//                     className="border-b border-gray-200 py-6"
//                   >
//                     <h3 className="-my-3 flow-root">
//                       <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                         <span className="font-medium text-2xl text-gray-900">
//                           {section.name}
//                         </span>
//                         <span className="ml-6 flex justify-center items-center">
//                           <PlusIcon
//                             aria-hidden="true"
//                             className=" h-5 w-5 group-data-[open]:hidden"
//                           />
//                           <MinusIcon
//                             aria-hidden="true"
//                             className="h-5 w-5 [.group:not([data-open])_&]:hidden"
//                           />
//                         </span>
//                       </DisclosureButton>
//                     </h3>
//                     <DisclosurePanel className="pt-6">
//                       <div className="space-y-4">
//                         {section.options.map((option, optionIdx) => (
//                           <div key={option.value} className="flex items-center">
//                             <input
//                               defaultValue={option.value}
//                               defaultChecked={option.checked}
//                               id={`filter-${section.id}-${optionIdx}`}
//                               name={`${section.id}[]`}
//                               type="checkbox"
//                               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                             />
//                             <label
//                               htmlFor={`filter-${section.id}-${optionIdx}`}
//                               className="ml-3 text-base text-gray-600"
//                             >
//                               {option.label}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </DisclosurePanel>
//                   </Disclosure>
//                 ))}
//               </form>

//               <div className="lg:col-span-3">
//                 {" "}
//                 <div className="grid grid-cols-3 p-1">
//                   {TestDataProduct.map((item) => (
//                     <div key={item.id} className="p-1">
//                       {props.children}
//                       <div className="p-3 border-2 border-primary rounded-lg">
//                         <img
//                           alt=""
//                           className="w-full h-4/12 rounded-xl"
//                           src={item.image || item.avatar}
//                         ></img>
//                         <div className="flex pt-2 ">
//                             <img
//                               className="w-10 h-10 rounded-full object-cover"
//                               alt=""
//                               src={item.avatar || item.image}
//                             ></img>
//                           <div className="flex flex-col justify-start ml-4 ">
//                             <h1 className=" text-orange-500 text-xl flex-shrink-0 font-bold ">
//                               {item.title}
//                             </h1>
//                             <p className=" text-blue-500 text-xs ">
//                               Lorem Ipsum is simply dummy text of the printing
//                               and typesetting industry. Lorem Ipsum has been the
//                               industry's standard dummy text ever since the
//                               1500s,
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }
