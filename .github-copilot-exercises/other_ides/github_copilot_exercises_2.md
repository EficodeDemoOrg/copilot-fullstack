# GitHub Copilot Comprehensive Training Exercises - Session 2: Agent-Based Development Workflow

Welcome to Session 2! You'll now dive into advanced agent-based development workflows. These exercises implement a structured approach focusing on **multi-agent collaboration** and **complex feature implementation**.

> **💡 About Custom Agents in JetBrains**
>
> JetBrains IDEs now support custom agents similar to VS Code, allowing you to save and reuse agent configurations. You'll create custom agent files that define specific roles (Lead Developer, Implementer, QA Agent) and select them from the agent picker in Copilot Chat.
>
> **What this means for you:**
> - You'll create custom agent files in `.github/agents/` as `.agent.md` files
> - Each agent file defines a role with specific instructions and behavior
> - Select agents from the agent picker dropdown in Copilot Chat
> - Agents can use reusable prompts stored in `.github/prompts/` for specific tasks
> - This approach gives you structured, repeatable workflows with proper role separation

## Model Recommendations

Different agents work best with different AI models:

- **Lead Developer**: Claude Sonnet 4/4.5 (better at detailed planning and research)
- **Implementer**: Claude Sonnet 4/4.5 (superior code generation and precision)
- **Deep reasoning and debugging**: Gemini 2.5 Pro

**Always verify before running a prompt:**
1. Check the model selector shows your preferred model for that task
2. Manually switch models if needed
3. Keep track of which role you're using in each chat session

## Exercise 1: Complete User Authentication System Implementation

### Scenario: Multi-Agent Epic Development

You've been tasked with adding a complete user authentication system to the Simple Task Manager application. This comprehensive exercise demonstrates the full agent-based development workflow from requirements analysis through implementation and completion. This will require user registration, login/logout, session management, and user-specific task ownership.

### Phase 1: Multi-Agent Feature Planning

#### Part 1.1: Requirements Analysis with Ask Agent

1. **Create Context Understanding**
   - Open a new Copilot Chat and set the context: "I am analyzing requirements for a user authentication system"
   - Ask: `@project Analyze the current architecture. How would adding user authentication impact the existing task management system?`
   - Follow up: `What are the main challenges and considerations for adding users to this TypeScript/React/Node.js task manager application?`
   - Request: `Identify all files that would need modification and new files that need creation for user authentication`

2. **Security and Data Flow Analysis**
   - Ask: `From a security perspective, what authentication and authorization patterns should I implement in this Node.js/Express application?`
   - Request: `How should user data flow between the Express routes, services, and PostgreSQL database?`
   - Analyze: `What changes would be required to the PostgreSQL database schema for user management and user-specific task data?`

3. **Integration Impact Assessment**
   - Ask: `How will user authentication affect the existing task, comment, and tag routes in backend/src/routes/?`
   - Request: `What backwards compatibility considerations do I need for existing task functionality?`
   - Evaluate: `What Node.js security best practices and JWT token management features should be implemented for authentication in this Express.js architecture?`

**Deliverable:** Create a `REQUIREMENT-ANALYSIS.md` file documenting all findings, challenges, and recommendations.

#### Part 1.2: Strategic Planning with Plan Agent

1. **Create High-Level Implementation Strategy**
   - Start a fresh Copilot Chat session
   - Select **Plan** from the agent picker
   - Attach the `REQUIREMENT-ANALYSIS.md` file as context
   - Request: `Create a strategic plan for implementing user management in this application. Break down the work into logical phases and identify dependencies.`

   **The Plan agent will:**
   - Analyze the requirements and create a high-level implementation strategy
   - Identify major phases of work (e.g., database setup, authentication, authorization, UI)
   - Suggest the order of implementation
   - Highlight potential risks and dependencies

2. **Review and Refine the Strategy**
   - Review the strategic plan provided by the Plan agent
   - Ask follow-up questions to clarify any ambiguous areas
   - Request: `What are the critical milestones for this implementation?`
   - Ask: `What would be a good MVP (Minimum Viable Product) for this feature?`

**Deliverable:** Document the strategic plan in `docs/epic_user_management/STRATEGIC_PLAN.md`

#### Part 1.3: Detailed Task Planning with Lead Developer Agent

1. **Convert Strategy into Executable Tasks**
   - Start a fresh Copilot Chat session
   - In the chat interface, locate the agent picker dropdown
   - Select **"Lead Developer"** custom agent from the picker
   - Attach both `REQUIREMENT-ANALYSIS.md` and `STRATEGIC_PLAN.md` as context
   - Use the reusable prompt: `/lead-plan`

   **The Lead Developer will:**
   - Convert the strategic plan into detailed, actionable tasks
   - Generate numbered task files (01_task_name.md, 02_task_name.md, etc.)
   - Document technical decisions in a decision log
   - Create a task manifest

   **Task numbering:** Tasks are numbered sequentially (01, 02, 03...) to enforce execution order. Each task is designed to be completed without blocking on others.

2. **Review the Detailed Plan**
   - Read each task file to ensure it makes sense
   - Verify tasks are small enough (each should be completable in one session)
   - Check that file paths use project root (`/`) not placeholders
   - Ensure tasks align with the strategic plan from Part 1.2

   **Deliverable:**
   - Output files in `docs/epic_[name]/`:
   - `plans/IMPLEMENTATION_PLAN.md`
   - `plans/DECISION_LOG.md`
   - `tasks/01_[name].md`, `tasks/02_[name].md`, etc.
   - `MANIFEST.md`

**Note:** For custom agent creation, you'll need to create a Lead Developer agent file. Here's the structure to use in `.github/agents/Lead Developer.agent.md`:

The Lead Developer agent should define:
- Role as architectural decision-maker and planning specialist
- Planning workflow for converting requirements into sequential tasks
- Task file structure with clear goals, context, acceptance criteria
- Technical standards (TypeScript, Node.js 18+, Express.js, React 19, PostgreSQL, JWT)
- Use the `/lead-plan` prompt for executing the planning workflow

Refer to existing custom agents in your workspace for the proper agent file structure.

2. **Use the Lead Developer Prompt**
   - Start a **new Copilot Chat session**
   - Reference the prompt file: `#prompt:custom_lead-plan`
      - Or For JetBrains: `/custom_lead-plan`
   - Add your requirements file: `#file:REQUIREMENT-ANALYSIS.md`
   - Provide the epic name: "The epic name is 'user_authentication'. Create the implementation plan."

3. **Review the Generated Plan**
   - The agent will create a new epic in `docs/epic_user_authentication/` containing:
     - `plans/IMPLEMENTATION_PLAN.md`: The overall strategy
     - `plans/DECISION_LOG.md`: Key decisions and rationale
     - `tasks/01_[name].md`, `tasks/02_[name].md`, etc.: Sequenced tasks
     - `MANIFEST.md`: A manifest of all generated files

   **Your responsibility:**
   - Read each task file to ensure it makes sense
   - Verify tasks are small enough (each should be completable in one session)
   - Check that file paths use project root (`/`) not placeholders
   - Ensure tasks follow TypeScript and React best practices

**Deliverable:**
   - Output files in `docs/epic_user_authentication/`:
     - `plans/IMPLEMENTATION_PLAN.md`
     - `plans/DECISION_LOG.md`
     - `tasks/01_[name].md`, `tasks/02_[name].md`, etc.
     - `MANIFEST.md`

#### Part 1.4: Experimenting with Custom Planning Prompts (Optional)

Instead of using the structured prompt with the Lead Developer agent, you can experiment with generating the plan using your own custom prompts. This is a great way to practice prompt engineering and compare outputs.

1. **Start a new chat session** with your preferred model (e.g., Claude Sonnet 4, GPT-4)
2. **Provide Context**: Add `#file:REQUIREMENT-ANALYSIS.md`
3. **Craft Your Own Prompt**: Try variations like:
   > "Based on the attached requirements analysis, create a detailed implementation plan for adding user authentication to this TypeScript/React/Node.js task manager application. Break it into 5-7 numbered, sequential task files. Each task should focus on a specific component (database migrations, backend routes, services, React components, etc.). Use Node.js 18+, TypeScript, Express.js, PostgreSQL, and React Query best practices. Generate a MANIFEST.md listing all files you create."

4. **Compare Results**: 
   - How does your custom prompt compare to the structured prompt?
   - Which produces clearer task definitions?
   - What prompt patterns work best for planning?

### Phase 2: Collaborative Implementation Workflow

#### Part 2.1: Implement the Tasks

1. Start a **new chat session**
2. Select the **Implementer** agent from the agent picker
3. **Set model to Claude Sonnet 4 or 4.5 using the model picker** (best for precise code generation)
4. Drag the first task file as context: `docs/epic_[name]/tasks/01_[task_name].md`
5. Run: `/implement`

The Implementer will:
- Read and summarize what it plans to do
- List all files it will create/modify
- Ask for your approval to proceed

**Your responsibility:**
- Review the implementation plan
- Confirm it matches the task specification
- Approve with "yes" or request clarification

Once approved, the Implementer will:
- Execute the task step by step
- Verify the implementation works with existing code
- Execute any necessary tests or manual verification
- Report completion status

#### Part 2.2: Handle Implementation Issues

**If the task succeeds:**
- Review the code changes
- Test manually by running `npm run dev` in both backend and frontend directories
- Move to the next task (repeat Part 2.2 with `02_[task_name].md`)

**If verification fails:**
- Read the Implementer's explanation
- Minor issues: Let it proceed if non-critical items failed
- Major issues: Ask the agent to propose solutions

**If the Implementer gets blocked:**
The agent will present what went wrong and propose solutions.

You can:
- Approve a proposed solution
- Provide an alternative approach
- Modify the task specification
- Go back to Lead Developer for task revision

#### Step 2.3: Complete Remaining Tasks

Repeat Part 2.2 for each task file in sequence (02, 03, etc.) until all tasks in the epic are complete.

**Important:** Each task should be run in a fresh Implementer session with just that task file as context.

#### Part 2.4: Experimenting with Custom Implementation Prompts (Optional)

Want to try a different implementation approach? Create your own prompt!

1. **Start a new chat session**
2. **Add task context**: `#file:docs/epic_[name]/tasks/01_[task_name].md`
3. **Craft your prompt**: Try variations like:
   > "Act as a senior TypeScript developer. Implement the attached task using Node.js 18+, Express.js, PostgreSQL, React 19, and TypeScript best practices. List all files you'll modify, explain your approach, and then implement it step by step. Follow the existing patterns for API routes, React Query usage, and form handling. Test your implementation."

4. **Apply changes**: Copy code blocks and apply them to your workspace

This hands-on approach helps you understand how to guide an agent through complex tasks.

#### Part 2.5: Complete the Epic

After the last task succeeds:

1. Stay in **Implementer** agent or start new session
2. Attach:
   - `docs/epic_[name]/plans/IMPLEMENTATION_PLAN.md`
   - `docs/epic_[name]/MANIFEST.md`
3. **Request:** "Generate a completion report for this epic."
The Implementer generates a completion report with:
- Summary of work completed
- Any deviations from plan
- Recommendations for future epics

## Exercise 2: Comprehensive Testing and QA

### Scenario: Agent-Driven Quality Assurance

The user authentication system from Exercise 1 is feature-complete, but it hasn't been tested! Your task is to use a QA-focused agent workflow to create and implement a comprehensive test suite, ensuring the new features are robust, secure, and bug-free.

### Phase 1: Test Strategy and Planning

#### Part 1.0: Create a Custom QA Agent

Before beginning test analysis, create a specialized QA agent to focus on testing concerns.

1.  **Create the QA Agent File**
    *   In your project, create the directory `.github/agents/` if it doesn't exist
    *   Create a new file: `.github/agents/QA Specialist.agent.md`

2.  **Define the QA Agent**
    *   Define the Agent as required. Refer to the existing custom agents for structure.
    *   The QA Specialist should focus on:
        - TypeScript/Node.js/React testing patterns
        - Security vulnerability identification
        - Test framework recommendations (Jest, React Testing Library, Supertest, Playwright)
        - Comprehensive test case generation

3.  **Verify Agent Availability**
    *   Open Copilot Chat
    *   Click the agent picker dropdown
    *   Verify **"QA Specialist"** appears in the list of available agents

**Deliverable:** Custom QA Specialist agent ready to use for test analysis.

#### Part 1.1: Test Analysis with QA Specialist Agent

1.  **Analyze the Feature Implementation**
    *   Open a new Copilot Chat session
    *   Select **"QA Specialist"** from the agent picker
    *   Ask: `@project Based on the recently added user management system, what are the critical code paths that require testing?`
    *   Follow up: `Generate a list of test cases covering unit, integration, and end-to-end scenarios for user registration, login, and profile management.`
    *   Request: `What are the primary security vulnerabilities (like SQL injection, XSS, or session fixation) we should test for in the authentication flow?`

2.  **Tooling and Setup Recommendations**
    *   Ask: `Given the TypeScript/Node.js/React project structure, what testing framework would you recommend?`
    *   Request: `Outline the steps and code needed to set up the recommended testing framework in this project.`

3.  **Edge Cases and Test Data**
    *   Ask: `What edge cases should I test for in the user authentication flow?`
    *   Request: `Generate sample test data covering normal cases, boundary conditions, and error scenarios.`

**Deliverable:** Create a `TEST-ANALYSIS.md` file documenting all test cases, security concerns, recommended frameworks, and setup plan.

#### Part 1.2: Test Strategy with Plan Agent

1.  **Create High-Level Test Strategy**
    *   Start a fresh Copilot Chat session
    *   Select **Plan** from the agent picker
    *   Attach the `TEST-ANALYSIS.md` file as context
    *   Request: `Create a strategic test plan for the user authentication system. Organize tests by priority (critical, high, medium) and type (unit, integration, e2e). Identify dependencies between test suites.`

2.  **Review and Prioritize**
    *   Review the test strategy provided by the Plan agent
    *   Identify which tests are essential for MVP vs. nice-to-have
    *   Request: `What tests are absolutely critical before deploying to production?`

**Deliverable:** Document the test strategy in `docs/epic_user_auth_testing/TEST_STRATEGY.md`

#### Part 1.3: Manual Plan Generation (Alternative Approach)

As an alternative to using structured agents, you can experiment with generating the plan manually using the built-in Agent mode. This is a great way to understand how to craft effective prompts and compare the outputs of different models.

1.  **Start a new chat session** and select **Agent** from the agent picker
2.  **Provide Context**: Drag both `TEST-ANALYSIS.md` files into the chat
3.  **Prompt the Agent**: Use a custom prompt to generate the plan. For example:
    > "Based on the attached test analysis and strategy, create a detailed, step-by-step implementation plan for the "user_auth_testing" epic. Break the work into small, numbered, sequential task files. For each task, define a clear goal and acceptance criteria. Also generate a MANIFEST.md file listing all the files you will create."
4.  **Create Files Manually**: Based on the agent's output, create the directory structure (`docs/epic_user_auth_testing/`) and the corresponding plan, task, and manifest files yourself.

This approach gives you more fine-grained control and is an excellent exercise in prompt engineering.

**Deliverable:** Document the test strategy in `docs/epic_user_auth_testing/TEST_STRATEGY.md`

#### Part 1.4: Detailed Test Plan with QA Specialist Agent

1.  **Create the Test Implementation Plan**
    *   Start a new Copilot Chat session and select **"QA Specialist"** from the agent picker
    *   Provide both `TEST-ANALYSIS.md` and `TEST_STRATEGY.md` files as context
    *   Use the prompt: `/lead-plan Create a detailed, step-by-step test implementation plan based on the provided analysis and strategy. The epic name is "user_auth_testing".`
    
    **Note:** The `/lead-plan` prompt works with any custom agent. The QA Specialist will use its testing expertise to create test-focused tasks.

2.  **Review the Generated Plan**
    *   The QA Specialist agent will create a new epic in `docs/epic_user_auth_testing/` containing:
        *   `plans/IMPLEMENTATION_PLAN.md`: The overall test implementation strategy
        *   `plans/DECISION_LOG.md`: Testing framework and approach decisions
        *   `tasks/01_[name].md`, `tasks/02_[name].md`, etc.: Sequenced tasks like:
            - Setting up the testing framework and configuration
            - Writing unit tests for the User model
            - Writing integration tests for the login controller
            - Creating security-focused test cases (SQL injection, XSS, etc.)
            - Implementing edge case tests
        *   `MANIFEST.md`: A manifest of all generated files
    *   Verify that the tasks are logical, sequential, and appropriately sized
    *   Confirm that all security concerns and edge cases from earlier analysis are covered

#### Part 1.5: Experimenting with Custom Test Planning (Optional)

Try creating the test plan with your own prompt:

1. **Start a new chat session**
2. **Add context**: `#file:docs/TEST-ANALYSIS.md`
3. **Custom prompt example**:
   > "Based on the attached test analysis, create a step-by-step test implementation plan for the 'user_auth_testing' epic. Break into numbered task files: setup test infrastructure, unit tests for authentication services, integration tests for API routes, React component tests, e2e tests, security tests, etc. Use Jest, React Testing Library, Supertest, and Playwright with TypeScript. Generate MANIFEST.md."

4. **Create files manually** based on the output
5. **Compare** with the structured prompt approach

### Phase 2: Test Implementation and Debugging

#### Part 2.1: Implement the Test Tasks

1.  **Execute Tasks with the Implementer**
    *   For each task file (starting with `01_...`), start a **new chat session** with the **"Implementer"** agent.
    *   Drag the task file into the chat as context.
    *   Run the `/implement` command.
    *   Review the Implementer's plan and approve it by typing "yes".
    *   The agent will write the test files, configuration, and any necessary helper code.

#### Part 2.2: Manual Test Implementation using Agent

As an alternative to using the structured **"Implementer"** custom agent, you can implement the tasks manually with the built-in Agent. This gives you more control and helps you practice writing effective implementation prompts.

1.  **Start a new chat session** with your preferred agent model.
2.  **Provide Context**: Drag a task file into the chat.
3.  **Prompt the Agent**: Use a custom prompt to guide the implementation. For example:
    > "Based on the attached task, generate the necessary code and file modifications to complete it. List all files you will create or modify. I will review your plan before you proceed."
4.  **Apply Changes Manually**: Copy the code blocks from the agent's response and apply them to your workspace.

This hands-on approach is excellent for learning how to guide an agent through complex coding tasks without relying on pre-defined commands.

#### Part 2.3: Running Tests and Fixing Bugs

This is the core of the QA workflow.

1.  **Run the Newly Created Tests**
    *   After the Implementer creates a test file, run it from your terminal:


     - Backend tests: `cd backend && npm test`
     - Frontend tests: `cd frontend && npm test`
      - Specific test file: `npm test -- UserAuthService.test.ts`
     - E2E tests: `npm run test:e2e`
     - Specific test file: `npm test -- UserAuthService.test.ts`
     - E2E tests: `npm run test:e2e`

2. **If Tests Pass:**
   - Congratulations! Move to the next task in the sequence.

3. **If Tests Fail (Bug Found):**
   - Start a **new chat session**.
   - Paste the full error output from the failed test run into the chat.
   - Ask: `@project This test is failing with the error below. Analyze the relevant code and the test to identify the bug. Propose a fix.`
   - Review the agent's analysis and the proposed code change.
   - Apply the fix, re-run the test to confirm it passes, and then commit your changes.

4. **Complete the Test Suite**

*   Repeat the implement-run-fix cycle for all tasks in the `docs/epic_user_auth_testing/tasks/` directory until the entire test suite is implemented and all tests are passing.

#### Part 2.4: Generate Test Completion Report

1. **Complete the Testing Epic**
   After all test tasks are complete and passing:

   - **Start a new chat session**
   - Select **"Implementer"** from the agent picker (if starting new session)
   - **Add context files**:
      - `#file:docs/epic_user_auth_testing/plans/IMPLEMENTATION_PLAN.md`
      - `#file:docs/epic_user_auth_testing/MANIFEST.md`
   - **Request**: "Generate the completion report for the testing epic."

   The agent will produce a comprehensive report documenting:
   - Test coverage summary (unit, integration, e2e)
   - Security vulnerabilities tested and remediated
   - Any deviations from the original test plan
   - Recommendations for ongoing test maintenance
   - Next steps for production deployment

## Tips for Success

- **One agent, one task, one chat session** - Don't mix contexts
- **Double-check agent and model** - Every time you switch threads, verify the agent picker and model picker show the correct selections
- **Use Claude Sonnet 4/4.5 for implementation** - It's superior for code generation and detailed planning
- **Start fresh when stuck** - If an agent loses context or becomes confused, start a new chat session with clear context
- **Read everything** - The agents generate detailed documentation for a reason
- **Commit frequently** - After each successful task or epic
- **Trust but verify** - Agents follow patterns but can make mistakes
- **When in doubt, escalate** - Go back to higher abstraction levels

## TypeScript/React/Node.js-Specific Considerations

- **TypeScript Types**: Ensure all new interfaces and types are properly defined and exported
- **Package Scripts**: Use `npm run dev` for development and `npm test` for running tests
- **Database Migrations**: Use proper PostgreSQL migration scripts and connection pooling
- **JWT Security**: Implement proper token generation, validation, and refresh mechanisms
- **React Patterns**: Use React Query for server state management and React Hook Form for forms
- **API Validation**: Always validate inputs using Joi on the backend
- **Error Handling**: Use proper Express.js error middleware and React error boundaries
- **Environment Variables**: Use dotenv for configuration management

This experimental system will evolve. When you find issues, use Copilot to improve the prompts and share your enhancements with the community.