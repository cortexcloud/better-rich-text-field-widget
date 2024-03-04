import React from "react";
import "./WidgetComponent.css";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateFromHTML } from "draft-js-import-html";

class WidgetComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    // add default value
    let editorState = EditorState.createEmpty();
    if (props.inputData) {
      let contentState = stateFromHTML(props.inputData);
      editorState = EditorState.createWithContent(contentState);
    }

    this.state = {
      editorState: editorState,
      inputData: props.inputData ?? "",
      config: props.config ?? { hideButton: false },
    };
  }

  resetInputData = () => {
    this.setState({
      ...(this.state ?? {}),
      inputData: "hello world",
      editorState: EditorState.createWithContent(
        ContentState.createFromText("hello world")
      ),
    });
  };

  updateInputData = (data) => {
    this.setState({
      ...this.state,
      inputData: data,
    });
    this.props.outputData(data);
  };

  onEditorStateChange = (editorState, inputData) => {
    this.setState({
      ...this.state,
      editorState,
      inputData,
    });
    this.props.outputData(inputData);
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="WidgetComponent">
        {!this.state.config?.hideButton && (
          <button onClick={this.resetInputData}>
            reset input data to hello world
          </button>
        )}
        <span>
          this is a widget template. here you see basic input that also outputs
          data:{" "}
        </span>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={(e) => {
            const html = draftToHtml(
              convertToRaw(e.getCurrentContent())
            )?.trim();
            this.onEditorStateChange(e, html);
          }}
        />
      </div>
    );
  }
}

export default WidgetComponent;
