import { PromptTemplate } from "langchain/prompts";

const startFactcheckPrompt = new PromptTemplate({
  inputVariables: ['article'],
  template: `
Today we're going to fact-check an article.

Article: {article}

Note down statements or claims that seem to be factual, important to the overall argument,
  or potentially controversial (as dotpoints):
`,
});

const componentsPrompt = new PromptTemplate({
  inputVariables: ['claims'],
  template: `
Claims: {claims}

Rewrite this list of claims. As you do, if you notice one that is multifaceted or
complicated, break it down into simpler, more manageable components that can be fact-checked individually. Write each claim as an individual dotpoint.
`,
});

const prioritisationPrompt = new PromptTemplate({
  inputVariables: ['article', 'claims'],
  template: `
Article: {article}

Claims: {claims}

Prioritise the above claims based on their importance to the article's overall argument,
their potential impact, and the likelihood that they might be false or misleading. State
only the prioritised claims (as dotpoints).
`,
})

export { startFactcheckPrompt, componentsPrompt, prioritisationPrompt };
