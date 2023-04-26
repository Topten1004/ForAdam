import { observer } from "mobx-react-lite";
import { List, Image, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Profile } from "../../../models/Profile";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
  attendees: Profile[];
}

export default observer(function VenueListItemAttendee({ attendees }: Props) {
  return (
    <List horizontal>
      {attendees.length > 0 ? attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.username}
          trigger={
            <List.Item
              key={attendee.username}
              as={Link}
              to={`/profiles/${attendee.username}`}
            >
              <Image
                bordered
                style={{ borderColor: "#ed2b5d", borderWidth: 2 }}
                size="mini"
                circular
                src={attendee.image || "/assets/user.png"}
              />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={attendee}></ProfileCard>
          </Popup.Content>
        </Popup>
      )) : <div style={{height: '36px'}}></div>}
    </List>
  );
});
