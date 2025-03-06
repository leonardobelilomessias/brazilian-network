"use client";
import React, { useCallback } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Upload,
  List,
  ListOrdered
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { ToggleButton } from "./ToggleButton";

// Tipagem para as opções da Toolbar
interface Option {
  icon: React.ReactNode;
  onClick: () => void;
  pressed: boolean;
  disabled?: boolean;
}

// Tipagem para o componente ToolBar
interface ToolBarProps {
  editor: Editor | null;
}

export function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  // Usando useCallback para melhorar a performance
  const toggleHeading = useCallback((level: 1 | 2 | 3) => {
    // Verificar capacidade e então executar
    if (editor.can().toggleHeading({ level })) {
      editor.chain().focus().toggleHeading({ level }).run();
      console.log(`Headings level ${level} toggled`);
    } else {
      console.error(`Cannot toggle heading level ${level}`);
    }
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  
  // Teste - Verificar capacidades do editor
  console.log("Editor pode fazer heading?", {
    h1: editor.can().toggleHeading({ level: 1 }),
    h2: editor.can().toggleHeading({ level: 2 }),
    h3: editor.can().toggleHeading({ level: 3 }),
  });
  
  // Verificar estado ativo
  console.log("Estado ativo do heading:", {
    h1: editor.isActive('heading', { level: 1 }),
    h2: editor.isActive('heading', { level: 2 }),
    h3: editor.isActive('heading', { level: 3 }),
  });

  const Options: Option[] = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => toggleHeading(1),
      pressed: editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => toggleHeading(2),
      pressed: editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => toggleHeading(3),
      pressed: editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive("codeBlock"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <Upload className="size-4" />,
      onClick: () => addImage(),
      pressed: editor.isActive("image"),
    },
  ];

  return (
    <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top-10 z-50">
      {Options.map((option, i) => (
        <ToggleButton
          key={i}
          size="sm"
          pressed={option.pressed}
          onPressedChange={option.onClick}
          variant={option.pressed ? "outline" : "default"}
          disabled={option.disabled}
        >
          {option.icon}
        </ToggleButton>
      ))}
    </div>
  );
}