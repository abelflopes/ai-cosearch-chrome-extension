const host = document.querySelector("#host-1");
const shadow = host.attachShadow({ mode: "open" });
const span = document.createElement("span");
span.textContent = "I'm in the shadow DOM";
shadow.appendChild(span);

function expandHTML(node) {
  let html = "";
  node.childNodes.forEach((n) => {
    if (n.nodeName === "SCRIPT") return;
    if (n.shadowRoot) {
      html += getHTML(n.shadowRoot);
    } else if (n.nodeName === "#text") {
      html += n.nodeValue;
    } else if (n.outerHTML) {
      html += n.outerHTML;
    } else {
      throw new Error("Unknown node type", n);
    }
  });
  return html;
}

console.log(getHTML(document.body));
