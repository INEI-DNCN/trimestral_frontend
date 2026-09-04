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

  onChange?: (html: string) => void

  onUpdate?: (html: string) => void | Promise<void>

  className?: string
  disabled?: boolean

  showUpdateButton?: boolean

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
   CONTENEDOR PRINCIPAL
========================================================= */
const EditorContainer = styled.div<{
  $disabled: boolean
  $isDirty: boolean
}>`
  position: relative;

  width: calc(100% - 60px);

  margin: 15px 30px;

  border-radius: 16px;

  background: #ffffff;

  /*
   * Permite que el pseudo-elemento pueda
   * quedar detrás del contenido pero visible.
   */
  isolation: isolate;

  z-index: 0;

  /*
   * ========================================================
   * DIFUMINADO DE COLORES
   * ========================================================
   */

  &::before {
    content: '';

    position: absolute;

    z-index: -1;

    /*
     * Sacamos bastante el efecto hacia afuera
     * para que realmente se pueda apreciar.
     */
    inset: -12px;

    border-radius: 28px;

    background:
      radial-gradient(
        circle at 10% 50%,
        rgba(59, 130, 246, 0.85),
        transparent 42%
      ),

      radial-gradient(
        circle at 35% 0%,
        rgba(126, 87, 194, 0.75),
        transparent 45%
      ),

      radial-gradient(
        circle at 65% 100%,
        rgba(251, 140, 0, 0.65),
        transparent 45%
      ),

      radial-gradient(
        circle at 90% 50%,
        rgba(16, 185, 129, 0.80),
        transparent 42%
      );

    filter: blur(22px);

    opacity: ${({ $isDirty }) =>
    $isDirty ? 1 : 0};

    transition:
      opacity 0.35s ease;
  }

  /*
   * ========================================================
   * HALO ADICIONAL
   * ========================================================
   */

  box-shadow: ${({ $isDirty }) =>
    $isDirty
      ? `
        0 0 12px rgba(59, 130, 246, 0.18),
        0 0 25px rgba(126, 87, 194, 0.15),
        0 0 40px rgba(16, 185, 129, 0.12),
        0 0 55px rgba(251, 140, 0, 0.08);
      `
      : 'none'};

  transition:
    box-shadow 0.35s ease;

  overflow: visible;

  ${({ $disabled }) =>
    $disabled &&
    `
      cursor: not-allowed;
      opacity: 0.8;
    `}
`

/* =========================================================
   TOOLBAR FLOTANTE
========================================================= */

const HighlightToolbar = styled.div`
  position: fixed;

  z-index: 9999;

  display: flex;
  align-items: center;

  padding: 7px 9px;

  border: 1px solid #d0d5dd;

  border-radius: 10px;

  background: #ffffff;

  box-shadow:
    0 8px 20px rgba(16, 24, 40, 0.12),
    0 2px 5px rgba(16, 24, 40, 0.06);

  transform: translate(-50%, -100%);

  animation: toolbarAppear 0.12s ease;

  @keyframes toolbarAppear {
    from {
      opacity: 0;

      transform:
        translate(
          -50%,
          calc(-100% + 5px)
        );
    }

    to {
      opacity: 1;

      transform:
        translate(
          -50%,
          -100%
        );
    }
  }
`

const ColorsContainer = styled.div`
  display: flex;

  align-items: center;

  gap: 7px;
`

/* =========================================================
   BOTÓN DE COLOR
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

  background-color: ${({ $color }) =>
    $color};

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
   QUITAR RESALTADO
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
   CONTENIDO DEL EDITOR
========================================================= */

const EditorContentWrapper = styled.div`
  
  width: 100%;

  background: #ffffff;

  border-radius: 16px 16px 0px 0px;

  /*
   * ========================================================
   * TEXTO
   * ========================================================
   */

  .ProseMirror {
    min-height: 180px;

    /*
     * Más espacio interno.
     */
    padding: 28px 30px;

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

    /*
     * Un poco más de aire entre líneas.
     */
    line-height: 1.7;

    color: #1d2939;

    white-space: pre-wrap;

    word-break: break-word;
  }

  /*
   * ========================================================
   * PÁRRAFOS
   * ========================================================
   */

  .ProseMirror p {
    margin: 0 0 18px;
  }

  .ProseMirror p:last-child {
    margin-bottom: 0;
  }

  /*
   * ========================================================
   * RESALTADO
   * ========================================================
   */

  .ProseMirror mark {
    padding: 1px 2px;

    border-radius: 3px;
  }

  /*
   * ========================================================
   * PLACEHOLDER
   * ========================================================
   */

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

      padding: 20px;

      font-size: 14px;

      line-height: 1.65;
    }

    .ProseMirror p {
      margin-bottom: 14px;
    }
  }
`

/* =========================================================
   FOOTER
========================================================= */

const EditorFooter = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  min-height: 64px;

  padding: 12px 24px;

  border-top: 1px solid #e5e7eb;

  background: #fafbfc;

  border-bottom-left-radius: 16px;

  border-bottom-right-radius: 16px;

  /*
   * Separación entre los botones.
   */
  gap: 12px;
`

/* =========================================================
   ESTADO DE CAMBIOS
========================================================= */

const ChangesIndicator = styled.div`
  display: flex;

  align-items: center;

  gap: 9px;

  color: #667085;

  font-size: 13px;

  font-weight: 500;

  user-select: none;
`

const ChangesDot = styled.span`
  width: 8px;

  height: 8px;

  border-radius: 50%;

  background: #f59e0b;

  box-shadow:
    0 0 0 3px rgba(245, 158, 11, 0.12);
`

/* =========================================================
   CONTENEDOR DE BOTONES
========================================================= */

const ActionsContainer = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;
`

/* =========================================================
   BOTÓN RESTAURAR
========================================================= */

const RestoreButton = styled(ButtonAction)`
  min-height: 38px;

  padding: 0 18px;

  border: 1px solid #d0d5dd;

  border-radius: 8px;

  background: #ffffff;

  color: #475467;

  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover:not(:disabled) {
    background: #f9fafb;

    border-color: #98a2b3;
  }

  &:disabled {
    opacity: 0.55;
  }
`

/* =========================================================
   BOTÓN APLICAR
========================================================= */

const ApplyButton = styled(ButtonAction)`
  min-height: 38px;

  padding: 0 20px;

  border-radius: 8px;

  transition:
    opacity 0.15s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;
  }
`

/* =========================================================
   COMPONENTE
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

  updateLabel = 'Aplicar',

}: HighlightEditorProps) {

  /*
   * ========================================================
   * CONTENIDO ORIGINAL
   * ========================================================
   */

  const [originalContent, setOriginalContent] =
    useState(value)

  /*
   * ========================================================
   * CONTENIDO MODIFICADO
   * ========================================================
   */

  const [isDirty, setIsDirty] =
    useState(false)

  /*
   * ========================================================
   * ESTADO DE ACTUALIZACIÓN
   * ========================================================
   */

  const [isUpdating, setIsUpdating] =
    useState(false)

  /*
   * ========================================================
   * SELECCIÓN
   * ========================================================
   */

  const [hasSelection, setHasSelection] =
    useState(false)

  /*
   * ========================================================
   * COLOR ACTIVO
   * ========================================================
   */

  const [activeColor, setActiveColor] =
    useState(defaultHighlightColor)

  /*
   * ========================================================
   * POSICIÓN TOOLBAR
   * ========================================================
   */

  const [toolbarPosition, setToolbarPosition] =
    useState({
      left: 0,
      top: 0,
    })

  /*
   * ========================================================
   * COLORES
   * ========================================================
   */

  const configuredColors = useMemo(() => {

    return colors.length > 0
      ? colors
      : DEFAULT_COLORS

  }, [colors])

  /*
   * ========================================================
   * EDITOR
   * ========================================================
   */

  const editor = useEditor({

    extensions: [

      StarterKit,

      Highlight.configure({
        multicolor: true,
      }),

    ],

    content: value,

    editable: !disabled,

    onCreate({ editor }) {

      setHasSelection(
        !editor.state.selection.empty
      )

    },

    /*
     * ======================================================
     * CAMBIO DEL CONTENIDO
     * ======================================================
     */

    onUpdate({ editor }) {

      const html =
        editor.getHTML()

      onChange?.(html)

      /*
       * Determinamos si el contenido
       * es diferente al original.
       */

      setIsDirty(
        html !== originalContent
      )

    },

    /*
     * ======================================================
     * SELECCIÓN
     * ======================================================
     */

    onSelectionUpdate({ editor }) {

      const selection =
        editor.state.selection

      const selected =
        !selection.empty

      setHasSelection(
        selected
      )

      const currentColor =
        editor.getAttributes(
          'highlight'
        ).color

      if (currentColor) {

        setActiveColor(
          currentColor
        )

      }

      if (selected) {

        updateToolbarPosition(
          editor
        )

      }

    },

  })

  /*
   * =========================================================
   * POSICIÓN DE TOOLBAR
   * =========================================================
   */

  const updateToolbarPosition = (
    currentEditor = editor,
  ) => {

    if (!currentEditor) {
      return
    }

    const {
      from,
      to,
    } =
      currentEditor.state.selection

    const start =
      currentEditor.view.coordsAtPos(
        from
      )

    const end =
      currentEditor.view.coordsAtPos(
        to
      )

    const centerX =
      (start.left + end.right) / 2

    let top =
      Math.min(
        start.top,
        end.top
      ) - 10

    if (top < 70) {

      top =
        Math.max(
          start.bottom,
          end.bottom
        ) + 10

    }

    setToolbarPosition({
      left: centerX,
      top,
    })

  }

  /*
   * =========================================================
   * CAMBIO DEL VALUE DESDE EL PADRE
   * =========================================================
   */

  useEffect(() => {

    if (
      !editor ||
      value === undefined
    ) {
      return
    }

    const currentHTML =
      editor.getHTML()

    /*
     * Cuando llega un nuevo contenido
     * desde el padre, lo consideramos
     * como el nuevo original.
     */

    if (
      value !== originalContent
    ) {

      setOriginalContent(
        value
      )

      setIsDirty(false)

      if (
        value !== currentHTML
      ) {

        editor.commands.setContent(
          value,
          {
            emitUpdate: false,
          }
        )

      }

    }

  }, [
    editor,
    value,
  ])

  /*
   * =========================================================
   * DISABLED
   * =========================================================
   */

  useEffect(() => {

    if (!editor) {
      return
    }

    editor.setEditable(
      !disabled
    )

    if (disabled) {

      setHasSelection(false)

    }

  }, [
    editor,
    disabled,
  ])

  /*
   * =========================================================
   * TOOLBAR
   * =========================================================
   */

  useEffect(() => {

    if (!editor) {
      return
    }

    if (hasSelection) {

      requestAnimationFrame(() => {

        updateToolbarPosition(
          editor
        )

      })

    }

  }, [
    editor,
    hasSelection,
  ])

  /*
   * =========================================================
   * SCROLL
   * =========================================================
   */

  useEffect(() => {

    if (!editor) {
      return
    }

    const handleScroll = () => {

      if (
        !editor.state.selection.empty
      ) {

        updateToolbarPosition(
          editor
        )

      }

    }

    window.addEventListener(
      'scroll',
      handleScroll,
      true
    )

    window.addEventListener(
      'resize',
      handleScroll
    )

    return () => {

      window.removeEventListener(
        'scroll',
        handleScroll,
        true
      )

      window.removeEventListener(
        'resize',
        handleScroll
      )

    }

  }, [editor])

  /*
   * =========================================================
   * APLICAR RESALTADO
   * =========================================================
   */

  const applyHighlight = (
    color: string
  ) => {

    if (
      !editor ||
      !hasSelection
    ) {
      return
    }

    setActiveColor(
      color
    )

    editor
      .chain()
      .focus()
      .setHighlight({
        color,
      })
      .run()

    requestAnimationFrame(() => {

      updateToolbarPosition(
        editor
      )

    })

  }

  /*
   * =========================================================
   * QUITAR RESALTADO
   * =========================================================
   */

  const removeHighlight = () => {

    if (
      !editor ||
      !hasSelection
    ) {
      return
    }

    editor
      .chain()
      .focus()
      .unsetHighlight()
      .run()

    requestAnimationFrame(() => {

      updateToolbarPosition(
        editor
      )

    })

  }

  /*
   * =========================================================
   * RESTAURAR CONTENIDO ORIGINAL
   * =========================================================
   */

  const handleReset = () => {

    if (
      !editor ||
      !isDirty
    ) {
      return
    }

    editor.commands.setContent(
      originalContent,
      {
        emitUpdate: false,
      }
    )

    setIsDirty(false)

  }

  /*
   * =========================================================
   * ACTUALIZAR
   * =========================================================
   */

  const handleUpdate = async () => {

    if (
      !editor ||
      !onUpdate ||
      !isDirty
    ) {
      return
    }

    try {

      setIsUpdating(true)

      const html =
        editor.getHTML()

      /*
       * Enviamos el contenido.
       */

      await onUpdate(
        html
      )

      /*
       * El contenido guardado
       * pasa a ser el nuevo original.
       */

      setOriginalContent(
        html
      )

      setIsDirty(false)

    } finally {

      setIsUpdating(false)

    }

  }

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  if (!editor) {
    return null
  }

  return (
    <>
      <EditorContainer
        className={className}

        $disabled={
          disabled
        }

        $isDirty={
          isDirty
        }
      >

        {/* =================================================
            TOOLBAR DE COLORES
        ================================================= */}

        {hasSelection &&
          !disabled && (

            <HighlightToolbar

              style={{
                left:
                  toolbarPosition.left,

                top:
                  toolbarPosition.top,
              }}

              onMouseDown={(event) => {
                event.preventDefault()

              }}
            >

              <ColorsContainer>

                {configuredColors.map(
                  (item) => {

                    const isActive =
                      activeColor.toLowerCase() ===
                      item.color.toLowerCase()

                    return (

                      <ColorButton

                        key={
                          item.color
                        }

                        type="button"

                        $color={
                          item.color
                        }

                        $active={
                          isActive
                        }

                        title={
                          `Resaltar con ${item.name}`
                        }

                        aria-label={
                          `Resaltar con ${item.name}`
                        }

                        onClick={() => {

                          applyHighlight(
                            item.color
                          )

                        }}

                      />

                    )

                  }
                )}

                <RemoveHighlightButton

                  type="button"

                  title="Quitar resaltado"

                  aria-label="Quitar resaltado"

                  onClick={
                    removeHighlight
                  }

                >
                  ×
                </RemoveHighlightButton>

              </ColorsContainer>

            </HighlightToolbar>

          )}

        {/* =================================================
            CONTENIDO
        ================================================= */}

        <EditorContentWrapper>

          <EditorContent
            editor={editor}
          />

        </EditorContentWrapper>

        {/* =================================================
            FOOTER
        ================================================= */}

        {showUpdateButton &&
          !disabled && (

            <EditorFooter>

              {/* ===========================================
                  INDICADOR
              =========================================== */}

              <div>

                {isDirty && (

                  <ChangesIndicator>

                    <ChangesDot />

                    <span>
                      Cambios sin guardar
                    </span>

                  </ChangesIndicator>

                )}

              </div>

              {/* ===========================================
                  ACCIONES
              =========================================== */}

              <ActionsContainer>

                <RestoreButton

                  disabled={
                    !isDirty ||
                    isUpdating
                  }

                  onClick={
                    handleReset
                  }

                  type="button"
                >
                  Restaurar
                </RestoreButton>

                <ApplyButton

                  disabled={
                    !isDirty ||
                    isUpdating
                  }

                  onClick={
                    handleUpdate
                  }

                  type="button"
                >

                  {isUpdating
                    ? 'Actualizando...'
                    : updateLabel}

                </ApplyButton>

              </ActionsContainer>

            </EditorFooter>

          )}

      </EditorContainer>
    </>
  )
}