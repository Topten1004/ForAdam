import React, { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useStore } from "../../../stores/store";
import { VenueFormValues } from "../../../models/venue";
import LoadingComponent from "../../../layout/LoadingComponent";
import MyTextInput from "../../../common/form/MyTextInput";
import MySelectInput from "../../../common/form/MySelectInput";

export default observer(function VenueForm() {
  const navigate = useNavigate();
  const { venueStore } = useStore();
  const { createVenue, updateVenue, loadVenue, loadingInitial } = venueStore;

  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<VenueFormValues>(new VenueFormValues());

  useEffect(() => {
    if (id) {
      loadVenue(id).then((venue) => {
        setVenue(new VenueFormValues(venue!));
      });
    }
  }, [id, loadVenue]);

  function handleFormSubmit(venue: VenueFormValues) {
    if (!venue.id) {
      let newVenue = {
        ...venue,
        id: uuid(),
      };
      createVenue(newVenue).then(() => navigate(`/activities/${newVenue.id}`));
    } else {
      updateVenue(venue).then(() => navigate(`/activities/${venue.id}`));
    }
  }

  if (loadingInitial) return <LoadingComponent />;

  return (
    <Segment clearing>
      <Header content="Venue Details" sub color="teal" />
      <Formik
        enableReinitialize
        initialValues={venue}
        onSubmit={(values) => handleFormSubmit(values)}
        validationSchema={Yup.object({
          name: Yup.string().required("Venue name is required"),
          address: Yup.string().required("Address is required"),
          created: Yup.date().required("Creation date is required"),
          category: Yup.string().required("Category is required"),
          city: Yup.string().required("City is required"),
          country: Yup.string().required("Country is required"),
          logo: Yup.string().required("Logo URL is required"),
          phone: Yup.string().required("Phone number is required"),
          status: Yup.string().required("Status is required"),
          qrCode: Yup.string().required("QR code is required"),
        })}
      >
        {({
          handleSubmit,
          isValid,
          isSubmitting,
          dirty,
          setFieldValue,
          values,
        }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="name" placeholder="Venue Name" />
            <MyTextInput name="address" placeholder="Address" />
            <MyTextInput name="created" placeholder="Creation Date" />
            <MyTextInput name="category" placeholder="Category" />
            <MyTextInput name="city" placeholder="City" />
            <MyTextInput name="country" placeholder="Country" />
            <MyTextInput name="logo" placeholder="Logo URL" />
            <MyTextInput name="phone" placeholder="Phone Number" />
            <MyTextInput name="status" placeholder="Status" />
            <MyTextInput name="qrCode" placeholder="QR Code" />

            <MySelectInput
              name="status"
              placeholder="Venue Status"
              options={[
                { key: "enabled", text: "Enabled", value: "Enabled" },
                { key: "disabled", text: "Disabled", value: "Disabled" },
              ]}
            />
            <MyTextInput name="qrCode" placeholder="Venue QR Code" />

            {/* Offers */}
            <FieldArray name="offers">
              {({ push, remove }) => (
                <>
                  {values.offers && values.offers.length > 0 ? (
                    values.offers.map((offer, index) => (
                      <div key={index}>
                        <h4>Offer #{index + 1}</h4>
                        <MyTextInput
                          name={`offers[${index}].name`}
                          placeholder="Name"
                        />
                        <MyTextInput
                          name={`offers[${index}].description`}
                          placeholder="Description"
                        />
                        <MyTextInput
                          name={`offers[${index}].terms`}
                          placeholder="Terms"
                        />
                        <MyTextInput
                          name={`offers[${index}].maxNumberOfStamps`}
                          placeholder="Max Number Of Stamps"
                        />
                        <MyTextInput
                          name={`offers[${index}].stampsToGiveWhenJoin`}
                          placeholder="Stamps To Give When Join"
                        />
                        <MyTextInput
                          name={`offers[${index}].expireDate`}
                          placeholder="Expire Date"
                          type="date"
                        />

                        {/* Offer Rewards */}
                        <FieldArray name={`offers[${index}].offerRewards`}>
                          {({ push: pushReward, remove: removeReward }) => (
                            <>
                              {offer.offerRewards &&
                              offer.offerRewards.length > 0 ? (
                                offer.offerRewards.map(
                                  (offerReward: any, rewardIndex: any) => (
                                    <div key={rewardIndex}>
                                      <h5>Reward #{rewardIndex + 1}</h5>
                                      <MyTextInput
                                        name={`offers[${index}].offerRewards[${rewardIndex}].reward.name`}
                                        placeholder="Name"
                                      />
                                      <MyTextInput
                                        name={`offers[${index}].offerRewards[${rewardIndex}].attachToStampNumber`}
                                        placeholder="Attach To Stamp Number"
                                      />
                                      <MyTextInput
                                        name={`offers[${index}].offerRewards[${rewardIndex}].daysToExpire`}
                                        placeholder="Days To Expire"
                                        type="number"
                                      />
                                      <Button
                                        type="button"
                                        color="red"
                                        onClick={() =>
                                          removeReward(rewardIndex)
                                        }
                                      >
                                        Remove Reward
                                      </Button>
                                      <br />
                                      <br />
                                    </div>
                                  )
                                )
                              ) : (
                                <Button
                                  type="button"
                                  onClick={() =>
                                    pushReward({
                                      reward: { name: "" },
                                      attachToStampNumber: 0,
                                      daysToExpire: 0,
                                    })
                                  }
                                >
                                  Add Reward
                                </Button>
                              )}
                            </>
                          )}
                        </FieldArray>

                        <Button
                          type="button"
                          color="red"
                          onClick={() => remove(index)}
                        >
                          Remove Offer
                        </Button>
                        <br />
                        <br />
                      </div>
                    ))
                  ) : (
                    <Button
                      type="button"
                      onClick={() =>
                        push({
                          name: "",
                          description: "",
                          terms: "",
                          maxNumberOfStamps: 0,
                          stampsToGiveWhenJoin: 0,
                          expireDate: "",
                        })
                      }
                    >
                      Add Offer
                    </Button>
                  )}
                </>
              )}
            </FieldArray>
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            ></Button>
            <Button
              as={Link}
              to={"/venues"}
              floated="right"
              type="button"
              content="Cancel"
            ></Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
