import React from "react";
import "./WidgetComponent.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateFromHTML } from "draft-js-import-html";

class WidgetComponent extends React.Component {
  constructor(props) {
    super(props);
    // add default value
    let editorState = EditorState.createEmpty();
    if (props.inputData) {
      let contentState = stateFromHTML(props.inputData);
      editorState = EditorState.createWithContent(contentState);
    }

    this.state = {
      editorState: editorState,
      inputData: props.inputData,
      config: props.config,
    };
  }

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
    const { editorState, inputData } = this.state;
    return (
      <div className="WidgetComponent">
        {inputData}
        <Editor
          editorState={editorState}
          toolbarClassName="toolbar-container"
          wrapperClassName="wrapper-container"
          editorClassName="editor-container"
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
