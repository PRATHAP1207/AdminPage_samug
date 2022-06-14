import React, { Suspense } from "react";
import { useImage, Img } from "react-image";
import { VisibilitySensor } from "react-visibility-sensor";
function MyImageComponent(imageUrl) {
  const { src } = useImage({
    srcList: imageUrl,
  });

  return (
    <VisibilitySensor>
      <Img src={imageUrl} />
    </VisibilitySensor>
  );
}
export default function ImageComponent() {
  return (
    <Suspense>
      <MyImageComponent />
    </Suspense>
  );
}
