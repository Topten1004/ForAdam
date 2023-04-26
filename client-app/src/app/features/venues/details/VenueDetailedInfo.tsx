import { observer } from "mobx-react-lite";
import { Segment, Grid, Icon, Container } from "semantic-ui-react";
import { Venue } from "../../../models/venue";
import { DrawerVenue } from "../../../../components/DrawerVenueOptions";

interface Props {
  venue: Venue;
}

export default observer(function VenueDetailedInfo({ venue }: Props) {
  return (
    <Container>
      {venue.isGoing ? (
        <DrawerVenue venueItem={venue} />
      ) : (
        <Segment.Group>
          <Segment attached="top">
            <Grid>
              <Grid.Column width={1}>
                <Icon size="large" name="info" style={{ color: "#ed2b5d" }} />
              </Grid.Column>
              <Grid.Column width={14}>
                <p>{venue.offers[0].name}</p>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={1}>
                <Icon name="trophy" size="large" style={{ color: "#ed2b5d" }} />
              </Grid.Column>
              <Grid.Column width={14}>
                <span>{venue.offers[0].description}</span>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment attached>
            <Grid verticalAlign="middle">
              <Grid.Column width={1}>
                <Icon name="marker" size="large" style={{ color: "#ed2b5d" }} />
              </Grid.Column>
              <Grid.Column width={14}>
                <span>
                  {venue.country}, {venue.city}, {venue.address}
                </span>
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
      )}
    </Container>
  );
});
