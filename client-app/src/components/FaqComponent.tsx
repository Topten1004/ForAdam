import Faq from "./Faq";
import "../app/styles/faq.module.css";

const FaqComponent = () => {
  const faqs = [
    {
      key: 0,
      title: "How do customers collect stamps?",
      description:
        "We offer a number of stamp validation methods to suit a variety of businesses",
    },
    {
      key: 1,
      title: "How long does it take to set up a program on Stampify?",
      description:
        "Not long at all! Once you have registered, our team will activate your digital QR card. We will provide you with all you need to operate a simple loyalty program.",
    },
    {
      key: 2,
      title: "How much does the Stampify app costs?",
      description: "It's free to use!",
    },
    {
      key: 3,
      title: "What kinds of business is Stampify suitable for?",
      description:
        "The program works for any type of business looking to incentivise and reward repeat behaviour.",
    },
  ];

  const faqComponents = faqs.map((faq) => {
    return (
      <Faq key={faq.key} title={faq.title} description={faq.description} />
    );
  });

  return (
    <section className="wrapper mb-8 flex items-center">
      <div
        className={
          "m-5 flex flex-auto flex-col items-center rounded-xl bg-white md:flex-row"
        }
      >
        <div className="mb-2 w-full flex-auto p-2">
          <h1 className="flex-none py-8 pl-3 text-center text-3xl font-semibold tracking-wide text-[color:var(--bg-purple-100)]">
            FAQ
          </h1>

          {faqComponents}
        </div>
      </div>
    </section>
  );
};

export default FaqComponent;
