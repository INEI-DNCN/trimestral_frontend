import Highlight from '@tiptap/extension-highlight'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import ButtonAction from './bottons/button_action'

export interface HighlightColor {
  name: string
  color: string
}

export interface HighlightEditorProps {
  value?: string
  defaultHighlightColor?: string
  colors?: HighlightColor[]
  placeholder?: string

  /*
   * Se ejecuta cada vez que cambia el contenido.
   * Sirve para mantener el borrador en React.
   */
  onChange?: (html: string) => void

  /*
   * Se ejecuta ÚNICAMENTE cuando se pulsa
   * el botón "Actualizar".
   *
   * Aquí puedes llamar a tu API.
   */
  onUpdate?: (html: string) => void | Promise<void>

  className?: string
  disabled?: boolean

  /*
   * Mostrar u ocultar el botón Actualizar.
   */
  showUpdateButton?: boolean

  /*
   * Texto del botón.
   */
  updateLabel?: string
}

const DEFAULT_COLORS: HighlightColor[] = [
  {
    name: 'Amarillo',
    color: '#FFF59D',
  },
  {
    name: 'Verde',
    color: '#C8E6C9',
  },
  {
    name: 'Azul',
    color: '#BBDEFB',
  },
  {
    name: 'Rosa',
    color: '#F8BBD0',
  },
  {
    name: 'Naranja',
    color: '#FFE0B2',
  },
  {
    name: 'Morado',
    color: '#D1C4E9',
  },
]

/* =========================================================
   Editor
========================================================= */

const EditorContainer = styled.div<{
  $disabled: boolean
}>`
  position: relative;

  width: 100%;

  border: 1px solid #d9dee7;
  border-radius: 10px;

  background: #ffffff;

  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus-within {
    border-color: #7c8aa5;

    box-shadow:
      0 0 0 3px rgba(124, 138, 165, 0.12);
  }

  ${({ $disabled }) =>
    $disabled &&
    `
      background: #f6f7f9;
      cursor: not-allowed;
    `}
`

/* =========================================================
   Botón lápiz
========================================================= */

const EditButton = styled.button<{
  $active: boolean
}>`
  position: absolute;

  top: 10px;
  right: 10px;

  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  padding: 0;

  border: 1px solid #d0d5dd;
  border-radius: 8px;

  background: ${({ $active }) =>
    $active ? '#f2f4f7' : '#ffffff'};

  color: ${({ $active }) =>
    $active ? '#344054' : '#667085'};

  cursor: pointer;

  box-shadow:
    0 1px 2px rgba(16, 24, 40, 0.05);

  transition:
    background 0.15s ease,
    color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    background: #f2f4f7;
    color: #344054;
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 17px;
    height: 17px;
  }
`

/* =========================================================
   Toolbar flotante
========================================================= */

const HighlightToolbar = styled.div`
  position: fixed;

  z-index: 9999;

  display: flex;
  align-items: center;

  padding: 6px 8px;

  border: 1px solid #d0d5dd;
  border-radius: 9px;

  background: #ffffff;

  box-shadow:
    0 8px 20px rgba(16, 24, 40, 0.12),
    0 2px 5px rgba(16, 24, 40, 0.06);

  transform: translate(-50%, -100%);

  animation: toolbarAppear 0.12s ease;

  @keyframes toolbarAppear {
    from {
      opacity: 0;
      transform: translate(-50%, calc(-100% + 5px));
    }

    to {
      opacity: 1;
      transform: translate(-50%, -100%);
    }
  }
`

const ColorsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

/* =========================================================
   Color
========================================================= */

const ColorButton = styled.button<{
  $color: string
  $active: boolean
}>`
  width: 25px;
  height: 25px;

  padding: 0;

  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 50%;

  background-color: ${({ $color }) => $color};

  cursor: pointer;

  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;

  &:hover {
    transform: scale(1.12);
  }

  ${({ $active }) =>
    $active &&
    `
      box-shadow:
        0 0 0 2px #ffffff,
        0 0 0 4px #475467;
    `}
`

/* =========================================================
   Quitar resaltado
========================================================= */

const RemoveHighlightButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 25px;
  height: 25px;

  padding: 0;

  border: 1px solid #d0d5dd;
  border-radius: 50%;

  background: #ffffff;

  color: #667085;

  font-size: 16px;
  line-height: 1;

  cursor: pointer;

  &:hover {
    background: #f2f4f7;
    color: #344054;
  }
`

/* =========================================================
   Contenido
========================================================= */

const EditorContentWrapper = styled.div`
  width: 100%;

  .ProseMirror {
    min-height: 180px;

    padding: 16px;
    padding-right: 55px;

    outline: none;

    font-family:
      Inter,
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;

    font-size: 15px;
    line-height: 1.65;

    color: #1d2939;

    white-space: pre-wrap;
    word-break: break-word;
  }

  .ProseMirror p {
    margin: 0 0 10px;
  }

  .ProseMirror p:last-child {
    margin-bottom: 0;
  }

  .ProseMirror mark {
    padding: 1px 2px;
    border-radius: 3px;
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);

    float: left;

    height: 0;

    color: #98a2b3;

    pointer-events: none;
  }

  @media (max-width: 600px) {
    .ProseMirror {
      min-height: 150px;

      padding: 12px;
      padding-right: 50px;

      font-size: 14px;
    }
  }
`

/* =========================================================
   Footer
========================================================= */

const EditorFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  min-height: 50px;

  padding: 8px 12px;

  border-top: 1px solid #e5e7eb;

  background: #fafbfc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
/* =========================================================
   Component
========================================================= */

export default function HighlightEditor({
  value = '<p></p>',
  defaultHighlightColor = '#FFF59D',
  colors = DEFAULT_COLORS,
  onChange,
  onUpdate,
  className,
  disabled = false,
  showUpdateButton = true,
}: HighlightEditorProps) {
  /*
   * Indica si el usuario activó el modo edición.
   */
  const [isEditing, setIsEditing] = useState(false)

  /*
   * Indica si existe texto seleccionado.
   */
  const [hasSelection, setHasSelection] =
    useState(false)

  /*
   * Color actualmente seleccionado.
   */
  const [activeColor, setActiveColor] =
    useState(defaultHighlightColor)

  /*
   * Posición de la paleta.
   */
  const [toolbarPosition, setToolbarPosition] =
    useState({
      left: 0,
      top: 0,
    })

  /*
   * Estado del botón actualizar.
   */
  const [isUpdating, setIsUpdating] =
    useState(false)

  /*
   * Colores configurados.
   */
  const configuredColors = useMemo(() => {
    return colors.length > 0
      ? colors
      : DEFAULT_COLORS
  }, [colors])

  /*
   * Editor Tiptap.
   */
  const editor = useEditor({
    extensions: [
      StarterKit,

      Highlight.configure({
        multicolor: true,
      }),
    ],

    content: value,

    editable: !disabled && isEditing,

    onCreate({ editor }) {
      setHasSelection(
        !editor.state.selection.empty,
      )
    },

    /*
     * IMPORTANTE:
     *
     * onChange NO actualiza la BD.
     *
     * Solo devuelve el HTML al padre.
     */
    onUpdate({ editor }) {
      const html = editor.getHTML()

      onChange?.(html)
    },

    /*
     * Cada vez que cambia la selección.
     */
    onSelectionUpdate({ editor }) {
      const selection = editor.state.selection

      const selected = !selection.empty

      setHasSelection(selected)

      /*
       * Detectar el color actual.
       */
      const currentColor =
        editor.getAttributes('highlight').color

      if (currentColor) {
        setActiveColor(currentColor)
      }

      /*
       * Actualizar posición de la paleta.
       */
      if (selected && isEditing) {
        updateToolbarPosition(editor)
      }
    },
  })

  /*
   * ========================================================
   * Posicionar toolbar
   * ========================================================
   */
  const updateToolbarPosition = (
    currentEditor = editor,
  ) => {
    if (!currentEditor) {
      return
    }

    const { from, to } =
      currentEditor.state.selection

    const start =
      currentEditor.view.coordsAtPos(from)

    const end =
      currentEditor.view.coordsAtPos(to)

    /*
     * Centro horizontal de la selección.
     */
    const centerX =
      (start.left + end.right) / 2

    /*
     * Posición vertical.
     */
    let top = Math.min(
      start.top,
      end.top,
    ) - 10

    /*
     * Si la selección está demasiado cerca
     * del borde superior, colocamos la barra
     * debajo de la selección.
     */
    if (top < 70) {
      top =
        Math.max(
          start.bottom,
          end.bottom,
        ) + 10
    }

    setToolbarPosition({
      left: centerX,
      top,
    })
  }

  /*
   * ========================================================
   * Cargar HTML desde BD
   * ========================================================
   */
  useEffect(() => {
    if (!editor || value === undefined) {
      return
    }

    const currentHTML = editor.getHTML()

    if (value !== currentHTML) {
      editor.commands.setContent(value, {
        emitUpdate: false,
      })
    }
  }, [editor, value])

  /*
   * ========================================================
   * Cambiar modo edición
   * ========================================================
   */
  useEffect(() => {
    if (!editor) {
      return
    }

    editor.setEditable(
      !disabled && isEditing,
    )

    if (disabled) {
      setIsEditing(false)
      setHasSelection(false)
    }
  }, [editor, disabled, isEditing])

  /*
   * ========================================================
   * Recalcular posición cuando cambia el modo
   * ========================================================
   */
  useEffect(() => {
    if (!editor) {
      return
    }

    if (isEditing && hasSelection) {
      requestAnimationFrame(() => {
        updateToolbarPosition(editor)
      })
    }
  }, [editor, isEditing, hasSelection])

  /*
   * ========================================================
   * Reposicionar al hacer scroll
   * ========================================================
   */
  useEffect(() => {
    if (!editor) {
      return
    }

    const handleScroll = () => {
      if (
        isEditing &&
        !editor.state.selection.empty
      ) {
        updateToolbarPosition(editor)
      }
    }

    window.addEventListener(
      'scroll',
      handleScroll,
      true,
    )

    window.addEventListener(
      'resize',
      handleScroll,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
        true,
      )

      window.removeEventListener(
        'resize',
        handleScroll,
      )
    }
  }, [editor, isEditing])

  /*
   * ========================================================
   * Aplicar resaltado
   * ========================================================
   */
  const applyHighlight = (color: string) => {
    if (!editor || !hasSelection) {
      return
    }

    setActiveColor(color)

    editor
      .chain()
      .focus()
      .setHighlight({
        color,
      })
      .run()

    requestAnimationFrame(() => {
      updateToolbarPosition(editor)
    })
  }

  /*
   * ========================================================
   * Quitar resaltado
   * ========================================================
   */
  const removeHighlight = () => {
    if (!editor || !hasSelection) {
      return
    }

    editor
      .chain()
      .focus()
      .unsetHighlight()
      .run()

    requestAnimationFrame(() => {
      updateToolbarPosition(editor)
    })
  }

  /*
   * ========================================================
   * Activar/desactivar edición
   * ========================================================
   */
  const toggleEditing = () => {
    if (!editor) {
      return
    }

    const nextValue = !isEditing

    setIsEditing(nextValue)

    if (!nextValue) {
      setHasSelection(false)

      editor.commands.blur()
    } else {
      editor.commands.focus()
    }
  }

  /*
   * ========================================================
   * Actualizar BD
   * ========================================================
   */
  const handleUpdate = async () => {
    if (!editor || !onUpdate) {
      return
    }

    try {
      setIsUpdating(true)

      /*
       * Obtener el HTML directamente de Tiptap.
       */
      const html = editor.getHTML()

      /*
       * Aquí se ejecuta la función del padre.
       *
       * Ejemplo:
       *
       * onUpdate={(html) => {
       *   axios.put(...)
       * }}
       */
      await onUpdate(html)

    } finally {
      setIsUpdating(false)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <>
      {/* ===================================================
          Editor
      =================================================== */}

      <EditorContainer
        className={className}
        $disabled={disabled}
      >
        {/* =================================================
            Barra contextual de colores
        ================================================= */}

        {isEditing &&
          hasSelection &&
          !disabled && (
            <HighlightToolbar
              style={{
                left: toolbarPosition.left,
                top: toolbarPosition.top,
              }}
              onMouseDown={(event) => {
                /*
                 * MUY IMPORTANTE.
                 *
                 * Evita que el navegador pierda
                 * la selección antes de ejecutar
                 * el comando de Tiptap.
                 */
                event.preventDefault()
              }}
            >
              <ColorsContainer>
                {configuredColors.map((item) => {
                  const isActive =
                    activeColor.toLowerCase() ===
                    item.color.toLowerCase()

                  return (
                    <ColorButton
                      key={item.color}
                      type="button"
                      $color={item.color}
                      $active={isActive}
                      title={`Resaltar con ${item.name}`}
                      aria-label={`Resaltar con ${item.name}`}
                      onClick={() => {
                        applyHighlight(item.color)
                      }}
                    />
                  )
                })}

                <RemoveHighlightButton
                  type="button"
                  title="Quitar resaltado"
                  aria-label="Quitar resaltado"
                  onClick={removeHighlight}
                >
                  ×
                </RemoveHighlightButton>
              </ColorsContainer>
            </HighlightToolbar>
          )}

        {/* =================================================
            Lápiz
        ================================================= */}

        {!disabled && (
          <EditButton
            type="button"
            $active={isEditing}
            onClick={toggleEditing}
            title={
              isEditing
                ? 'Salir del modo edición'
                : 'Editar texto'
            }
            aria-label={
              isEditing
                ? 'Salir del modo edición'
                : 'Editar texto'
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 20H8L19.5 8.5C20.3284 7.67157 20.3284 6.32843 19.5 5.5C18.6716 4.67157 17.3284 4.67157 16.5 5.5L5 17V20Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M14.5 7.5L17.5 10.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </EditButton>
        )}

        {/* =================================================
            Editor Tiptap
        ================================================= */}

        <EditorContentWrapper>
          <EditorContent editor={editor} />
        </EditorContentWrapper>

        {/* =================================================
            Botón actualizar
        ================================================= */}

        {showUpdateButton &&
          !disabled &&
          isEditing && (
            <EditorFooter>
              <ButtonAction
                disabled={isUpdating}
                onClick={handleUpdate}
                type="button"
              >
                {isUpdating
                  ? 'Actualizando...'
                  : 'Aplicar'}
              </ButtonAction>
            </EditorFooter>
          )}
      </EditorContainer>
    </>
  )
}