import StampCard from "./shared/StampCard";
import { Venue } from "../app/models/venue";
import { observer } from "mobx-react-lite";

interface PageProps {
  venueItem: Venue | undefined;
}

export const DrawerVenue = observer(({ venueItem }: PageProps) => {
  return (
    <>
      <div className="mr-25 mt-5 flex justify-center">
        <StampCard venueDetails={venueItem} />
      </div>
    </>
  );
});
