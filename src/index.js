import React from "react";
import * as ReactDOM from "react-dom";
import WidgetComponent from "./WidgetComponent";

class WidgetElementWrapper extends HTMLElement {
  descriptor = {
    valueModel: {
      type: "string",
      metadata: { title: "Note" },
    },
    configuration: {
      hideButton: { type: "boolean", defaultValue: false },
    },
  };
  _config;
  _inputData;

  get inputData() {
    return this._inputData;
  }
  set inputData(data) {
    this._inputData = data;
    this.update();
  }

  get config() {
    return this._config;
  }
  set config(config) {
    this._config = config;
    this.update();
  }

  getProps() {
    return {
      inputData: this._inputData,
      config: this._config,
      outputData: (value) =>
        this.dispatchEvent(new CustomEvent("outputData", { detail: value })),
    };
  }

  update() {
    this.unmount();
    this.mount();
  }

  mount() {
    ReactDOM.render(<WidgetComponent {...this.getProps()} />, this);
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this);
  }

  /**
   * custom elements lifecycle callbacks
   * https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
   */
  connectedCallback() {
    this.mount();
  }

  disconnectedCallback() {
    this.unmount();
  }
}
customElements.define("react-template-widget", WidgetElementWrapper);
