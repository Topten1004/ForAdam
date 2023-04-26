import { useEffect } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import VenueList from "./VenueList";
import { Grid } from "semantic-ui-react";
import ActivityListItemPlaceholder from "./VenueListItemPlaceholder";

const VenueDashboard = observer(() => {
  const { venueStore } = useStore();

  useEffect(() => {
    if (venueStore.venueRegistry.size <= 1) venueStore.loadVenues();
  }, [venueStore]);

  return (
    <Grid>
      <Grid.Column>
        {venueStore.loadingInitial ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <VenueList />
        )}
      </Grid.Column>
    </Grid>
  );
});

export default VenueDashboard;
