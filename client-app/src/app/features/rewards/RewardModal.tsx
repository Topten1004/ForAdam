import * as React from "react";
import { observer } from "mobx-react-lite";
import { Modal, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const RewardModal = observer(({ open, handleClose, title, id }: any) => {
  const navigate = useNavigate();

  return (
    <Modal size="mini" open={open} onClose={handleClose}>
      <Modal.Header className="text-center">
        <Icon
          name="gift"
          size="big"
          style={{
            color: "#ed2b5d",
          }}
          className="!mt-4"
        />
        <p>{title}</p>
      </Modal.Header>
      <Modal.Content className="!py-[1rem] !px-[4rem] text-center sm:!py-[1rem] sm:!px-[4rem]">
        <p className="text-[16px]">
          Do you want to redeem this reward now? Your reward voucher screen is
          time stamped and will displayed for <br />{" "}
        </p>
        <p className="text-[24px] font-bold">3 minutes</p>
        <p className="text-[16px]">
          after which your reward will be removed. Please wait until you are at
          the register before pressing Redeem.
        </p>
      </Modal.Content>
      <Modal.Actions className="flex justify-around">
        <p
          className="mb-3 text-[20px] font-bold hover:cursor-pointer hover:text-[color:var(--bg-purple-100)]"
          onClick={handleClose}
        >
          Cancel
        </p>
        <p
          className="mb-3 text-[20px] font-bold hover:cursor-pointer hover:text-[color:var(--bg-purple-100)]"
          onClick={() => {
            handleClose();
            navigate(`/reward/voucher?title=${title}&&id=${id}`);
          }}
        >
          Redeem
        </p>
      </Modal.Actions>
    </Modal>
  );
});

export default RewardModal;
