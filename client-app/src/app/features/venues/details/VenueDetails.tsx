import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../stores/store";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useParams } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import VenueDetailedHeader from "./VenueDetailedHeader";
import VenueDetailedInfo from "./VenueDetailedInfo";
import VenueDetailedSidebar from "./VenueDetailedSidebar";

const VenueDetails = observer(() => {
  const { venueStore } = useStore();
  const { selectedVenue: venue, loadVenue, loadingInitial } = venueStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadVenue(id);
    }
  }, [id, loadVenue, venue]);

  if (loadingInitial || !venue) return <LoadingComponent />;

  return (
    <Container fluid>
      <Grid padded="vertically" stackable textAlign="center">
        <Grid.Column width={10}>
          <VenueDetailedHeader venue={venue} />
          <VenueDetailedInfo venue={venue} />
        </Grid.Column>
        <Grid.Column width={6}>
          <VenueDetailedSidebar venue={venue} />
        </Grid.Column>
      </Grid>
    </Container>
  );
});

export default VenueDetails;
