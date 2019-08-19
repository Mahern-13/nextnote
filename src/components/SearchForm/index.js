import React, { memo, useEffect, useState } from "react";
import { Default as SubmitButton } from "../Button/Button.js";
import { Primary as PrimaryCard } from "../Card/Card.js";
import TextInput from "../TextInput";
import { Wrapper } from "../Wrapper";

const useForm = (fields = {}) => {
  const [formState, setFormState] = useState(fields);
  const onChange = e => {
    const formData = {
      ...formState,
      [e.target.name]: e.target.value
    };

    setFormState(formData);
  };

  const resetForm = () => {
    setFormState(fields);
  };
  return {
    form: formState,
    onChange,
    resetForm
  };
};

const SearchArtist = () => {
  const { form, onChange, resetForm } = useForm({
    name: ""
  });

  const { name } = form;

  const _onSubmitForm = () => {
    console.log(name);
    resetForm();
  };

  return (
    <PrimaryCard className="search-artist" cardType="primary" header={false}>
      <Wrapper styling={{ justifyContent: "space-between" }}>
        <TextInput
          id="name-input"
          label="Artist Name"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
        />
        <SubmitButton
          disabled={false}
          text="Submit"
          onClick={_onSubmitForm}
          buttonSize="LARGE"
        />
      </Wrapper>
    </PrimaryCard>
  );
};

export default memo(SearchArtist);
