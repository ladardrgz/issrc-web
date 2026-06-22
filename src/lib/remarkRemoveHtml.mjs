/**
 * Elimina HTML crudo antes de renderizar Markdown.
 * El CMS no necesita HTML y ninguna etiqueta editorial llega al documento final.
 */
export default function remarkRemoveHtml() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'html') {
        node.type = 'text';
        node.value = '';
      }

      node.children?.forEach(visit);
    };

    visit(tree);
  };
}
