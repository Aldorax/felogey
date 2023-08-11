declare namespace JSX {
  interface IntrinsicElements {
    "div": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    "button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLButtonElement>;
    "form": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLFormElement>;
    "label": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLLabelElement>;
    "input": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLInputElement>;
    "p": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLParagraphElement>;
    "h1": React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLHeadingElement>;
    // Add other HTML elements you are using
  }
}
