import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { format } from "date-fns";
import { Venue } from "../../../models/venue";
import { useStore } from "../../../stores/store";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "#eb0a55",
  fontSize: "large",
};

interface Props {
  venue: Venue;
}

export default observer(function VenueDetailedHeader({ venue }: Props) {
  const {
    venueStore: { updateAttendance, loading, cancelActivityToggle },
  } = useStore();

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {venue.isCancelled && (
          <Label
            style={{
              position: "absolute",
              zIndex: 1000,
              left: -14,
              top: 20,
              backgroundColor: "#ed2b5d",
              color: "#ffffff",
            }}
            ribbon
            content="Cancelled"
          ></Label>
        )}
        <Image
          //src={`/assets/venueCategory/${venue.category}.jpg`}
          src={`/assets/venueCategory/food.png`}
          size="medium"
          centered
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={venue.name}
                  style={{ color: "#ed2b5d" }}
                />
                <p> Created at {format(venue.created!, "dd MMM yyyy")}</p>
                <p>{venue.offers[0].terms}</p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom" className="flex-row">
        {venue.isVenueOwner ? (
          <>
            <Button
              color={venue.isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={venue.isCancelled ? "Re-activate Offer" : "Cancel Offer"}
              loading={loading}
              onClick={cancelActivityToggle}
            ></Button>
            <Button
              disabled={venue.isCancelled}
              as={Link}
              to={`/manage/${venue.id}`}
              style={{ backgroundColor: "#ed2b5d", color: "#ffffff" }}
              floated="right"
            >
              Manage offer
            </Button>
          </>
        ) : venue.isGoing ? (
          <Button loading={loading} onClick={updateAttendance}>
            Cancel offer
          </Button>
        ) : (
          <Button
            disabled={venue.isCancelled}
            loading={loading}
            onClick={updateAttendance}
            style={{ backgroundColor: "#ed2b5d", color: "#ffffff" }}
          >
            Join offer
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
