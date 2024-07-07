import React, { useEffect, useRef } from "react";
import {
  RichTextEditor,
  Link,
  useRichTextEditorContext,
} from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

type Props = {
  setIdea: (key: string, value: string | File) => void;
  contentProps: string;
  isModify?: boolean;
};
// const content =
// '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';
const Editor = ({ setIdea, contentProps, isModify }: Props) => {
  const hasEditorBeenRendered = useRef(false);
  const content = contentProps;
  const editor = useEditor({
    // onSelectionUpdate(props) {
    //   props.editor.commands.setColor("#000");
    //   props.editor.commands.setStrike();
    // },
    editorProps: {
      // handleDOMEvents: {
      //   // keypress:(view, event) => {
      //   //   console.log(event.key)
      //   // },
      //   keydown: (view, event) => {
      //     console.log(event.altKey, event.code);
      //     if (event.key === "Backspace") {
      //       event.
      //       //
      //       // console.log()
      //       editor?.commands.setStrike()
      //     } else {
      //       editor?.commands.unsetStrike()
      //     }
      //   },
      // },
      handleKeyDown(view, event) {
        // console.log(event.)
      },
    },
    onUpdate(props) {
      // editor?.commands.setStrike()
      if (isModify) {
        props.editor.commands.setColor("#ad2218");
      }
    },
    // onTransaction() {},

    // ons
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Color,
      TextStyle,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: content,
  });
  useEffect(() => {
    // editor?.commands.setStrike()
    // editor?.commands.
    // editor?.commands.setColor("#ad2218")
    if (editor && hasEditorBeenRendered.current) {
      setIdea && setIdea("body", editor.getHTML());
      return () => {};
    }
    hasEditorBeenRendered.current = true;
  }, [editor?.state]);
  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Color color="#ad2218" />
          {/* <RichTextEditor.Color  color="#000"/> */}
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default Editor;
