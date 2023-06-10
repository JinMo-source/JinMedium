import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD } from "../../graphql/query/Mutation";
import { Board, BoardVariables } from "../../graphql/type/api";
import jwt from "jsonwebtoken";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const [header, payload, signature] = token.split(".");
      const decodedHeader = JSON.parse(
        Buffer.from(header, "base64").toString("utf-8")
      );
      const decodedPayload = JSON.parse(
        Buffer.from(payload, "base64").toString("utf-8")
      );
      const secretKey = "sldkvmnlksadnvklasdnv";

      try {
        jwt.verify(token, secretKey);
        console.log("토큰 서명 검증 성공");
      } catch (error: any) {
        console.log("토큰 서명 검증 실패:", error.message);
      }

      console.log("Header:", decodedHeader);
      console.log("Payload:", decodedPayload);
      console.log("Signature:", signature);
    } else {
      console.log("토큰이 존재하지 않습니다.");
    }
  }, []);
  const [CreateBoard] = useMutation<Board, BoardVariables>(CREATE_BOARD);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await CreateBoard({
        variables: {
          input: {
            title,
            description,
          },
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create Board</button>
      </form>
    </div>
  );
};

export default Upload;
