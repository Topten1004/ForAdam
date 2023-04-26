import { observer } from "mobx-react-lite";
import { Venue } from "../../../models/venue";
import { useStore } from "../../../stores/store";
import VenueListItem from "./VenueListItem";
import { Grid, Container } from "semantic-ui-react";

const VenueList = observer(() => {
  const { venueStore } = useStore();
  const { venuesByDate } = venueStore;
  return (
    <Container fluid textAlign="left" className="mt-20">
      <Grid centered>
        {venuesByDate.map((venue: Venue) => (
          <Grid.Column
            key={venue.id}
            largeScreen={4}
            widescreen={4}
            mobile={16}
          >
            <VenueListItem venue={venue} />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
});

export default VenueList;
