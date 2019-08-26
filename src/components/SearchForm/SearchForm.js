import React, { memo, useState } from "react";
import { Default as SubmitButton } from "../Button/Button.js";
import { Primary as PrimaryCard } from "../Card/Card.js";
import { useArtistActionsContext } from "../../context/ArtistContext";
import TextInput from "../TextInput/TextInput";
import Wrapper, { Row } from "../Wrapper/Wrapper";
import axios from "axios";
import { withAsync } from "../../utils";

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
  const { fetchArtist } = useArtistActionsContext();

  const { form, onChange, resetForm } = useForm({
    name: ""
  });

  const { name } = form;

  const _onSubmitForm = async () => {
    const [response, error] = await withAsync(() =>
      axios.get(
        `http://localhost:3000/spotify/search/${name}?userId=bronzedradio`
      )
    );

    if (error) {
      console.error("Error:", error);
      return;
    }

    fetchArtist(response.data);
    resetForm();
  };

  return (
    <Wrapper styling={{ width: "100%" }}>
      <PrimaryCard className="search-artist" cardType="primary" header={false}>
        <Row styling={{ justifyContent: "space-between" }}>
          <TextInput
            id="name-input"
            label="Artist Name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
          <SubmitButton
            styling={{ marginLeft: "10px" }}
            disabled={false}
            text="Search"
            onClick={_onSubmitForm}
            buttonSize="LARGE"
          />
        </Row>
      </PrimaryCard>
    </Wrapper>
  );
};

export default memo(SearchArtist);
