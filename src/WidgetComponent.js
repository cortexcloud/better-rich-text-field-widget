import React, { useState, useEffect } from "react";
import "./WidgetComponent.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateFromHTML } from "draft-js-import-html";

const WidgetComponent = ({ inputData, config, outputData }) => {
  const [editorState, setEditorState] = useState(() => {
    let initialEditorState = EditorState.createEmpty();
    if (inputData) {
      const contentState = stateFromHTML(inputData);
      initialEditorState = EditorState.createWithContent(contentState);
    }
    return initialEditorState;
  });

  useEffect(() => {
    const html = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    )?.trim();
    outputData(html);
  }, [outputData, editorState]);

  const onEditorStateChange = (editorState) => {
    // outputData(html);
    setEditorState(editorState);
  };

  return (
    <div className="WidgetComponent">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbar-container"
        wrapperClassName="wrapper-container"
        editorClassName="editor-container"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default WidgetComponent;
