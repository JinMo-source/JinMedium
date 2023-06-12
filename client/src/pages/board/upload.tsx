import { useState, useEffect } from "react";
import TextEditor from "@/components/textEditor";

const Upload = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div>
      <h1>Upload</h1>
      <TextEditor />
    </div>
  );
};

export default Upload;
