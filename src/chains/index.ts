import { BaseChain, ChainInputs, SerializedBaseChain } from "langchain/chains";
import { ChainValues } from "langchain/schema";
import { LLMChain } from "langchain/chains";
import { BaseLanguageModel } from "langchain/base_language";
import { BaseMemory } from "langchain/memory";

import {
  startFactcheckPrompt,
  componentsPrompt,
  prioritisationPrompt,
} from "./prompts.js";

export interface FactCheckChainInput extends ChainInputs {
  /** LLM Wrapper to use */
  llm: BaseLanguageModel;
}

/**
 * Chain to fact check an article
 * @augments BaseChain
 */
export class FactCheckChain extends BaseChain implements FactCheckChainInput {
  llm: BaseLanguageModel;

  constructor(fields: {
    llm: BaseLanguageModel;
    memory?: BaseMemory;
  }) {
    super(fields.memory);
    this.llm = fields.llm;
  }

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
