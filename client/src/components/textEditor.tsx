import dynamic from "next/dynamic";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD } from "@/graphql/query/Mutation";
import {
  Operation,
  OperationOps,
  OperationInput,
  Board,
} from "@/graphql/type/api";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const TextEditor = () => {
  const [content, setContent] = useState<string>("");
  const [CreateBoard] = useMutation<Board, OperationInput>(CREATE_BOARD);

  const handleSendClick = async () => {
    try {
      if (!content) {
        console.log("Content is undefined");
        return;
      }

      const deltaOps: OperationOps = {
        ops: JSON.parse(JSON.stringify(content)).ops,
      };

      const delta: Operation[] = deltaOps.ops
        .map((item: any) => {
          const insertValue =
            typeof item.insert === "string"
              ? { insertString: item.insert }
              : { insertObject: item.insert };

          return {
            insert: insertValue,
            delete: item.delete as number,
            retain: item.retain as number,
            attributes: item.attributes as { [key: string]: any },
          };
        })
        .reduce((filteredDelta: Operation[], item: Operation) => {
          // undefined 값을 가진 속성을 필터링합니다.
          const filteredItem = Object.fromEntries(
            Object.entries(item).filter(([_, value]) => value !== undefined)
          );

          // 필터링된 객체가 빈 객체가 아닐 경우에만 추가합니다.
          if (Object.keys(filteredItem).length > 0) {
            filteredDelta.push(filteredItem);
          }

          return filteredDelta;
        }, []) as [Operation];

      if (delta.length === 0) {
        console.log("Delta array is empty");
        return;
      }

      const { data } = await CreateBoard({
        variables: {
          input: { ops: delta },
        },
      });
      console.log(data);
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

  const handleDeltaChange = (
    content: string,
    delta: any,
    source: string,
    editor: any
  ) => {
    const currentDelta = editor.getContents();
    setContent(currentDelta);
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
