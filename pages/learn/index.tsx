import { HeartIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function DocsPage() {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  const [likes, setLikes] = useState(0);
  const handleLikes = () => {
    setLikes(likes + 1);
  };
  const resetLikes = () => {
    setLikes(0);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col gap-5 max-w-lg text-center justify-center">
          <h1 className={title()}>Learni Verse </h1>
          <div className="flex justify-center items-center">
            <HeartIcon />
            <p> : {likes}</p>
          </div>
          <ul>
            {names.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <Button onClick={handleLikes}>Click for Like</Button>
          <Button className="self-center px" onClick={resetLikes}>
            Click for Reset Like
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
