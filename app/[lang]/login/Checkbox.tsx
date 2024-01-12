import Image from "next/image";
import Tick from "@/public/tick.svg";

export default function Checkbox({
  checked,
  setChecked,
  text,
}: {
  checked: boolean;
  setChecked: Function;
  text: string;
}) {
  return (
    <>
      <div
        className="w-full cursor-pointer flex justify-start items-center mt-6 gap-2 "
        onClick={(e) => setChecked((c: boolean) => !c)}
      >
        <div
          className={`rounded-md flex justify-center items-center w-5 h-5 hover:bg-primary hover:bg-opacity-70 ${
            checked ? "bg-primary" : "bg-card"
          }`}
        >
          {checked && <Image src={Tick} alt="tick" width={20} height={20} />}
        </div>
        <p>{text}</p>
      </div>
    </>
  );
}
