import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_BOARD } from "@/graphql/query/boardQueries";
import { Board, FetchDataById } from "@/graphql/type/api";

function Edit() {
  const router = useRouter();
  const URL = Number(router.query.id);
  const [editBoard] = useMutation<Board, FetchDataById>(EDIT_BOARD);
  const [edit, setEdit] = useState([]);
  const fetchDataById = async () => {
    try {
      const { data } = await editBoard({
        variables: {
          ID: { id: URL },
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (URL) {
      fetchDataById();
    }
  }, [URL, editBoard]);

  return (
    <div>
      <h1>Edit {URL}</h1>
      {/* 추가적인 컴포넌트 및 로직 */}
    </div>
  );
}

export default Edit;
