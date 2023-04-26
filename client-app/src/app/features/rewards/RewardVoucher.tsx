import * as React from "react";
import { observer } from "mobx-react-lite";
import { Header, Icon, Image } from "semantic-ui-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/store";

const RewardListItem = observer(() => {
  const [time, setTime] = React.useState(180);
  const navigate = useNavigate();
  const { rewardStore } = useStore();
  const { checkReward } = rewardStore;

  const handleComplete = async () => {
    let id = new URLSearchParams(window.location.search).get("id");
    if (id != null) {
      checkReward(id);
    }
    navigate("/rewards");
  }

  React.useEffect(() => {
    if (time <= 0) {
      handleComplete()
    }
    else {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);

  return (
    <div className="m-auto flex h-[calc(100vh-66px)] w-full flex-col items-center justify-between sm:w-1/3">
      <Header className="flex flex-col items-center">
        <p className="pt-16 pb-3">{new URLSearchParams(window.location.search).get("title")}</p>
        <Icon
          name="gift"
          size="big"
          style={{
            color: "#ed2b5d",
          }}
        />
      </Header>
      <div className="flex flex-col items-center space-y-4">
        <Image
          className="mb-12"
          src="/assets/venueCategory/coffee.png"
          size="small"
          circular
          bordered
        />
        <p>Expires in</p>
        <p className="scale-y-[1.3] transform text-[48px] text-[color:var(--bg-purple-100)]">
          0{Math.floor(time / 60)} :{" "}
          {time % 60 < 10 ? "0" + (time % 60) : time % 60}
        </p>
        <div className="text-center">
          <p>Date of issue</p>
          <p className="text-[20px]">
            {format(new Date(), "MM/dd/yyyy hh:mm")}
          </p>
        </div>
      </div>
      <div
        className="w-full border-[1px] border-[color:var(--bg-purple-100)] bg-[color:var(--bg-purple-100)] py-[1rem] text-center text-[white] hover:cursor-pointer"
        onClick={handleComplete}
      >
        Complete
      </div>
    </div>
  );
});

export default RewardListItem;
