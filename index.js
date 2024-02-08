import { Device } from "@siteimprove/alfa-device";
import { Node } from "@siteimprove/alfa-dom";
import { Page } from "@siteimprove/alfa-web";
import { Request, Response } from "@siteimprove/alfa-http";
import { Rules } from "@siteimprove/alfa-rules";

import * as dom from "@siteimprove/alfa-dom/native";

import { JSDOM } from "jsdom";

import * as fs from "fs";

const html = fs.readFileSync("index.html");

const jsdom = new JSDOM(html);

const alfaDocument = Node.from(dom.Native.fromNode(jsdom.window.document));

async function main() {
  const page = Page.of(
    Request.empty(),
    Response.empty(),
    alfaDocument,
    Device.standard()
  );

  const rule = Rules.get("R18").getUnsafe();

  const outcomes = await rule.evaluate(page);

  for (const outcome of outcomes) {
    if (outcome.outcome === "failed") {
      for (const [, expectation] of outcome.expectations) {
        if (expectation.isOk()) {
          console.log(`PASS: ${expectation.getUnsafe().message}`);
        } else if (expectation.isErr()) {
          console.log(`FAIL: ${expectation.getErrUnsafe().message}`);
        }
      }
    }
  }
}

main();
