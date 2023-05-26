import { useMutation } from "@apollo/client";
import { CREATE_BOARD } from "../graphql/mutations";
import { useState } from "react";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createBoard] = useMutation(CREATE_BOARD);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const { data } = await createBoard({
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
  );
};

export default Upload;
