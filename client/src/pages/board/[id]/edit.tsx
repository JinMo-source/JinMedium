import { useRouter } from "next/router";

function Edit() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Edit {id}</h1>
      {/* 추가적인 컴포넌트 및 로직 */}
    </div>
  );
}

export default Edit;
