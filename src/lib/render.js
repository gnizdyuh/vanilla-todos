/*
  @param descriptor.tag {string} 
  @param descriptor.attributes {object}
  @param descriptor.textContent {string}
  @param descriptor.children {array}

  @returns Node
*/
export const getRenderableComponent = descriptor => {
  const { tag, attributes, textContent, children } = descriptor;

  const element = document.createElement(tag);
  if (typeof attributes === "object") {
    setAttributes(element, attributes);
  }

  if (typeof textContent === "string") {
    element.textContent = textContent;
  } else if (Array.isArray(children)) {
    children.forEach(childDescriptor => {
      const childNode = getRenderableComponent(childDescriptor);
      element.append(childNode);
    });
  }

  return element;
};

export function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

export function render(container, renderer) {
  container.append(renderer());
}
