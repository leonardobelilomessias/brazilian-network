"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { ToolBar } from "./ToolBAr";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps): JSX.Element {
  const editor = useEditor({
    extensions: [
      // Configurações específicas do StarterKit
      StarterKit.configure({
        // Importante: desabilitar o heading dentro do StarterKit
        heading: false,
        // Você pode desabilitar outros que está adicionando separadamente
        bulletList: false,
        orderedList: false,
      }),
      // Adicionar heading separadamente com configuração completa
      Heading.configure({
        levels: [1, 2, 3],
      }),
      // Configurar alinhamento de texto
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
      // Adicionar highlight
      Highlight,
      // Configurar imagem
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Usa useEffect para debugging
  useEffect(() => {
    if (editor) {
      // Verificar quais extensões estão realmente registradas
      console.log("Extensões registradas:", editor.extensionManager.extensions);
      
      // Teste para ver se os comandos de heading estão funcionando
      console.log("Comando heading disponível:", editor.can().toggleHeading({ level: 1 }));
    }
  }, [editor]);

  // Caso não tenha editor, mostra um estado de carregamento
  if (!editor) {
    return <div>Carregando editor...</div>;
  }

  return (
    <div className="rich-text-editor">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}