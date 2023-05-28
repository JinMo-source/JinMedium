import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { BOARD_DFETCH_BY_DATA_ID } from "@/graphql/query/boardQueries";
import { BoardOutput, BoardVariables } from "../../../graphql/type/api";
import {
  Board,
  FetchDataById,
  Board_Fetch_Data_By_Id,
} from "@/graphql/type/api";
import { EDIT_BOARD } from "@/graphql/query/boardMutation";

function Edit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const URL = Number(router.query.id);

  const { loading, error, data } = useQuery<
    Board_Fetch_Data_By_Id,
    FetchDataById
  >(BOARD_DFETCH_BY_DATA_ID, {
    variables: { ID: { id: URL } },
    skip: !URL,
  });
  const [EditBoard] = useMutation<Board, BoardVariables>(EDIT_BOARD);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await EditBoard({
        variables: {
          input: {
            id: URL,
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

  useEffect(() => {
    if (data) {
      setTitle(data?.BoardFetchByDataId.title);
      setDescription(data?.BoardFetchByDataId.description);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        name="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create Board</button>
    </form>
  );
}

export default Edit;
