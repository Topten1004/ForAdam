import { AiOutlineCoffee } from "react-icons/ai";
import ReactCardFlip from "react-card-flip";
import { Venue } from "../../app/models/venue";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface PageProps {
  venueDetails: Venue | undefined;
}

const StampCard = observer(({ venueDetails }: PageProps) => {
  const navigate = useNavigate();
  const { venueStore } = useStore();

  useEffect(() => {
    if (venueStore.checkFlag === false) {
      let nullCnt = 0;
      for (let i = 0; i < venueStore.stampInfo?.length; i++)
        if (venueStore.stampInfo[i] != null) nullCnt = i + 1;

      if (nullCnt === venueStore.stampInfo.length) {
        toast.success("Congratulations you earned a new reward");
        venueStore.checkStamps(venueDetails?.id);
        setTimeout(() => {
        }, 3000);
      }
      venueStore.checkFlag = true;
    }
  }, [venueStore]);

  const stampMe = () => {
    venueStore.checkFlag = false;
    navigate("/qr_scanner");
  };

  return (
    <ReactCardFlip flipDirection="horizontal">
      <div className="h-full w-full max-w-sm rounded-lg border border-gray-200 bg-white pt-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="flex justify-center">
          <AiOutlineCoffee className="text-8xl" />
        </div>
        <div className="px-6">
          <h5 className="my-2 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {venueDetails?.offers[0].description.replace("COFFEE FREE", "")}
            <br /> COFFEE FREE
          </h5>
        </div>

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {
            <div
              className="grid grid-flow-col grid-rows-3 gap-5"
              style={{ width: "90%", marginLeft: 30 }}
            >
              {venueStore.stampInfo.map((_, index) => (
                <div
                  className="h-12 w-12 rounded-full border border-black"
                  style={{ position: "relative" }}
                >
                  <div
                    key={index}
                    className="flex h-10 w-10 items-center justify-between rounded-full"
                    style={{
                      color: "black",
                      backgroundColor:
                        venueStore.stampInfo[index] !== null &&
                        index !== venueStore.stampInfo?.length
                          ? "#ed2b5d"
                          : undefined,
                      position: "absolute",
                      top: "0%",
                      left: "-17%",
                    }}
                  ></div>

                  <div
                    className="z-1 text-left text-sm"
                    style={{ position: "absolute", bottom: "-40%" }}
                  >
                    {venueStore.stampInfo[index] !== null &&
                    index !== venueStore.stampInfo?.length
                      ? format(
                          new Date(venueStore.stampInfo[index].stampDate),
                          "MM/dd"
                        )
                      : ""}
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
        <ToastContainer position="bottom-center" />
        <div className="mt-4 flex justify-center">
          <div className="flex w-5/6 justify-center">
            <Button
              onClick={stampMe}
              style={{
                backgroundColor: "#ed2b5d",
                color: "#ffffff",
                marginBottom: 10,
              }}
              floated="right"
              content="STAMP ME"
            ></Button>
          </div>
        </div>
      </div>
      <div className="h-82 w-80 max-w-sm rounded-lg border border-gray-200 bg-white pt-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="flex justify-center">
          <AiOutlineCoffee className="text-8xl" />
        </div>
        <div className="px-6">
          <h5 className="my-2 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {venueDetails?.offers[0].description.replace("COFFEE FREE", "")}
            <br /> COFFEE FREE
          </h5>
        </div>
        <div className="px-12">
          <div className="flex justify-between py-2">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
              <span className="text-[color:var(--text-purple-500)]">
                Name:{" "}
              </span>
              <span className="underline-offset-3 underline decoration-blue-400 decoration-8">
                {venueDetails?.offers[0].name}
              </span>
            </h1>
          </div>
          <div className="flex justify-between py-2">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
              <span className="text-[color:var(--text-purple-500)]">
                Terms:{" "}
              </span>
              <span className="underline-offset-3 underline decoration-blue-400 decoration-8">
                {venueDetails?.offers[0].terms}
              </span>
            </h1>
          </div>
          <div className="flex justify-between py-2">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
              <span className="text-[color:var(--text-purple-500)]">
                Reward:{" "}
              </span>
              <span className="underline-offset-3 underline decoration-blue-400 decoration-8">
                {venueDetails?.offers[0].offerRewards[0]?.reward?.name}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </ReactCardFlip>
  );
});

export default StampCard;
