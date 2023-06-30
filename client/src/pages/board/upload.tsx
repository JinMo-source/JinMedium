import TextEditor from "@/components/textEditor";
import { useState, useEffect } from "react";

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
