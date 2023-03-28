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

    const startFactcheckChain = new LLMChain({
      llm: this.llm,
      prompt: startFactcheckPrompt,
    })

    const startFactcheckValues = await startFactcheckChain.call({
      article: values.article,
    });

    console.log("");
    console.log(startFactcheckValues.text);

    const componentsChain = new LLMChain({
      llm: this.llm,
      prompt: componentsPrompt,
    })

    const componentsValues = await componentsChain.call({
      claims: startFactcheckValues.text,
    });

    console.log("");
    console.log(componentsValues.text);

    const prioritisationChain = new LLMChain({
      llm: this.llm,
      prompt: prioritisationPrompt,
    })

    const prioritisationValues = await prioritisationChain.call({
      article: values.article,
      claims: componentsValues.text,
    });

    console.log("");
    console.log(prioritisationValues.text);

    return {
      claims: prioritisationValues.text,
    };
  }

  serialize(): SerializedBaseChain {
    throw new Error("Not implemented");
  }

  _chainType() {
    return "fact_check_chain" as const;
  }
}
