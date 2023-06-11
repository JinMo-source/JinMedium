import Link from "next/link";

const Header = () => {
  return (
    <header>
      <h1>Medium Clone Coing</h1>
      <div>
        <Link href={"/join"}>Join</Link>
        <br />
        <Link href={"/login"}>login</Link>
        <br />
        <Link href={"/board/upload"}>upload</Link>
      </div>
    </header>
  );
};

export default Header;
