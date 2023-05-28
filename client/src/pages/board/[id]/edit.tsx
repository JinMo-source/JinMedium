import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_BOARD } from "@/graphql/query/boardQueries";
import { Board, FetchDataById, EditBoardData } from "@/graphql/type/api";

function Edit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const URL = Number(router.query.id);
  const { loading, error, data } = useQuery<EditBoardData, FetchDataById>(
    EDIT_BOARD,
    {
      variables: { ID: { id: URL } },
    }
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={data?.EditBoard.title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={data?.EditBoard.description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create Board</button>
    </form>
  );
}

export default Edit;
