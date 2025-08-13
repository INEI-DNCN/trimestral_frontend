import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, timeAgo } from "../../../../app/utils/util";
import IconClose from "../../../../assets/images/icon_close";
import { EditIcon } from "../../../../assets/images/icons_edit";
import IconsSave from "../../../../assets/images/icons_save";
import type { RootState } from "../../../../core/store/store";
import { useThemeContext } from "../../../../core/theme/ThemeContext";

const Toolbar: React.FC<{
  execCommand: (command: string, value?: string) => void;
  clearAllHighlights: () => void;
  exportContent: () => void;
  toggleEditing: () => void;
  toggleClose: () => void;
}> = ({
  toggleEditing,
  toggleClose,
}) => {
    return (
      <div style={toolbarStyle}>
        <button onClick={toggleClose} style={buttonXStyle} className="toolbar-button">
          <IconClose /> Salir
        </button>
        <button onClick={toggleEditing} style={buttonXStyle} className="toolbar-button">
          <IconsSave /> Guardar
        </button>
      </div>
    );
  };

const toolbarStyle: React.CSSProperties = {
  marginBottom: "3px",
  display: "flex",
  justifyContent: "end",
  gap: "8px",
  padding: "10px",
  position: "sticky",
  top: "0",
  zIndex: 1000,
};

const buttonXStyle: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#ffffff",
  color: "#333",
  cursor: "pointer",
  transition: "background-color 0.3s, box-shadow 0.3s",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  width: "100px",
  height: "36px",
};

interface Props {
  initialContent: any;
  onContentChange: (content: string) => void;
  onSave: (updatedContent: any) => void;
}

const EditText: React.FC<Props> = ({ initialContent, onContentChange, onSave }) => {
  const { theme, themes } = useThemeContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const { oneUser } = useSelector((state: RootState) => state.perfil)

  useEffect(() => {
    if (editorRef.current && !isEditing) {
      editorRef.current.innerHTML = initialContent.contenido || ""; // Set initial content only once
    }
  }, [initialContent, isEditing]);

  const handleContentChange = () => {
    if (editorRef.current) {
      const updatedContent = editorRef.current.innerHTML;
      onContentChange(updatedContent);
    }
  };

  const toggleEditing = () => {
    if (isEditing && editorRef.current) {
      const updatedContent = editorRef.current.innerHTML;
      onSave({ ...initialContent, contenido: updatedContent });
    }
    setIsEditing(!isEditing);
  };

  const toggleClose = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent.contenido || "";
    }
    setIsEditing(!isEditing);
  };

  const execCommand = (command: string, value?: string) => {
    if (!editorRef.current) return;
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand(command, false, value || "transparent");
  };

  // ✅ Función para limpiar TODO el resaltado del texto
  const clearAllHighlights = () => {
    if (!editorRef.current) return;
    const elements = editorRef.current.querySelectorAll("*");
    elements.forEach((element) => {
      // Eliminar estilos en línea
      element.removeAttribute("style");
      const tag = element.tagName.toLowerCase();
      // Etiquetas que quieres eliminar por completo, dejando solo su contenido
      const tagsToUnwrap = ["span", "font"];
      if (tagsToUnwrap.includes(tag) && element.attributes.length === 0) {
        const parent = element.parentNode;
        while (element.firstChild) {
          parent?.insertBefore(element.firstChild, element);
        }
        parent?.removeChild(element);
      }
    });
  };


  return (
    <div
      style={editorContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing && (
        <Toolbar
          execCommand={execCommand}
          clearAllHighlights={clearAllHighlights}
          exportContent={() => console.debug("Exported Content:", editorRef.current?.innerHTML)}
          toggleEditing={toggleEditing}
          toggleClose={toggleClose}
        // setFontSize={setFontSize} // Pasar la función para manejar el tamaño de fuente
        />
      )}
      <div
        ref={editorRef}
        id="editor"
        contentEditable={isEditing}
        onPaste={(e) => {
          e.preventDefault(); // Detiene el pegado por defecto con formato
          const textoPuro = e.clipboardData.getData("text/plain"); // Solo texto
          // Opcional: insertar el texto manualmente donde está el cursor
          document.execCommand("insertText", false, textoPuro);
        }}
        suppressContentEditableWarning
        style={getDynamicEditorStyle(isEditing, isHovered, themes[theme].text, themes[theme].background)} // Aplicar estilo dinámico
        onBlur={handleContentChange}
        onKeyUp={handleContentChange}
      />
      {!isEditing && isHovered && oneUser.role.name === 'Editor' && (
        <button onClick={toggleEditing} style={floatingButtonStyle}>
          <EditIcon />
        </button>
      )}
      <div style={{ color: themes[theme].text, fontSize: "12px", paddingLeft: '10px' }}>
        {formatDate(initialContent.fecha_actualizacion)} - actualizado {timeAgo(initialContent.fecha_actualizacion)}
      </div>
    </div>
  );
};

// ✅ Estilo para el contenedor del editor
const editorContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  margin: "0 auto",
  boxSizing: "border-box",
  padding: "10px 10px",
};


const getDynamicEditorStyle = (
  isEditing: boolean,
  isHovered: boolean,
  textColor: string,
  background: string
): React.CSSProperties => ({
  boxSizing: "border-box",
  width: "100%",
  borderRadius: "12px",
  fontSize: "16px",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap",
  padding: "30px",
  outline: "none",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  color: textColor,
  transition: "box-shadow 0.3s, border 0.3s, transform 0.3s",
  boxShadow: isEditing || isHovered ? "0 12px 24px rgba(0, 0, 0, 0.08)" : "none",
  transform: isHovered ? "translateY(-2px)" : "none",
  background: isEditing || isHovered ? background : "none",
  backdropFilter: isEditing || isHovered ? "blur(6px)" : "none",
});

// ✅ Estilo para el botón flotante
const floatingButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "20px",
  right: "20px",
  padding: "4px",
  backgroundColor: "#2F2F2F",
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  opacity: "70%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default EditText;
