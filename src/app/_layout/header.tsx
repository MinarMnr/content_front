"use client";

import Image from "next/image";
import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  ShoppingCartIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getClientCookie } from "../_services/storage";
import { show } from "../_services/api-call";
import HeaderSearch from "./header-search";
import "./header.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LOGOUT } from "../(authentication)/action";
import LanguageSwitcher from "../_components/LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import LangTra from "../_components/lang-tra";

const Header = ({ setBuyModal, ...props }: any) => {
  const { language } = useLanguage();
  const t = translations[language];
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullUrl = `${pathname}${
    searchParams.size != 0 ? `?${searchParams.toString()}` : ""
  }`;

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const services: any[] = [
    {
      id: 1,
      title_en: "Tutors",
      title_bn: "গৃহশিক্ষক",
      icons: "",
      link: "/tutors",
    },
    {
      id: 1,
      title_en: "LMS",
      title_bn: "এল.এম.এস",
      icon: "l.svg",
      link: "",
    },
    {
      id: 2,
      title_en: "Edutube Live",
      title_bn: "এডুটিউব লাইভ",
      icon: "e.svg",
      link: "",
    },
  ];

  const [courseType, setCourseType] = useState<any[]>([]);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const router = useRouter();

  const setCartCount = async () => {
    let tada = getClientCookie("edutube-auth-user");
    if (tada) {
      return show({ api_key: "CART_API" }).then((resp: any) => {
        if (resp?.status === "success") {
          setCartItems(Number(resp?.data?.items?.length));
        } else {
          setCartItems(Number(resp?.data?.items?.length));
        }
      });
    }
  };

  const [cartItems, setCartItems] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("cart-items", () => {
      setCartCount();
    });
    setCartCount();
  }, []);

  //used for other tab
  useEffect(() => {
    const updateValue = () => setCartCount();
    window.addEventListener("storage", updateValue);
    updateValue();
    return () => window.removeEventListener("storage", updateValue);
  }, []);

  useEffect(() => {
    let data = getClientCookie("edutube-auth-user");
    show({
      api_key: "COURSE_TYPE_API",
      parameters: {
        page: 1,
        size: -1,
      },
    }).then(async (resp: any) => {
      if (resp?.data) {
        let x: any[] = [];
        for await (const tada of resp?.data) {
          let y = (
            await show({
              api_key: "CATEGORY_API",
              parameters: {
                course_type_id: tada?.id,
              },
            })
          )?.data;
          x = [
            ...x,
            {
              course_type: tada,
              categories: y,
            },
          ];
        }
        setCourseType(x);
      }
    });
    if (data) {
      setUser(data);
    }
  }, []);

  return (
    <div
      {...props}
      // flex-col
      className={`container  mx-auto flex  md:flex-row justify-center lg:justify-between md:justify-around items-center py-6 pl-2 pr-2 header-custom ${props?.className}`}
    >
      <>
        <div className="basis-1/6 flex items-center lg:p-0 p-5 logo_header-grid">
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt={""}
              width={150}
              height={150}
              className="logo_header"
            />
          </Link>
        </div>

        <div className="basis-1/5 flex items-center lg:p-0 p-5 sear-grid">
          <HeaderSearch />
        </div>

        {
          <button
            className="menu-toggle text-gray-500 lg:p-0 p-5"
            onClick={handleClick}
          >
            {isOpen ? (
              <XMarkIcon className="size-6" />
            ) : (
              <Bars3Icon className="size-6" />
            )}
          </button>
        }
      </>

      <div
        className={`grow ps-15  justify-start items-center space-x-16 text-lg font-bold  device-hide nav-area flex ${
          isOpen ? "device-show" : "device-hide"
        } `}
      >
        {courseType?.map((tada: any, t_index: number) => (
          <div
            key={t_index}
            className="h-fit w-max text-emerald-600 hover:text-black course-type hover-container-1 nav-area-list"
          >
            <Link
              className="nav-list-all"
              href={`/all-courses?page=1&size=9&course_type_id=${tada?.course_type?.id}`}
            >
              <LangTra data={tada} control={"course_type.title_en"} />
            </Link>
            <div
              className={`absolute -mt-1 flex-col justify-start items-stretch z-20 hover-child-1-flex`}
            >
              {tada?.categories?.map((bada: any, b_index: number) => (
                <Link
                  href={`/all-courses?page=1&size=9&course_type_id=${tada?.course_type?.id}&category_id=${bada?.id}`}
                  key={t_index + "" + b_index}
                  className={`py-3 px-4 bg-white border flex border-gray-100 text-black hover:text-white hover:bg-emerald-700 ${
                    b_index < tada?.categories?.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <Image
                    className="icon-img"
                    src={"/class.svg"}
                    alt={""}
                    width={100}
                    height={100}
                  />{" "}
                  <LangTra data={bada} control={"title_en"} />
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="h-fit w-max text-emerald-600 hover:text-black course-type hover-container-1 pr-1 nav-area-list">
          <Link className="nav-list-all" href="#">
            <LangTra control="header.service" />
          </Link>
          <div
            className={`absolute -mt-1 flex-col justify-start items-stretch z-20 hover-child-1-flex`}
          >
            {services?.map((item: any, b_index: number) => (
              <Link
                href={item?.link}
                key={b_index}
                className={`py-3 px-4 bg-white border flex border-gray-100 text-black hover:text-white hover:bg-emerald-700 ${
                  b_index < item?.length - 1 ? "border-b-0" : ""
                }`}
              >
                <Image
                  className="icon-img"
                  src={"/services.svg"}
                  alt={""}
                  width={100}
                  height={100}
                />
                <LangTra control="title_en" data={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {user ? (
        <>
          <button
            className="relative me-6 chart-grid"
            onClick={() => setBuyModal(true)}
          >
            <ShoppingCartIcon className="size-7 text-emerald-500" />
            {cartItems ? (
              <div className="absolute -top-3 -right-4 w-6 h-6 flex justify-center items-center text-sm font-bold text-white bg-emerald-700 rounded-full count-pack">
                <LangTra control="value" data={{ value: cartItems }} />
              </div>
            ) : null}
          </button>
          <>
            <Menu
              as="div"
              className="relative inline-block text-left user-dropdown hover-container-1"
            >
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5  bg-white shadow-md rounded-full px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <div className="profile-top open flex w-max">
                    <Image
                      src={"/3.png"}
                      alt={""}
                      className="rounded-full profile-avater w-14 h-full"
                      width={150}
                      height={150}
                    />
                    <div className="profile-name flex flex-col justify-center items-start">
                      <span className="text-gray-600 font-bold capitalize">
                        {user?.name_en}
                      </span>
                      <span className="text-xs text-gray-800">
                        {user?.type}
                      </span>
                      {/* <span className="text-xs text-gray-800 underline">
                        {user?.email}
                      </span> */}
                    </div>
                  </div>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 size-5 mt-2 text-gray-400"
                  />
                </MenuButton>
              </div>

              {/* <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in drop-down-list"
              > */}
              <div className="absolute hidden right-0 z-20 py-4  w-56 origin-top-right divide-y divide-gray-100  ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in drop-down-list hover-child-1-grid">
                <div className="py-1 rounded-md bg-gray-100 shadow-xl relative drop-arrow ">
                  <MenuItem>
                    <Link
                      href={"/profile"}
                      className="block border-b px-4 py-2 text-sm text-green-800 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none hover:text-green-600"
                    >
                      <strong className="flex">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5 me-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                        <LangTra control={"header.profile"} />
                      </strong>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <a
                      onClick={async () => {
                        router.push("/");
                        await LOGOUT();
                        location.reload();
                      }}
                      className="block px-4 py-2 bg-white text-sm text-red-800 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none hover:text-red-600 cursor-pointer"
                    >
                      <strong className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5 me-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                          />
                        </svg>
                        <LangTra control={"header.log_out"} />
                      </strong>
                    </a>
                  </MenuItem>
                </div>
              </div>
              {/* </MenuItems> */}
            </Menu>
          </>
          {/* <Link
            href={"/profile"}
            className="profile-top open bg-white shadow-md rounded-full h-14 p-1 ml-4 flex w-max"
          >
            <Image
              src={"/3.png"}
              alt={""}
              className="rounded-full profile-avater w-14 h-full"
              width={150}
              height={150}
            />
            <div className="profile-name flex flex-col justify-center items-start">
              <span className="text-gray-600 font-bold capitalize">
                {user?.name_en}
              </span>
              <span className="text-xs text-gray-800">{user?.type}</span>
              <span className="text-xs text-gray-800 underline">
                {user?.email}
              </span>
            </div>
          </Link> */}
          {/* <div className="px-2 flex items-center log-out">
            <LogoutButton />
          </div> */}
        </>
      ) : (
        <>
          <div className="flex login-registration">
            <Link href={`/api/auth/authorize?${fullUrl}`}>
              <button className="px-4 py-2 text-white rounded-l-full border-r border-green-700 h-fit flex justify-center items-center bg-green-800 hover:bg-green-900 w-[150px] login-w">
                <UserPlusIcon className="size-5 mr-1" />
                {t.header.login}
              </button>
            </Link>
            <Link href={`/api/auth/register?${fullUrl}`}>
              <button className="px-4 py-2 text-white rounded-r-full h-fit flex justify-center items-center bg-green-900 hover:bg-green-900 w-[150px] registration-w">
                <ArrowRightEndOnRectangleIcon className="size-5 mr-1" />
                {t.header.register}
              </button>
            </Link>
          </div>
        </>
      )}
      <div className="ml-10">
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;
