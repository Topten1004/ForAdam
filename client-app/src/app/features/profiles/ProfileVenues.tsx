import { SyntheticEvent, useEffect } from "react";
import { Card, Grid, Header, Image, Tab, TabProps } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useStore } from "../../stores/store";
import { UserVenue } from "../../models/Profile";

const panes = [
  { menuItem: "Past Offers", pane: { key: "past" } },
  { menuItem: "Active Offers", pane: { key: "active" } },
];

export default observer(function ProfileVenues() {
  const { profileStore } = useStore();
  const { loadUserVenues, profile, loadingVenues, userVenues } = profileStore;

  useEffect(() => {
    loadUserVenues(profile!.username);
  }, [loadUserVenues, profile]);
  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserVenues(
      profile!.username,
      panes[data.activeIndex as number].pane.key
    );
  };
  return (
    <Tab.Pane loading={loadingVenues}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="gift" content={"Offers"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          ></Tab>
          <br />
          <Card.Group itemsPerRow={4}>
            {userVenues.map((venue: UserVenue) => (
              <Card as={Link} to={`/venue-list/${venue.id}`} key={venue.id}>
                <Image
                  src={`/assets/categoryImages/${venue.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{venue.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(venue.date), "do LLL")}</div>
                    <div>{format(new Date(venue.date), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
