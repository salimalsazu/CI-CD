// import { fileUrlKey } from "@/utils/envConfig";
import { fileUrlKey } from "@/helpers/config/envConfig";
import Image from "next/image";

type PropType = {
  selected: boolean;
  slide: any;
  onClick: () => void;
};

export const CarouselThumbsButton: React.FC<PropType> = (props) => {
  const { selected, slide, onClick } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <Image
          src={`${fileUrlKey()}/${slide?.src}`}
          alt="Product Image"
          className=" w-full rounded-lg h-[4rem] p-1  md:h-[78px] object-cover"
          width={200}
          height={200}
        />
      </button>
    </div>
  );
};
