import Image from "next/image";
import Rating from "./rating";
import Link from "next/link";
const ReviewCard = ({
  name,
  title,
  imageSrc,
  rating,
  review,
  url_slug,
  enrolled,
}: {
  name: string;
  title: string;
  imageSrc: string;
  rating: number | string;
  review: string;
  url_slug: string;
  enrolled: boolean;
}) => {
  return (
    <Link href={enrolled ? `/paid/${url_slug}#rev` : `/unpaid/${url_slug}#rev`}>
      <div className=" rounded-lg p-6 pl-8 pr-8 max-w-mm shadow-sm bg-grren-gra relative z-30">
        <div className="flex flex-wrap md:flex-nowrap gap-x-15px gap-y-10px items-center review-list">
          <div className="w-20 h-20">
            <Image
              src={imageSrc}
              alt={""}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-bold text-white">{name}</h2>
            <p className="text-gray-50 text-md">{title}</p>
            <div className="flex items-center rating-custom">
              <Rating cid={url_slug} rating={Number(rating)} />
            </div>
          </div>
        </div>
        <div className="text-white text-md mt-4">
          <div
            className="remove-all"
            dangerouslySetInnerHTML={{ __html: review ?? "" }}
          />
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
