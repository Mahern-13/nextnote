import {
  fireEvent,
  render,
  waitForElement,
  waitForElementToBeRemoved
} from "@testing-library/react";
import axios from "axios";
import React from "react";
import ArtistBrowser from "./ArtistBrowser";
import { ArtistContextProvider } from "../context/ArtistContext";

jest.mock("axios");

describe("ArtistBrowser", () => {
  it("Renders Adele as the default artist", async () => {
    const tree = (
      <ArtistContextProvider>
        <ArtistBrowser />
      </ArtistContextProvider>
    );
    render(tree);
  });
});
