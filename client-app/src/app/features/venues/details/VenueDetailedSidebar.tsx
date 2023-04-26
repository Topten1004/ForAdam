import { Segment, List, Label, Item, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Venue } from "../../../models/venue";

interface Props {
  venue: Venue;
}

export default observer(function VenueDetailedSidebar({
  venue: { attendees, host },
}: Props) {
  if (!attendees) return null;
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none", backgroundColor: "#ed2b5d", color: "#ffffff" }}
        attached="top"
        secondary
        inverted
      >
        {attendees.length} {attendees.length === 1 ? "person" : "people"} joined
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee) => (
            <Item key={attendee.username} style={{ position: "relative" }}>
              {attendee.username === host?.username && (
                <Label
                  style={{
                    position: "absolute",
                    backgroundColor: "#ed2b5d",
                    color: "#ffffff",
                  }}
                  ribbon="right"
                >
                  Creator
                </Label>
              )}
              <Image
                size="tiny"
                src={attendee.image || "/assets/user.png"}
                avatar
              />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profiles/${attendee.displayName}`}>
                    {attendee.username}
                  </Link>
                </Item.Header>
                {/* {attendee.following && (
                  <Item.Extra style={{ color: "#ed2b5d" }}>
                    Following
                  </Item.Extra>
                )} */}
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
});
