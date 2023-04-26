import { Link } from "react-router-dom";
import { Venue } from "../../../models/venue";
import { observer } from "mobx-react-lite";
import { Button, Grid, Icon, Item, Label, Segment } from "semantic-ui-react";
import VenueListItemAttendee from "./VenueListItemAttendee";

interface Props {
  venue: Venue;
}

const VenueListItem = observer(({ venue }: Props) => {
  return (
    <Grid padded="vertically" textAlign="center" style={{ padding: 5 }}>
      <Segment.Group style={{ width: '100%' }} >
        <Segment>
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
          <Item.Group>
            <Item>
              <Item.Image
                style={{ marginBottom: 3 }}
                circular
                size="tiny"
                //src={`/assets/venueCategory/${venue.category}.jpg`}
                src={`/assets/venueCategory/coffee.png`}
              />
              <Item.Content>
                <Item.Header
                  className="cursor-pointer"
                  as={Link}
                  to={`/venue-list/${venue.id}`}
                  style={{ color: "#ed2b5d" }}
                >
                  {venue.name}
                </Item.Header>
                <Item.Description>
                  <span>
                    <Icon name="marker" style={{ color: "#ed2b5d" }} />{" "}
                    {venue.country} {","} {venue.city}
                  </span>
                  <span>
                    {","} {venue.address}
                  </span>

                  <Link to={`/profiles/${venue.hostUsername}`}>
                    {venue.host?.username}
                  </Link>
                </Item.Description>
                {venue.isVenueOwner ? (
                  <Item.Description>
                    <Label
                      style={{
                        backgroundColor: "#ed2b5d",
                        color: "#ffffff",
                      }}
                      ribbon="right"
                    >
                      You are the host of this reward offer
                    </Label>
                  </Item.Description>
                ) : (
                (venue.isGoing && !venue.isVenueOwner) ? (
                  <Item.Description>
                    <Label
                      style={{ backgroundColor: "#ed2b5d", color: "#ffffff" }}
                      ribbon="right"
                    >
                      You are already part of this award offer
                    </Label>
                  </Item.Description>
                ) : (<Item.Description>
                  <div style={{ height: '26px' }}></div>
                </Item.Description>))}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <Icon name="trophy" style={{ color: "#A855F7" }} />
          <Label style={{ backgroundColor: "#A855F7", color: "#ffffff" }}>
            {venue.offers[0].description}
          </Label>
        </Segment>
        <Segment>
          <VenueListItemAttendee attendees={venue.attendees!} />
        </Segment>
        <Segment clearing>
          <Button
            on
            as={Link}
            to={`/venue-list/${venue.id}`}
            style={{ backgroundColor: "#ed2b5d", color: "#ffffff" }}
            floated="right"
            content="View"
          ></Button>
        </Segment>
      </Segment.Group>
    </Grid>
  );
});

export default VenueListItem;
