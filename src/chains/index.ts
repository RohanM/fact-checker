import { BaseChain, LLMChain, SerializedBaseChain } from "langchain/chains";
import { ChainValues } from "langchain/schema";

import {
  startFactcheckPrompt,
  componentsPrompt,
  prioritisationPrompt,
} from "./prompts.js";

/**
 * Chain to fact check an article
 * @augments BaseChain
 */
export class FactCheckChain extends BaseChain {
  get inputKeys(): string[] {
    return ["article"];
  }

  async _call(values: ChainValues): Promise<ChainValues> {
    if (!("article" in values)) {
      throw new Error(`Article not specified.`);
    }
    const article = values.article;

    return article;
  }

  serialize(): SerializedBaseChain {
    throw new Error("Not implemented");
  }

  _chainType() {
    return "fact_check_chain" as const;
  }
}
