import React, { memo, useState } from "react";
import { Default as SubmitButton } from "../Button/Button";
import { Primary as Card } from "../Card/Card";
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

  const _onSubmitForm = async e => {
    e.preventDefault();
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
      <Card className="search-artist" header={false}>
        <form onSubmit={_onSubmitForm}>
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
              type="submit"
              text="Search"
              buttonSize="LARGE"
            />
          </Row>
        </form>
      </Card>
    </Wrapper>
  );
};

export default memo(SearchArtist);
