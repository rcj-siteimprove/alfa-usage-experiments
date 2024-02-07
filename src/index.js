import { Device } from "@siteimprove/alfa-device";
import { Node } from "@siteimprove/alfa-dom";
import { Page } from "@siteimprove/alfa-web";
import { Request, Response } from "@siteimprove/alfa-http";
import { Rules } from "@siteimprove/alfa-rules";
import { Sequence } from "@siteimprove/alfa-sequence";

import * as dom from "@siteimprove/alfa-dom/native";

const htmlSnippetElement = document.getElementById("html-snippet");
const ruleIdElement = document.getElementById("rule-id");
const resultTextarea = document.getElementById("result");

function run() {
  const element = document.createElement("div");
  element.innerHTML = htmlSnippetElement.value;
  const target = element.firstChild;
  console.log(target);
  const alfaDocument = Node.from(dom.Native.fromNode(target));

  console.log(alfaDocument.toJSON());

  const page = Page.of(
    Request.empty(),
    Response.empty(),
    alfaDocument,
    Device.standard()
  );

  const ruleId = ruleIdElement.value;
  const rule = Rules.get(ruleId).getUnsafe();

  rule.evaluate(page).then((outcomes) => {
    resultTextarea.innerHTML = JSON.stringify(
      Sequence.from(outcomes)
        .map((outcome) => outcome.toJSON())
        .toJSON(),
      null,
      2
    );
  });
}

document.getElementById("run-button").addEventListener("click", run);
