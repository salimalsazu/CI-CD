import { ReactNode } from "react";
import { Placeholder } from "rsuite";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  isLoading: boolean;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
  isLoading,
}) => {
  return (
    <div
      className={`rounded-sm border border-stroke bg-white ${
        isLoading ? "px-3 pt-3 pb-1.5" : "py-6 px-7.5"
      } shadow-default dark:border-strokedark dark:bg-boxdark`}
    >
      {isLoading ? (
        <Placeholder.Graph height={150} active={!isLoading} />
      ) : (
        <>
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            {children}
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <span className="text-md font-medium">{title}</span>
            </div>

            <h1 className="flex text-5xl text-black-2 items-center gap-1 font-semibold">
              {total ?? "0"}
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default CardDataStats;
