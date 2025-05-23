import rehypePrettyCode from "rehype-pretty-code";
import type { Pluggable } from "unified";

const prettyCodeOptions = {
  theme: "poimandres",
  onVisitLine(node: any) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className = [
      ...(node.properties.className || []),
      "highlighted-line",
    ];
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ["highlighted-word"];
  },
};

export const mdxProcessingOptions = {
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, prettyCodeOptions] as Pluggable,
    ] as Pluggable[],
  },
};
