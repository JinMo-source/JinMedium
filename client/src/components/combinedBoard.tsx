import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { Board, CombinedBoardInput, GetTagsInput } from "@/graphql/type/api";
import { COMBINED_BOARD, GET_TAGS } from "@/graphql/query/Mutation";

type PreviewProps = {
  title: string;
  images: any[];
  handleSendClick: () => void; // handleSendClick 함수를 prop으로 전달받습니다.
};
const CombinedBoard = ({ title, images, handleSendClick }: PreviewProps) => {
  const [previewTitle, setPreviewTitle] = useState<string>(title);
  const [previewSubtitle, setPreviewSubtitle] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>(
    images.length > 0 ? images[0].insert.image : ""
  );
  const [tags, setTags] = useState<Array<string>>([]);
  const [tagValue, setTagValue] = useState<string>("");
  const [imageSelcetBoolean, setImageSelectBoolean] = useState<boolean>(false);
  const [imageSelcet, setImageSelect] = useState<Array<any>>(images);

  const [CreateCombinedBoard] = useMutation<Board, CombinedBoardInput>(
    COMBINED_BOARD
  );
  const [GetTags] = useMutation<Board, GetTagsInput>(GET_TAGS);

  const handleCombinedSendClick = async () => {
    try {
      console.log(typeof tags);
      const createBoardResponse = await CreateCombinedBoard({
        variables: {
          input: {
            title: previewTitle,
            subTitle: previewSubtitle,
            imagePath: previewImage,
          },
        },
      });
      const createBoardData = createBoardResponse.data;

      const getTagsResponse = await GetTags({
        variables: {
          input: {
            tags: tags,
          },
        },
      });
      const getTagsData = getTagsResponse.data;
      console.log(createBoardData);
      console.log(getTagsData);

      await handleSendClick();
    } catch (error) {
      console.log(error);
    }
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewTitle(event.target.value);
  };

  const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewSubtitle(event.target.value);
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = event.target.value.trim();
    const inputPush: string = inputValue.split(",")[0];
    const character = ",";
    console.log(tags);
    if (inputValue.includes(character)) {
      if (inputValue === ",") {
        setTagValue("");
      } else {
        setTags((prevTags) => [...prevTags, inputPush]);
        setTagValue("");
      }
    } else {
      setTagValue(inputValue);
    }
  };
  const handleRemoveTag = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };
  const handleSelectImage = (image_src: string) => {
    console.log(image_src);
    setPreviewImage(image_src);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageSrc = e.target?.result;
        if (typeof imageSrc === "string") {
          const base64Image = { insert: { image: imageSrc } };
          setImageSelect((imageSelcet) => [...imageSelcet, base64Image]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="preview-board">
      <div>
        <p>Story Preview</p>
        {imageSelcetBoolean ? (
          <div>
            <button onClick={() => setImageSelectBoolean(false)}>완료</button>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            {imageSelcet.map((item, index) => (
              <div
                style={{ cursor: "pointer" }}
                key={index}
                onClick={() => handleSelectImage(item.insert.image)}
              >
                <Image
                  src={item.insert.image}
                  alt={`이미지 ${index}`}
                  width={300}
                  height={200}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {previewImage && (
              <div>
                <Image
                  src={previewImage}
                  alt="preview images"
                  width={300}
                  height={200}
                />
              </div>
            )}
            <button onClick={() => setImageSelectBoolean(true)}>
              미리보기 이미지를 선택해주세요.
            </button>
          </div>
        )}
      </div>
      <div>
        <form>
          <input
            type="text"
            placeholder="Title"
            value={previewTitle}
            onChange={handleTitleChange}
            required
          />
          <input
            type="text"
            value={previewSubtitle}
            placeholder="SubTitle"
            onChange={handleSubtitleChange}
          />
          <div>
            <h3>Publishing to: Username</h3>
            <p>태그를 추가하여 이야기의 주제를 알려주세요.</p>
            <div>
              <input
                type="text"
                value={tagValue}
                placeholder="add a Tags..."
                onChange={handleTagsChange}
              />
            </div>
            <div>
              {tags.map((tag, index) => (
                <span key={index} className="tagsButton">
                  {tag}
                  <button
                    id={`${tag}_${index}`}
                    onClick={(event) => handleRemoveTag(event, index)}
                  >
                    ❌
                  </button>
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
      <button onClick={handleCombinedSendClick}>Publish now</button>
    </div>
  );
};

export default CombinedBoard;
