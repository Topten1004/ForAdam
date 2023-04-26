import { Tab } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Profile } from "../../models/Profile";
import { useStore } from "../../stores/store";
import ProfileVenues from "./ProfileVenues";
import ProfileRewards from "./ProfileRewards";

interface Props {
  profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
  const { profileStore } = useStore();

  const panes = [
    {
      menuItem: "About",
      render: () => <Tab.Pane>About</Tab.Pane>,
    },
    { menuItem: "Offers", render: () => <ProfileVenues /> },
    { menuItem: "Rewards", render: () => <ProfileRewards /> },
  ];
  return (
    <Tab
      menu={{
        fluid: true,
        vertical: false,
        tabular: true,
      }}
      menuPosition="left"
      panes={panes}
      onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
    ></Tab>
  );
});
