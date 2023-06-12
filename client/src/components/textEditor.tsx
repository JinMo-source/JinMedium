import dynamic from "next/dynamic";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD } from "@/graphql/query/Mutation";
import { Board, BoardVariables } from "@/graphql/type/api";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Delta from "quill-delta";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const TextEditor = () => {
  const [content, setContent] = useState<string>("");
  const [createBoard] = useMutation<Board, BoardVariables>(CREATE_BOARD);
  const [delta, setDelta] = useState(null);

  const handleSendClick = async () => {
    try {
      const { data } = await createBoard({
        variables: {
          input: {
            content,
          },
        },
      });
      console.log(data);
      console.log(content);
    } catch (error) {
      console.log(error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  // const delta1 = new Delta()
  //   .insert("Hello", { bold: true })
  //   .insert(" World", { bold: true })
  //   .insert(" ccc");
  // console.log(delta1);

  const handleDeltaChange = (
    content: string,
    delta: any,
    source: string,
    editor: any
  ) => {
    const currentDelta = editor.getContents();
    setContent(currentDelta);
    // const currentDeltaLength = currentDelta.length();
    // const prevDeltaLength = prevDelta.length();
    // console.log(delta);
    // console.log(prevDelta);
  };

  return (
    <div>
      {ReactQuill && (
        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          placeholder={"Text를 작성해주세요"}
          onChange={(content, delta, source, editor) =>
            handleDeltaChange(content, delta, source, editor)
          }
        />
      )}
      <button onClick={handleSendClick}>Click</button>
    </div>
  );
};

export default TextEditor;
