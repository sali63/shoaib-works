import React from 'react';
import ReactMarkdown from 'react-markdown';
export default function MarkdownToHtml({ markdown }) {
  return (
    <>
      {console.log(typeof markdown, markdown)}
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </>
  );
}
