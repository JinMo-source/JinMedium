import BoardList from "../components/board";
import Link from "next/link";

export default function home() {
  return (
    <div>
      <div>
        <BoardList />;
      </div>
      <div>
        <Link href={"/join"}>Join</Link>
        <Link href={"/login"}>login</Link>
      </div>
    </div>
  );
}
