import React from "react";
import Footer from "../../components/Footer";

const UserTerms = () => {
  return (
    <div className="ui segment">
      <h3 className="ui header">
        General User Terms for Loyalty and Reward Programs
      </h3>
      <p>
        By participating in our loyalty and reward program, you agree to the
        following terms:
      </p>
      <ol>
        <li>
          You must be at least 18 years of age or the age of majority in your
          jurisdiction to participate.
        </li>
        <li>
          The rewards and benefits offered are at our sole discretion and may be
          changed or discontinued at any time without notice.
        </li>
        <li>
          Rewards have no cash value and cannot be exchanged for cash or other
          forms of currency.
        </li>
        <li>
          Rewards are non-transferable and may only be used by the account
          holder.
        </li>
        <li>
          We reserve the right to terminate or suspend your account and/or
          revoke rewards if we determine, in our sole discretion, that you have
          violated these terms or engaged in fraudulent activity.
        </li>
        <li>We are not responsible for lost or stolen rewards.</li>
        <li>
          We may use your personal information to administer the program and
          communicate with you about rewards, promotions, and other
          program-related information.
        </li>
        <li>
          We may modify these terms at any time without notice, and your
          continued participation in the program constitutes your acceptance of
          any changes.
        </li>
      </ol>
    </div>
  );
};

export default UserTerms;
