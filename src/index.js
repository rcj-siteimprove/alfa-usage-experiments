import { Device } from "@siteimprove/alfa-device";
import { Node } from "@siteimprove/alfa-dom";
import { Page } from "@siteimprove/alfa-web";
import { Request, Response } from "@siteimprove/alfa-http";
import { Rules } from "@siteimprove/alfa-rules";

import * as dom from "@siteimprove/alfa-dom/native";

const htmlSnippetElement = document.getElementById("html-snippet");
const resultTextarea = document.getElementById("result");

function run() {
  const element = document.getElementById("rendered-html");
  element.innerHTML = htmlSnippetElement.value;

  console.log(element);

  const alfaDocument = Node.from(dom.Native.fromNode(window.document));

  console.log(alfaDocument);

  const rule = Rules.get("R64").getUnsafe();

  rule
    .evaluate(
      Page.of(
        Request.empty(),
        Response.empty(),
        alfaDocument,
        Device.standard()
      )
    )
    .then((outcomes) => {
      console.log(outcomes);
      resultTextarea.value = JSON.stringify(outcomes, null, 2);
    });
}

document.getElementById("run-button").addEventListener("click", run);
