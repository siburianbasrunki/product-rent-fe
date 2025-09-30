import React from "react";

const cx = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(" ");

type BaseSize = number | string;

export type SkeletonProps = {
  width?: BaseSize; 
  height?: BaseSize; 
  variant?: "rect" | "text" | "circle";
  rounded?: boolean | string;
  className?: string;
  count?: number; 
  style?: React.CSSProperties;
  "aria-label"?: string;
};

const toPx = (v?: BaseSize) => (typeof v === "number" ? `${v}px` : v);

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = "rect",
  rounded = true,
  className,
  count = 1,
  style,
  ...rest
}) => {
  const roundedClass =
    typeof rounded === "string" ? rounded : rounded ? "rounded-lg" : "";

  const blocks = Array.from({ length: Math.max(1, count) });

  return (
    <>
      {blocks.map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={cx(
            "bg-gray-200/90 dark:bg-gray-700/60 animate-pulse",
            roundedClass,
            className,
            variant === "text" && "h-3",
            variant === "circle" && "rounded-full"
          )}
          style={{
            width: toPx(width),
            height:
              variant === "text" ? toPx(height) ?? "0.75rem" : toPx(height),
            ...style,
          }}
          {...rest}
        />
      ))}
    </>
  );
};

export const SkeletonText: React.FC<{
  lines?: number;
  lastLineShort?: boolean;
  className?: string;
}> = ({ lines = 3, lastLineShort = true, className }) => {
  return (
    <div className={cx("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, idx) => {
        const isLast = idx === lines - 1;
        return (
          <Skeleton
            key={idx}
            variant="text"
            width={isLast && lastLineShort ? "70%" : "100%"}
            height={12}
          />
        );
      })}
    </div>
  );
};

export const SkeletonCard: React.FC<{
  imgHeight?: number;
  className?: string;
}> = ({ imgHeight = 160, className }) => {
  return (
    <div
      className={cx("bg-white rounded-xl overflow-hidden shadow-lg", className)}
    >
      <Skeleton variant="rect" height={imgHeight} className="w-full" />
      <div className="p-3 space-y-3">
        <SkeletonText lines={2} />
        <div className="flex items-center justify-between">
          <Skeleton width={100} height={20} />
          <Skeleton width={72} height={28} rounded="rounded-md" />
        </div>
      </div>
    </div>
  );
};
