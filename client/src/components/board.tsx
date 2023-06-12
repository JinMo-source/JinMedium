// import { useState } from "react";
// import { useMutation, useQuery } from "@apollo/client";
// import Link from "next/link";

// import {
//   Board,
//   BoardOutput,
//   FetchDataById,
//   GetBoardData,
// } from "../graphql/type/api";
// import { GET_BOARD } from "../graphql/query/Queries";
// import { DELETE_BOARD } from "@/graphql/query/Mutation";

// const BoardList = () => {
//   const [DeleteBoard] = useMutation<BoardOutput, FetchDataById>(DELETE_BOARD);
//   const { loading, error, data, refetch } = useQuery<GetBoardData>(GET_BOARD);

//   const handleRemove = async (id?: number) => {
//     if (id) {
//       try {
//         await DeleteBoard({
//           variables: { ID: { id } },
//         });
//         refetch();
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   if (loading) {
//     return <div>Loading</div>;
//   }

//   if (error) {
//     return <div>Error occurred: {error.message}</div>;
//   }

//   return (
//     <ul>
//       {data ? (
//         data.getBoard.map((board: Board) => (
//           <div key={board.id} id={`${board.id}`}>
//             <Link href={`/board/${board.id}/edit`}>
//               <li>
//                 제목: {board.title}, <br />
//                 내용: {board.description}
//                 <br />
//               </li>
//             </Link>
//             <Link href={`/board/${board.id}/edit`}>
//               <button>수정</button>
//             </Link>
//             <button onClick={() => handleRemove(board.id)}>삭제</button>
//           </div>
//         ))
//       ) : (
//         <h2>Please wait for data</h2>
//       )}
//     </ul>
//   );
// };

// export default BoardList;
