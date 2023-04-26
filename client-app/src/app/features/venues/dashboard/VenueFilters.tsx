import React from "react";
import { Header, Menu } from "semantic-ui-react";

const VenueFilters = () => {
  return (
    <>
      <Menu vertical size="large" style={{ with: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header />
    </>
  );
};

export default VenueFilters;
