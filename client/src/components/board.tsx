import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_INITIAL_DATA, GET_Recent_Board_Query } from "@/until/boardQueries";

interface BoardData {
  content: string;
  createAt: string;
}

const Board = () => {
  const { loading, error, data } = useQuery<BoardData>(GET_INITIAL_DATA);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  console.log(data);
  return (
    <ul>
      {/* {GetrecentBoard.map((board: any) => (
        <div key={board.id}>
          <h3>{board.content}</h3>
        </div>
      ))} */}
    </ul>
  );
};

export default Board;
