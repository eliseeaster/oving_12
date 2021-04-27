import * as React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { LoadingView } from "../src/client/components/LoadingView";

describe("loading view", () => {
  it("shows loading view", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<LoadingView />, container);
    });
    expect(container.innerHTML).toMatchSnapshot();
  });
});
