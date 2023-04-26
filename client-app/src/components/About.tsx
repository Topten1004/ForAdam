import { useState } from "react";
import { Button, Container, Header } from "semantic-ui-react";

const About = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Container fluid className="mt-10">
      <Header
        className="text-center"
        as="h2"
        style={{ color: "#ed2b5d" }}
        content="How it works?"
      />

      <div className="mb-14 space-y-4 text-center text-2xl font-semibold xl:space-x-4">
        <Button
          style={{ backgroundColor: "#ed2b5d", color: "#ffffff" }}
          circular
          size="medium"
          className="rounded-full px-10 py-2 font-bold shadow-md transition duration-150 hover:shadow-lg active:scale-90"
          onClick={() => setSelected(0)}
        >
          For your Customers
        </Button>
        <Button
          circular
          size="medium"
          style={{ backgroundColor: "#ed2b5d", color: "#ffffff" }}
          className="rounded-full px-10 py-2 font-bold shadow-md transition duration-150 hover:shadow-lg active:scale-90"
          onClick={() => setSelected(1)}
        >
          For your Business
        </Button>
      </div>
      <div className="">
        {selected === 0 && (
          <div id="left">
            <div className="grid lg:grid-cols-3 lg:gap-x-12">
              <div className="mb-12 lg:mb-0">
                <div className="block h-full rounded-lg bg-white shadow-lg">
                  <div className="flex justify-center">
                    <div className="-mt-8 inline-block rounded-full bg-[color:var(--bg-purple-100)] p-4 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-8 w-8 text-white"
                      >
                        <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                        <path
                          fillRule="evenodd"
                          d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="mb-4 text-lg font-semibold">
                      1. Create an account
                    </h5>
                    <p className="text-gray-600">
                      Your customers will create an account, register their
                      details and join your loyalty program.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12 lg:mb-0">
                <div className="block h-full rounded-lg bg-white shadow-lg">
                  <div className="flex justify-center">
                    <div className="-mt-8 inline-block rounded-full bg-[color:var(--bg-purple-100)] p-4 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-8 w-8 text-white"
                      >
                        <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
                        <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
                        <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
                        <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 19.664 9.315 20.25 12 20.25z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="mb-4 text-lg font-semibold">
                      2. Collect Stamps
                    </h5>
                    <p className="text-gray-600">
                      Stamps are collected for each transaction, purchase or
                      check-in. You determine how many stamps you want your
                      customer to collect.
                    </p>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="block h-full rounded-lg bg-white shadow-lg">
                  <div className="flex justify-center">
                    <div className="-mt-8 inline-block rounded-full bg-[color:var(--bg-purple-100)] p-4 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-8 w-8 text-white"
                      >
                        <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="mb-4 text-lg font-semibold">
                      3. Redeem Rewards
                    </h5>
                    <p className="text-gray-600">
                      Reward vouchers are issued after the required amount of
                      stamps are collected. Rewards can be claimed in-store (by
                      showing the voucher to staff).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {selected === 1 && (
          <div id="right">
            <div className="grid lg:grid-cols-3 lg:gap-x-12">
              <div className="mb-12 lg:mb-0">
                <div className="block h-full rounded-lg bg-white shadow-lg">
                  <div className="flex justify-center">
                    <div className="-mt-8 inline-block rounded-full bg-[color:var(--bg-purple-100)] p-4 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-8 w-8 text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z"
                          clipRule="evenodd"
                        />
                        <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="mb-4 text-lg font-semibold">
                      1. Sign Up Your Business
                    </h5>
                    <p className="text-gray-600">
                      Simply register your business for a free. We’ll then
                      activate your loyalty card so you can see how it works for
                      yourself.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12 lg:mb-0">
                <div className="block h-full rounded-lg bg-white shadow-lg">
                  <div className="flex justify-center">
                    <div className="-mt-8 inline-block rounded-full bg-[color:var(--bg-purple-100)] p-4 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-8 w-8 text-white"
                      >
                        <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H1.5v-6A2.25 2.25 0 013.75 3h7.5zM12.75 3v4.011a3 3 0 014.239 4.239H22.5v-6A2.25 2.25 0 0020.25 3h-7.5zM22.5 12.75h-8.983a4.125 4.125 0 004.108 3.75.75.75 0 010 1.5 5.623 5.623 0 01-4.875-2.817V21h7.5a2.25 2.25 0 002.25-2.25v-6zM11.25 21v-5.817A5.623 5.623 0 016.375 18a.75.75 0 010-1.5 4.126 4.126 0 004.108-3.75H1.5v6A2.25 2.25 0 003.75 21h7.5z" />
                        <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 01-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 012.122-2.12c.517.517.759 1.36.842 2.194zM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0013.72 8.16c-.518.518-.76 1.362-.843 2.194z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="mb-4 text-lg font-semibold">
                      2. Set Up Your Reward plan
                    </h5>
                    <p className="text-gray-600">
                      Never has it been easier to implement a digital loyalty
                      program! There is no software, hardware or point-of-sale
                      integration required. We provide you with all you need to
                      get going.
                    </p>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="block h-full rounded-lg bg-white shadow-lg">
                  <div className="flex justify-center">
                    <div className="-mt-8 inline-block rounded-full bg-[color:var(--bg-purple-100)] p-4 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-8 w-8 text-white"
                      >
                        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="mb-4 text-lg font-semibold">
                      3. Start Retaining more Customers
                    </h5>
                    <p className="text-gray-600">
                      Once your digital loyalty card is set up and you’re
                      familiar with how it works, it’s time to introduce the
                      program to your customers!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default About;
