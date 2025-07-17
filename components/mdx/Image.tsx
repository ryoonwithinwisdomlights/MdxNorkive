// components/mdx/Image.tsx
//// MDX 내 이미지 처리
export default function CustomImage(props: any) {
  return (
    <img
      {...props}
      className="rounded-lg border shadow-sm my-6 mx-auto"
      alt={props.alt || ""}
    />
  );
}
