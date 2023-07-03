import Image from "next/image";

const ChangeProfile = () => {
  const handleChangePhoto = () => {
    console.log("handleChangePhoto");
  };
  const handleRemovePhoto = () => {
    console.log("handleChangePhoto");
  };
  return (
    <>
      <div>
        <div>
          <span>Photo</span>
          <Image src="" alt="Profile Image" width={300} height={300} />
          <button onClick={handleChangePhoto}>Update</button>
          <button onClick={handleRemovePhoto}>Remove</button>
        </div>
      </div>
    </>
  );
};

export default ChangeProfile;
