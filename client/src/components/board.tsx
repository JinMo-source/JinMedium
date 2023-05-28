import { Board, GetBoardData } from "../graphql/type/api";
import { GET_BOARD } from "../graphql/query/boardQueries";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import Link from "next/link";

const Board = () => {
  const { loading, error, data } = useQuery<GetBoardData>(GET_BOARD);
  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    console.log(error);
  }

  console.log(data?.getBoard);
  return (
    <ul>
      {data ? (
        data.getBoard.map((board: Board) => (
          <Link key={board.id} href={`/board/${board.id}/edit`}>
            <li key={board.id}>
              제목 : {board.title}, <br />
              내용 :{board.description}
              <br />
            </li>
          </Link>
        ))
      ) : (
        <h2>Please wait for data</h2>
      )}
    </ul>
  );
};

export default Board;
