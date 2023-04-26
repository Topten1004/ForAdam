import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useStore } from "../../stores/store";
import LoadingComponent from "../../layout/LoadingComponent";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

export default observer(function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { profileStore } = useStore();
  const { loadProfile, loadingProfile, profile, setActiveTab } = profileStore;

  useEffect(() => {
    loadProfile(username!);

    return () => {
      setActiveTab(0);
    };
  }, [loadProfile, username]);

  if (loadingProfile) return <LoadingComponent />;
  return (
    <Grid>
      <Grid.Column>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
});
