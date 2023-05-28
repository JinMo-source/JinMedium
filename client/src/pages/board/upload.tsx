import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD } from "../../graphql/query/boardMutation";
import { Board, BoardVariables } from "../../graphql/type/api";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
