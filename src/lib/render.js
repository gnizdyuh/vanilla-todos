/*
  @param descriptor.tag {string} 
  @param descriptor.attributes {object}
  @param descriptor.textContent {string}
  @param descriptor.children {array}
  @param descriptor.eventListeners {object}
  @param descriptor.eventListeners.[$] {function}, $ - name of the event to listen to

  @returns Node
*/
export const getRenderableComponent = descriptor => {
  const { tag, attributes, textContent, children, eventListeners } = descriptor;

  const element = document.createElement(tag);
  if (typeof attributes === "object") {
    setAttributes(element, attributes);
  }

  if (typeof eventListeners === "object") {
    setEventListeners(element, eventListeners);
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
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

export function setEventListeners(el, listeners) {
  for (let eventName in listeners) {
    el.addEventListener(eventName, listeners[eventName]);
  }
}

export function render(container, renderer) {
  container.innerHTML = "";
  container.append(renderer());
}
