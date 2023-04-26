import { SyntheticEvent, useEffect } from "react";
import { Card, Grid, Header, Image, Tab, TabProps } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useStore } from "../../stores/store";
import { UserVenue } from "../../models/Profile";

const panes = [
  { menuItem: "Past Rewards", pane: { key: "past" } },
  { menuItem: "Active Rewards", pane: { key: "active" } },
];

export default observer(function ProfileRewards() {
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
          <Header floated="left" icon="trophy" content={"Rewards"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          ></Tab>
          <br />
          <Card.Group itemsPerRow={4}></Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
