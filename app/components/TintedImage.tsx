import Image, { type ImageProps } from "next/image";

type TintedImageProps = Omit<ImageProps, "className" | "onClick"> & {
  frameClassName?: string;
  imageClassName?: string;
  alt: string;
};

export default function TintedImage({
  frameClassName = "",
  imageClassName = "",
  alt,
  ...imageProps
}: TintedImageProps) {
  return (
    <div className={`tinted-image ${frameClassName}`.trim()}>
      <Image {...imageProps} alt={alt} className={`tinted-image__photo ${imageClassName}`.trim()} />
    </div>
  );
}
