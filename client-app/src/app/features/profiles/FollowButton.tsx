import { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Profile } from "../../models/Profile";
import { useStore } from "../../stores/store";

interface Props {
  profile: Profile;
}

export default observer(function FollowButton({ profile }: Props) {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loading } = profileStore;

  if (userStore.user?.userName === profile.username) return null;

  function handleFollow(e: SyntheticEvent, username: string) {
    e.preventDefault();
    profile.following
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
  }

  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          fluid
          style={{ backgroundColor: "#ed2b5d", color: "#ffffff" }}
          content={profile.following ? "Following" : "Not following"}
        ></Button>
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: "100%" }}>
        <Button
          loading={loading}
          onClick={(e) => handleFollow(e, profile.username)}
          fluid
          color={profile.following ? "red" : "green"}
          content={profile.following ? "Unfollow" : "Follow"}
        ></Button>
      </Reveal.Content>
    </Reveal>
  );
});
