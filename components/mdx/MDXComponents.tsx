// 통합 export + next-mdx 컴포넌트 매핑
// components/mdx/MDXComponents.tsx
// import CodeBlock from "./CodeBlock";
// import InlineCode from "./InlineCode";
// import Heading from "./atoms/Heading";
// import CustomImage from "./Image";
// import Callout from "./Callout";

// // 이 객체를 `useMDXComponents`로 전달해서 사용
// export const MDXComponents = {
//   pre: (props: any) => <div {...props} />, // Shiki가 pre 내 HTML로 처리함
//   code: (props: any) => <code {...props} />,
//   inlineCode: InlineCode,
//   img: CustomImage,
//   h1: (props: any) => <Heading as="h1" {...props} />,
//   h2: (props: any) => <Heading as="h2" {...props} />,
//   h3: (props: any) => <Heading as="h3" {...props} />,
//   Callout,
// };
