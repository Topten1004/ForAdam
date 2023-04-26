import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import CookieConsent from "react-cookie-consent";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  const subscribeUser = async (e: any) => {
    e.preventDefault();
    setState("Loading");
    try {
      const res = await fetch("/api/subscribeUser", {
        body: JSON.stringify({
          email: email,
        }),

        headers: {
          "Content-Type": "application/json",
        },

        method: "POST",
      });

      if (res.status >= 400) {
        return toast.error(
          "There was an error subscribing to the platform. Hit me up at marius.morar02@gmail.com and I'll add you the old fashioned way :(."
        );
      }
      toast.success("Successfully signed up to the platform");
      setEmail("");
    } catch (error) {
      return toast.error(
        "There was an error subscribing to the platform. Hit me up at marius.morar02@gmail.com and I'll add you the old fashioned way :(."
      );
    }
  };

  return (
    <div className="mt-10">
      <footer className="bg-[color:var(--bg-purple-100)] text-center">
        <div className="px-6 pt-6" id="subscribe">
          <form onSubmit={subscribeUser}>
            <div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-3">
              <div className="font-semibold md:ml-auto md:mb-6">
                <p className="text-white">
                  <strong>Join Our Mailing List</strong>
                </p>
              </div>

              <div className="md:mb-6">
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="What's your email address"
                  autoCapitalize="off"
                  autoCorrect="off"
                  className="
                form-control
                m-0
                block
                w-full
                rounded
                bg-white
                bg-clip-padding
                px-3
                py-1.5 text-base
                font-normal
                text-[color:var(--bg-purple-100)]
                transition
                ease-in-out
                focus:border-[color:var(--bg-purple-100)] focus:bg-white focus:text-[color:var(--bg-purple-100)] focus:outline-none
              "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-6 md:mr-auto">
                <button
                  disabled={state === "Loading"}
                  type="submit"
                  className="rounded-full bg-white px-10 py-2 font-bold text-[color:var(--bg-purple-100)] shadow-sm transition duration-150 hover:shadow-xl active:scale-90"
                >
                  Yes, sign me up!
                </button>
              </div>
            </div>
            <ToastContainer position="bottom-center" />
          </form>
          <div className="flex items-center justify-center gap-4 py-4 md:flex-row md:gap-4">
            <div className="sm:gap-4 md:grid md:grid-cols-2 md:flex-row">
              <NavLink
                to="/policies/privacy-policy"
                className="mr-4 text-white hover:text-gray-200"
              >
                Privacy-policy
              </NavLink>
              <NavLink
                to="/policies/user-terms"
                className="mr-4 text-white hover:text-gray-200"
              >
                User-terms
              </NavLink>
              <NavLink
                to="/policies/merchant-terms"
                className="mr-4 text-white hover:text-gray-200"
              >
                Vendor-terms
              </NavLink>
            </div>
          </div>
        </div>

        <div className="p-4 text-center text-white">
          © 2022 Copyright:
          <NavLink className="p-2 text-white" to="#">
            Stampify
          </NavLink>
        </div>
      </footer>
      <CookieConsent
        enableDeclineButton
        location="bottom"
        buttonText="Allow"
        declineButtonText="Decline"
        declineButtonStyle={{
          color: "#ed2b5d",
          background: "white",
          fontSize: "13px",
        }}
        style={{ background: "#ed2b5d" }}
        buttonStyle={{
          color: "#ed2b5d",
          background: "white",
          fontSize: "13px",
        }}
        expires={150}
      >
        We use cookies to enhance your browsing experience, serve personalized
        ads or content, and analyze our traffic.
      </CookieConsent>
    </div>
  );
};

export default Footer;
