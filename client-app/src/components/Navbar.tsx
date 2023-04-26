import { NavLink } from "react-router-dom";
import Drop from "./Drop";
import { useState, useEffect } from "react";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";
import { Label, Menu } from "semantic-ui-react";
import { userInfo } from "os";

const Navbar = observer(() => {
  const [navbar, setNavbar] = useState(false);

  const { userStore, rewardStore } = useStore();

  useEffect(() => {
    if (userStore.isLoggedIn) {
      rewardStore.loadLists();
    }
  }, [rewardStore, userStore.isLoggedIn]);

  return (
    <nav className="rounded border-b-2 border-slate-200 bg-white px-2 py-2.5 shadow-md dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <div className="relative mx-auto flex h-9 cursor-pointer items-center">
            <NavLink to="/">
              <img alt="" src="/assets/logo.png" height={80} width={130} />
            </NavLink>
          </div>
        </div>
        <div className="flex items-center lg:order-2">
          <>
            {userStore.isLoggedIn && (
              <>
                <div className="-mt-1 mr-7 inline-block rounded-full bg-[color:var(--bg-purple-400)] p-2 md:hidden lg:hidden">
                  <NavLink
                    to="/rewards"
                    className="cursor-pointer"
                    style={{ position: "relative" }}
                  >
                    {rewardStore.rewardCount !== 0 && (
                      <Label
                        floating
                        circular
                        style={{
                          backgroundColor: "#ed2b5d",
                          color: "#ffffff",
                          top: "-53%",
                          left: "145%",
                        }}
                      >
                        {rewardStore.rewardCount.toString()}
                      </Label>
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-8 w-8 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                      />
                    </svg>
                  </NavLink>
                </div>

                <div className="-mt-1 mr-7 inline-block rounded-full bg-[color:var(--bg-purple-400)] p-2 md:hidden lg:hidden">
                  <NavLink to="/venue-list" className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-8 w-8 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                      />
                    </svg>
                  </NavLink>
                </div>

                <Drop />
                <button
                  style={{ display: "none" }}
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  onClick={() => setNavbar(!navbar)}
                  className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </>
            )}
            {!userStore.isLoggedIn && (
              <>
                <button className=" rounded-full bg-[color:var(--bg-purple-100)] px-10 py-3 font-bold text-white shadow-sm transition duration-150 hover:shadow-xl active:scale-90">
                  <NavLink to="/login" className="cursor-pointer">
                    Get started
                  </NavLink>
                </button>
                <button
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  onClick={() => setNavbar(!navbar)}
                  className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </>
            )}
          </>
        </div>
        {/* <Navbar large screen/> */}
        <div className="hidden items-center justify-center space-y-2 lg:flex lg:space-x-6 lg:space-y-0">
          <Menu pointing compact>
            <Menu.Item>
              <NavLink
                to="/venue-list"
                className="font-bold text-[color:var(--text-purple-500)]"
              >
                Venue List
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink
                to="/rewards"
                className="font-bold text-[color:var(--text-purple-500)]"
              >
                Rewards
                {userStore.isLoggedIn && rewardStore.rewardCount !== 0 && (
                  <Label
                    floating
                    circular
                    style={{
                      backgroundColor: "#ed2b5d",
                      color: "#ffffff",
                      top: "0%",
                      right: "100%",
                    }}
                  >
                    {rewardStore.rewardCount.toString()}
                  </Label>
                )}
              </NavLink>
            </Menu.Item>
            {userStore.isVenueOwner &&             
            <Menu.Item>
              <NavLink
                to="/dashboard"
                className="font-bold text-[color:var(--text-purple-500)]"
              >
                Dashboard
              </NavLink>
            </Menu.Item>
          }       
          </Menu>
        </div>
      </div>
      <div
        className={`mt-8 flex-1 justify-self-center pb-3 lg:mt-0 lg:block lg:pb-0 ${
          navbar ? "block" : "hidden"
        }`}
      >
        <ul className="items-center justify-center space-y-2 lg:hidden lg:space-x-6 lg:space-y-0">
          <li className="font-bold text-[color:var(--bg-purple-100)]">
            <NavLink to="/venue-list" className="cursor-pointer">
              Venue List
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
