// components/CustomEditor.js

import React from "react";
import { useField } from "formik";
//import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const CustomEditor = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty() || []
  );

  const handleEditorStateChange = (state) => {
    setEditorState(state);
    const contentState = convertToRaw(state.getCurrentContent());
    helpers.setValue(JSON.stringify(contentState)); // Store content in Formik
  };

  return (
    <div>
      <label>{label}</label>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "link",
            "history",
          ],
        }}
      />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomEditor;
