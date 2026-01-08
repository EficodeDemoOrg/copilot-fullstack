# GitHub Copilot Comprehensive Training Exercises

Welcome to your comprehensive GitHub Copilot training journey! These exercises are designed to progressively learn GitHub Copilot's features starting with foundational concepts and building up to advanced techniques through hands-on practice with our project.

## Phase 1: Getting Started with Copilot Basics

### Exercise 1.1: Understanding Your Project with Chat Participants

**Welcome to the project!** Before diving into code generation, let's use GitHub Copilot to understand the project you'll be working with.

1. **@project Participant - Project Overview**
   - Open Copilot Chat and select "Ask" mode
   - Ask: `@project Tell me about this project?`
   - Try: `@project /explain Give me a comprehensive overview of this application`
   - Request: `@project What are the main features and components I should know about?`

2. **@project Participant - Code Structure**
   - Ask: `@project How are the files and folders organized in this project?`
   - Try: `@project Show me all the validation patterns used`
   - Request: `@project How are dependencies managed across the codebase?`

**Learning Goal:** Use chat participant to get familiar with the project structure, setup, and workflow before starting development.

### Exercise 1.2: First Steps with Code Suggestions and Inline chat

1. **Explore Auto-Suggestions**
   - Open `backend/src/types/index.ts`
   - Position your cursor after the Task interface and press Enter
   - Type `// Method to check if task is overdue` and press Enter
   - Watch Copilot suggest a method implementation
   - Try accepting the suggestion with `Tab`.

2. **Practice with Comments**
   - Add this comment: `// Calculate the age of this task in days`
   - Let Copilot suggest the implementation
   - Notice how descriptive comments lead to better suggestions

3. **Experiment with Function Names**
   - Start typing `export const formatCreatedDate` and see what Copilot suggests
   - Try `export const isTaskComplete` and observe the different suggestion

4. **Quick Edits with Inline Chat**
   - With `backend/src/types/index.ts` still open, select any method
   - The shortcut to open inline chat for GitHub Copilot in JetBrains IDEs is Alt+Enter. This brings up the Copilot chat or inline suggestions when your cursor is on a line of code.
   - Try: "Add a docstring comment to this method"
   - Notice how inline chat allows quick edits without leaving your code

**Learning Goal:** Understand how Copilot uses context and comments to generate relevant code suggestions.

### Exercise 1.3: Exploring the Suggestion Interface

1. **Navigation Practice**
   - Open `frontend/src/services/api.ts`
   - Add a comment: `// Validate task data before submission`
   - Hover mouse over the suggestion to see alternative suggestions
   - Press `tab` to accept a suggestion
   - If no suggestions appear, try different comments or method names

2. **Partial Acceptance**
   - Start typing a function and accept only part of a suggestion using `Ctrl+→` or `Cmd+→`
   - Try modifying the suggestion before accepting it

**Learning Goal:** Master the Copilot interface and keyboard shortcuts.

### Exercise 1.4: Introduction to Copilot Chat

1. **Opening Chat**
   - Open Copilot Chat
   - Select "Ask" mode from the dropdown
   - Open `frontend/src/App.tsx` in your IDE
   - Ask: "Explain what this file does"

2. **Basic Chat Questions**
   - Ask: `What are the main components of this React application?`
   - Try: `How is data persistence handled in this Node.js project?`
   - Notice how Copilot provides explanations and guidance

**Learning Goal:** Get comfortable with basic Copilot Chat interactions.

### Exercise 1.5: Understanding Interaction Modes

1. **Ask Mode Practice**
   - In Copilot Chat, ask questions about code without expecting changes
   - Try: `What design patterns are used in this codebase?`
   - Notice how Ask mode provides explanations and guidance

2. **Edit Mode Exploration**  
   - Open Copilot Chat in Edit mode
   - Provide file `backend/src/types/index.ts` as context
   - Request: `Add input validation to this interface`
   - Observe how Edit mode focuses on direct code changes

   - Alternatively, you can open the file, select a function, open inline chat and use `Add input validation to this method`.

3. **Agent Mode with new files**
   - Open Copilot Chat in Agent mode
   - Type: `@project Create a simple TypeScript utility class for date formatting`
   - Notice how Agent mode creates complete new implementations

4. **Plan Agent - Strategic Planning**
   - Select **Plan** mode
   - Use for breaking down complex features into actionable steps
   - Try creating a plan to add a new feature like "task prioritization"
   - Ask: `@project Create a development plan for adding task prioritization`
   - Plan helps you think through implementation before coding

**Learning Goal:** Understand when and how to use different Copilot interaction modes.

### Exercise 1.6: Setting Up Project Context with Copilot Instructions

**Why This Matters:** Creating a `copilot-instructions.md` file helps Copilot understand your project's specific patterns, conventions, and architecture, leading to more accurate and relevant suggestions throughout your development session.

1. **Generate Instructions**
   - Create the `.github` folder if it doesn't exist
   - Open Copilot Chat in Agent mode
   - Add your project's README.md and main configuration files as context
   - Request: `@project Based on the project structure and README, create a comprehensive copilot-instructions.md file that defines our coding standards, architectural patterns, and development practices`

2. **Review the Generated Instructions**
   - Open the newly created `.github/copilot-instructions.md` file
   - Read through the generated content to understand what Copilot discovered about your project
   - Notice how it identifies:
     - Project architecture and patterns
     - Key conventions and coding styles
     - Important file structures and relationships
     - Development workflows and commands

3. **Test the Instructions with Copilot**
   - Open Copilot Chat
   - Ask: `Based on the project instructions, explain the main architecture of this application`
   - Try: `Following this project's patterns, how would I add a new field to the Task model?`
   - Request: `What are the key conventions I should follow when adding a new controller?`
   - Compare the responses to earlier interactions - they should be more specific and aligned with your project

4. **Refine the Instructions (Optional)**
   - If you notice any missing patterns or inaccurate information in the generated instructions
   - Edit the `.github/copilot-instructions.md` file to add project-specific details
   - Consider adding information about:
     - Specific coding conventions you follow
     - Common debugging approaches
     - Testing strategies used in the project

**Learning Goal:** Understand how to leverage instruction generation feature to provide Copilot with better project context, resulting in more accurate and relevant code suggestions.

---

## Phase 2: Mastering Chat Commands

### Exercise 2.1: Basic Slash Commands

1. **Understanding Code with `/explain`**
   - Select the `getTasks` method in `frontend/src/services/api.ts`
   - Open inline chat
   - Type: `/explain`
   - Try: `/explain How do React components interact with API services?`
   - Compare explanations with different context levels

2. **Code Documentation with `/doc`**
   - Select the `Task` interface in `backend/src/types/index.ts`
   - Open inline chat
   - Type: `/doc`
   - Try: `/doc Generate comprehensive API documentation for this interface`

3. **Quick Fixes with `/fix`**
   - Create intentional issues (missing semicolon, wrong type annotation)
   - Use: `/fix` to address the issues
   - Try: `/fix Address all TypeScript strict mode issues in this file`

**Learning Goal:** Master basic slash commands for common development tasks.

### Exercise 2.2: Creative Generation

1. **Simple Utility Creation**
   - Open Copilot Chat in Agent mode
   - Try: `Create a TypeScript logging utility for this Node.js project`
   - Experiment: `Generate a configuration service that fits this Express.js architecture`
   - Advanced: `Create an Express middleware system for request validation`

**Learning Goal:** Learn to agent mode for generating new code components.

### Exercise 2.3: Creating Project Structure

1. **Folder and File Structure Creation**
   - Open Copilot Chat in Agent mode
   - Try: `@project Create a new folder structure for additional API endpoints with TypeScript routes and handlers`
   - Experiment: `@project Generate a utils directory with TypeScript helper functions`
   - Advanced: `@project Create a complete testing structure with Jest unit and integration test folders`

2. **Multi-file Component Generation**
   - Request: `@project Create a user management module with TypeScript interfaces, Express routes, and React components`
   - Try: `@project Generate a reporting system with TypeScript data processors and React dashboard components`

**Learning Goal:** Learn to use agent mode for generating complete folder structures and multi-file components.

### Exercise 2.4: Generating Tests with `/tests`

1. **Unit Test Generation**
   - Open `frontend/src/services/api.ts`
   - Select the `createTask` function
   - Open inline chat
   - In chat: `/tests`
   - Examine the generated Jest test structure

2. **Component Testing**
   - Select a component from `frontend/src/components/TaskItem.tsx`
   - Use `/tests` and observe how Copilot handles React component testing
   - Ask follow-up questions like `How would I mock the API calls with React Query?`

3. **Custom Test Scenarios**
   - Ask: `Generate edge case tests for the Task interface validation`
   - Request: `Create integration tests for the Express.js task routes`

**Learning Goal:** Understand how to generate comprehensive tests and testing strategies.

---

## Phase 3: Context Control

> **💡 Context Setup Guide**  
> 
> **Using #file**: Start typing `#` and begin typing the filename you want to add as context. It will show you a dropdown of available files to choose from.
> 
> **Using #get_errors**: Type `#get_errors` to identify any compile or lint errors in the current file.
> 
> **Using #get_terminal_output**: Type `#get_terminal_output` to include the visible output from your terminal window.
> 
> **Drag and Drop**: You can also drag files directly from the Explorer view into the chat window to add them as context.
> 
> **Using + Add Files/Context**: In Edit or Agent mode, click the `+ Add Files` or `+ Add Context` button to select files or folders.
> 
> **For Code Selections**: Select code in the editor, then either drag it into chat or use inline chat (`Ctrl+I` or `Cmd+I`) to work with the selection directly.

### Exercise 3.1: Chat Variables and Context Control

1. **File Context Variables**
   - Try: `What security issues exist in #file:backend/src/routes/tasks.ts?`
   - Experiment with multiple files: `Compare #file:backend/src/types/index.ts with #file:frontend/src/types/index.ts`
   - Note: You can also drag and drop files directly into chat

2. **Working with Code Selections**
   - Select a method in any TypeScript file
   - Open inline chat
   - Ask: "Optimize this code for better performance"
   - Or select code and drag it into the chat window
   - Try selecting multiple lines and asking: "Refactor this to improve readability"
   - Note: Copilot uses selected code directly in inline chat

3. **Project-wide Analysis**
   - Ask: `@project What design patterns are used in this codebase?`
   - Try: `@project How is error handling implemented across the codebase?`
   - Request: `@project Show me the data flow through the application`

4. **Error Context Variables**
   - Use `#get_errors` to reference all errors in your file
   - Ask: `#get_errors What are the most critical errors I should fix first?`
   - Try: `#get_errors Explain these TypeScript errors and suggest fixes`
   - Request: `#get_errors How can I resolve these type checking issues?`
   - This automatically includes error messages from your IDE's Problems panel

5. **Terminal Output Variables**
   - Use `#get_terminal_output` to reference the output from your terminal
   - Run a command in the terminal, then ask: `#get_terminal_output What does this output mean?`
   - Try: `#get_terminal_output Debug this error message`
   - Request: `#get_terminal_output Based on this test output, what's failing?`
   - This captures the visible terminal content for analysis

6. **Folder Context (Agent Mode)**
   - Switch to Agent mode
   - Click `+ Add Context` and select a folder
   - Ask: "Analyze the code quality in this folder"
   - You can add multiple folders to provide broader context

7. **Advanced Context Combinations**
   - Try: `@project What would be the impact of adding caching to #file:backend/src/routes/tasks.ts?`
   - Experiment: Add both `#file:backend/src/routes/tasks.ts` and `#file:backend/src/routes/comments.ts`, then ask "How do these files interact?"
   - Combine project and file context: `@project Based on existing patterns in #file:backend/src/routes/tasks.ts, suggest improvements`
   - Mix error and file context: `#get_errors #file:backend/src/routes/tasks.ts Are these errors related to this file?`

**Learning Goal:** Master Copilot-specific context mechanisms for precise analysis and code generation.

---

## Phase 4: Advanced Context and File Analysis

### Exercise 4.1: Working with File Context

1. **File-Based Questions**
   - Open `backend/src/routes/tasks.ts`
   - Ask: `What design patterns are used in #file?`
   - Try: `How can I improve error handling in #file?`
   - Request: `Explain the Express.js routing pattern in #file`

2. **Cross-File Analysis**
   - Ask: `How does tasks.ts route interact with the Task interface in types/index.ts?`
   - Request: `Show me the data flow from React components to Express routes`

**Learning Goal:** Learn to leverage file context for deeper code understanding.

---

## Phase 5: Practical Development Scenarios

### Exercise 5.1: Feature Development Guidance

1. **Planning New Features**
   - Open Copilot Chat in Ask mode
   - `I want to add task priorities to this React/Node.js application. How should I implement this feature?`
   - `Walk me through adding JWT authentication to this Express.js application`
   - `How would I add task categories without breaking existing TypeScript interfaces?`

2. **Implementation Guidance**
   - Ask: `Show me step-by-step how to add task due dates with TypeScript types`
   - Request code examples for both React components and Express routes
   - Ask for PostgreSQL migration strategies for existing data

**Learning Goal:** Learn to use Copilot for feature planning and implementation guidance.

### Exercise 5.2: Debugging and Problem Solving

1. **Common Issues**
   - Open Copilot Chat in Ask mode
   - Ask: `What could cause the task creation to fail silently in this React Query setup?`
   - Request: `How should I debug PostgreSQL connection issues in this Node.js application?`

2. **Debugging Terminal Output**
   - After running a failing command, ask: `#get_terminal_output Why did this command fail?`
   - Try: `#get_terminal_output How do I fix this based on our project setup?`
   - Request: `#get_terminal_output What does this error stack trace tell us?`

3. **Error Handling Improvements**
   - Ask: `How can I improve error handling throughout this TypeScript application?`
   - Request: `Show me best practices for logging in Express.js applications`

**Learning Goal:** Develop debugging skills with Copilot assistance.

---

## Phase 6: Specialized Agent Interactions

### Exercise 6.1: Security-Focused Reviews

1. **Security Agent Role**
   - Open Copilot Chat
   - `Act as a security expert and review the input validation in backend/src/routes/tasks.ts`
   - `As a security specialist, what vulnerabilities do you see in the Express.js routes?`
   - `From a security perspective, how should I improve the API endpoints?`

2. **Security Best Practices**
   - `What OWASP top 10 issues should I check for in this Node.js/React application?`
   - `Provide specific security improvements for TypeScript input validation`

**Learning Goal:** Learn to use Copilot for security-focused code reviews.

### Exercise 6.2: Performance and Code Quality

1. **Performance Expert Role**
   - Open Copilot Chat
   - `As a performance expert, analyze the efficiency of frontend/src/services/api.ts`
   - `How can I optimize the data loading in the React Query implementation?`

2. **Code Quality Reviewer**
   - `Act as a senior TypeScript developer and review the code quality in the backend/src directory`
   - `What TypeScript coding standards and best practices should I implement in this React/Node.js codebase?`

**Learning Goal:** Understand how different expert perspectives can improve your code.

### Exercise 6.3: Code Review Workflow

1.  **Setting Up for Code Review**

    - Open the file you want to review
    - Open Copilot Chat and select **Ask** mode
    - Ask: `Act as a code reviewer and analyze this file for quality, performance, and best practices`

2.  **Conducting the Review**

    - Select specific methods or sections in the editor
    - Ask: `Review this code for potential bugs, security issues, and maintainability`
    - Request: `Suggest refactoring opportunities and improvements following project conventions`
    - Ask for specific feedback: `Are there any design pattern violations or anti-patterns here?`

3.  **Implementing Feedback**
    - Switch to **Edit** mode in Copilot Chat
    - Paste the review findings: `Based on this code review feedback, apply the recommended improvements`
    - Ask: `Generate updated code that addresses these review comments`
    - Review the changes and accept them into your workflow

**Learning Goal:** Develop a structured code review process using Copilot to catch issues and improve code quality before committing.

---

## Phase 7: Advanced Context Optimization and Copilot Techniques

### Exercise 7.1: Strategic Context Building

1. **Minimal vs. Maximum Context**
   - Ask the same question with different context levels:
     - Minimal: `How do I add validation?`
     - Medium: `How do I add validation to #file?`
     - Maximum: `@project How do I add consistent validation across all controllers following the existing patterns?`
   - Compare response quality and relevance

2. **Context Layering Technique**
   - Start broad: `@project What's the validation strategy?`
   - Layer specific: `#file How does this controller handle validation?`
   - Notice how each layer builds understanding

3. **Cross-Reference Optimization**
   - Use multiple file references: `Compare validation approaches in backend/src/routes/tasks.ts vs backend/src/routes/comments.ts`
   - Combine selection with file context: `How does #selection relate to patterns in #file?`
   - Mix variables effectively: `#codebase #selection Where else is this TypeScript pattern used?`

### Exercise 7.2: Context Quality Assessment  
1. **Response Quality Testing**
   - Ask the same question 3 different ways with varying context
   - Rate responses on: accuracy, completeness, actionability
   - Document which context combinations work best for different question types

2. **Context Efficiency**
   - Time how long different context levels take to process
   - Find the sweet spot between comprehensive context and response speed
   - Learn when minimal context is sufficient vs. when maximum context is necessary

**Learning Goal:** Master the art of providing optimal context for different scenarios.

### Exercise 7.3: Leveraging Multiple LLMs for Specialized Tasks

1. **Scenario: Adding Task Priority Feature - A Multi-Model Workflow**
   
   **Step 1: Analysis with a Reasoning Model**
   - Click the **model picker** in the Chat view and select a reasoning-focused model (e.g., o1, o3-mini, or similar)
   - Ask: `Looking at the current task management structure in this project, what would be the architectural implications of adding task priorities? What potential issues should I consider?`
   - Follow up with: `Based on the existing Task model and routes, what's the most logical way to integrate priority without breaking current functionality?`

   **Step 2: Implementation with a Code Generation Model**
   - Switch to a code-optimized model (e.g., Claude Sonnet, GPT-4o, or similar)
   - Say: `Based on the analysis above, generate the TypeScript interface changes needed to add a priority field to the Task interface. Include validation.`
   - Then: `Now generate the corresponding Express route changes to handle priority in task creation and updates.`
   
   **Step 3: Documentation with a Fast Model**
   - Switch to a faster model for quick tasks (e.g., GPT-4o-mini, Claude Haiku, or similar)
   - Request: `Get the current git status and create a summary of what files would be changed for this priority feature.`
   - Follow with: `Generate a concise commit message and brief documentation for these priority changes.`

   **Step 4: Validation with a Reasoning Model**
   - Return to the reasoning model and ask: `Review the generated code changes. Are there any logical flaws or edge cases I should address before implementing?`

2. **Exploring Available Models**
   - Click the model picker to see all available models for your subscription
   - Note: Available models vary based on your Copilot subscription and may change over time

3. **Reflect on the Multi-Model Experience**
   - Compare how each model approached their specialized task
   - Note the differences in reasoning depth, code quality, and response speed
   - Consider how this workflow could be applied to other feature development scenarios

**Learning Goal:** Master a practical multi-model workflow that leverages each LLM's strengths for analysis, implementation, and project management tasks.

---

## Phase 8: Advanced Prompt Engineering and Agent Workflows

### Exercise 8.1: Understanding Custom Agents

You can create **custom agents** (`.agent.md` files) that define specialized personas with specific tools, instructions, and behaviors. This repository includes two custom agents in `.github/agents/`.

1. **Explore the Custom Agents in This Repository**
   - Open `.github/agents/Implementer.agent.md` and review its structure:
     - **description**: Brief summary of the agent's purpose
     - **tools**: List of tools the agent can use (edit, search, runCommands, etc.)
     - **Instructions**: Detailed behavioral guidelines in the body
   - Open `.github/agents/Lead Developer.agent.md` and compare the differences

2. **Using Custom Agents**
   - Open the Copilot Chat panel
   - Click the **agent picker** dropdown (look for the agent/mode selector)
   - Your custom agents appear alongside the built-in modes (Chat, Edit, Agent)
   - Select **Implementer** to activate that persona

3. **Practice with the Implementer Agent**
   - With Implementer selected, notice it follows a strict execution protocol:
     - Reads task specifications precisely
     - Creates TODO lists before implementing
     - Focuses only on code changes, not planning
   - Try: "Add a method to calculate task completion percentage to the Task interface"
   - Observe how it follows its defined execution phases

4. **Practice with the Lead Developer Agent**
   - Switch to **Lead Developer**
   - This agent focuses on planning and research, never writing production code
   - Try: "Analyze the architecture for adding real-time notifications"
   - Notice how it decomposes the problem into tasks rather than implementing directly

5. **Creating Your Own Custom Agent (Optional)**
   - Create a new `.agent.md` file in `.github/agents/`
   - Define the agent's description, allowed tools, and behavioral instructions
   - Consider creating agents for: code review, documentation, testing, or security analysis

**Learning Goal:** Understand how custom agents extend Copilot's capabilities with specialized personas and workflows.

### Exercise 8.2: Role-Based Collaboration with Custom Agents

1. **Simulate a Lead Developer / Implementer Workflow**
   
   This exercise demonstrates how custom agents can work together like a real development team:
   
   **Step 1: Planning with Lead Developer**
   - Select **Lead Developer** agent
   - Ask: "Create a plan for adding task priority levels (high, medium, low) to this application"
   - The Lead Developer will:
     - Analyze the existing codebase
     - Identify files that need changes
     - Break down the work into discrete tasks
   - Review the generated plan

   **Step 2: Implementation with Implementer**
   - Switch to **Implementer** agent
   - Reference the plan: "Implement the first task from the priority feature plan"
   - The Implementer will:
     - Follow the task specification precisely
     - Create a TODO list of changes
     - Execute the code modifications
   - Review and approve the changes

   **Step 3: Iterate**
   - Return to Lead Developer for the next task assignment
   - Switch back to Implementer to execute
   - Continue until the feature is complete

2. **Understanding Agent Boundaries**
   - Notice how Lead Developer refuses to write production code
   - Notice how Implementer focuses only on execution, not architecture decisions
   - This separation prevents scope creep and maintains quality

**Learning Goal:** Master role-based collaboration using custom agents that mirror real team dynamics.

### Exercise 8.3: Reusable Prompt Files

GitHub Copilot supports **prompt files** (`.prompt.md`) that define reusable prompt templates you can invoke with `/` commands. This repository includes several prompts in `.github/prompts/`.

1. **Explore the Available Prompt Files**
   - Open `.github/prompts/` folder
   - Review the available prompts:
     - `implement.prompt.md` - For executing implementation tasks
     - `lead-plan.prompt.md` - For creating implementation plans
     - `ask_advice.prompt.md` - For getting guidance and recommendations
     - `summarize-session.prompt.md` - For capturing session outcomes
     - `thread-dump.prompt.md` - For context handoffs

2. **Using Prompt Files**
   - In Copilot Chat, type `/` to see available prompt commands
   - Your custom prompts appear alongside built-in commands like `/explain`, `/fix`, `/tests`
   - Select a prompt to insert its template into the chat

3. **Practice with Implementation Prompts**
   - Use `/implement` when working with the Implementer agent
   - Use `/lead-plan` when working with the Lead Developer agent
   - Notice how prompts and agents work together for structured workflows

4. **Creating Your Own Prompt Files (Optional)**
   - Create a new file in `.github/prompts/` with `.prompt.md` extension
   - Define reusable templates for common tasks in your workflow
   - Consider creating prompts for: code reviews, documentation, testing scenarios
   - Restart the IDE or reload the window to see your new prompts in the `/` command list

**Learning Goal:** Leverage reusable prompt files to standardize common workflows and ensure consistency across your team.

### Exercise 8.4: Effective Context Management

1. **Context Window Awareness**
   - Be aware that each chat thread has a limited context window
   - When a conversation gets long, create a summary before starting a new thread
   - Use the thread dump prompt to prepare handoffs

2. **Creating Handoff Documents**
   - Before closing a complex thread, ask: "Summarize our discussion and decisions in a format I can use to continue in a new thread"
   - Save these summaries in your project docs folder
   - Reference these documents when starting related work

3. **Thread Hygiene**
   - Name your threads descriptively (if your IDE supports it)
   - Close threads when their purpose is complete
   - Don't mix different concerns in the same thread
   - Start fresh threads for new features or major refactoring

**Learning Goal:** Master the art of managing multiple focused chat threads effectively.

---

## Phase 9: Creative and Exploratory Exercises

### Exercise 9.1: Code Refactoring Challenges

1. **Refactoring Scenarios**
   - Open Copilot Chat
   - `How would you refactor the Express routes to use dependency injection with TypeScript?`
   - `Show me how to implement the Repository pattern for PostgreSQL data access`

2. **Design Pattern Implementation**
   - `How could I implement the Observer pattern for task status changes using React hooks?`
   - `Show me how to add a Factory pattern for creating different React component types`

**Learning Goal:** Explore advanced programming concepts with Copilot's guidance.

### Exercise 9.2: Alternative Implementations

1. **Different Approaches**
   - `Show me 3 different ways to implement task filtering in React with TypeScript`
   - `What are alternative approaches to PostgreSQL for this Node.js application?`

2. **Technology Comparisons**
   - `How would this application look if built with Next.js instead of React + Express?`
   - `Compare this PostgreSQL implementation with a MongoDB approach`

**Learning Goal:** Understand different implementation strategies and trade-offs.

### Exercise 9.3: Multi-Thread Task Management with Custom Agents

This exercise demonstrates how to use multiple chat threads with different custom agents to organize complex development workflows. In JetBrains, each thread is isolated with its own context and agent selection, allowing you to separate concerns like planning, implementation, and review. While you can't view threads side-by-side like in VS Code, you can effectively switch between threads and share context through files.

1. **Opening Multiple Chat Threads**

   - Open the Copilot Chat tool window from the right sidebar
   - Click the **"+"** button to create a new chat thread
   - Each thread maintains its own conversation history and agent selection
   - You can switch between threads using the thread selector/tabs

2. **Scenario: Implementing User Authentication - Organized Workflow**

   **Thread 1: Lead Developer (Planning)**

   - Create a new chat thread 
   - In the agent picker, select **Lead Developer**
   - Or use **Plan** mode if Lead Developer agent isn't available
   - Add project context: `@project`
   - Ask: `I need to add user authentication to this task manager. What's the overall architecture and implementation strategy you recommend?`
   - Follow up: `Create a detailed implementation plan with security considerations and database schema changes.`
   - The Lead Developer will analyze the codebase and provide a strategic plan
   - **Save the plan**: Ask the agent to `Create a PLANNING.md file with this authentication plan`

   **Thread 2: Implementer (Execution)**

   - Create another new chat thread
   - Switch to **Agent** mode or select **Implementer** custom agent
   - Drag and drop `PLANNING.md` into the chat window for context
   - Ask: `Based on this authentication plan, implement the User model and basic login functionality.`
   - The Implementer agent will create TODO lists and execute the code changes
   - Use `/implement` prompt if available
   - Request: `Generate comprehensive Jest unit tests for the authentication system.`

3. **Cross-Thread Collaboration Workflow**

   **Step 1: Planning → Implementation**

   - In Lead Developer thread, get the complete plan
   - **Option A**: Ask agent to create `docs/AUTH_PLAN.md` file
   - **Option B**: Copy the plan text manually
   - Switch to Implementer thread
   - Add the plan file as context: `#file:docs/AUTH_PLAN.md` or drag-and-drop
   - Implementer executes based on the plan

   **Step 2: Implementation → Review**

   - After Implementer makes changes, note the modified files
   - Switch back to Lead Developer thread
   - Add the implemented files as context: `#file:backend/src/types/index.ts #file:backend/src/routes/auth.ts`
   - Or drag-and-drop the files into the chat
   - Ask: `Review this authentication implementation. What improvements or security concerns do you see?`
   - Ask the agent to create a `docs/AUTH_REVIEW.md` file with the feedback

   **Step 3: Refinement Loop**

   - Switch back to Implementer thread
   - Add review context: `#file:docs/AUTH_REVIEW.md`
   - Ask: `Address the review feedback and refine the code`
   - Continue iterating between threads until both agents approve

4. **Alternative: Single Thread with Role Switching**

   If managing multiple threads becomes complex, you can use a single thread and explicitly switch roles:
   
   - Create one thread: **"User Authentication Feature"**
   - **Planning phase**: `Acting as Lead Developer, create an implementation plan for user authentication`
   - **Save the plan**: Ask to create `docs/AUTH_PLAN.md`
   - **Implementation phase**: `Now acting as Implementer, based on #file:docs/AUTH_PLAN.md, implement the User model`
   - **Review phase**: `Back to Lead Developer role, review #file:backend/src/types/index.ts for security issues`

5. **Tips for Multi-Thread Workflows in JetBrains**
   
   - **Use files for handoffs**: Create .md files to share context between threads
   - **Leverage drag-and-drop**: Quickly add files to any thread by dragging from the Project view
   - **Use #file: syntax**: Reference specific files when switching threads
   - **Leverage prompt files**: Use `/lead-plan` in Lead Developer thread, `/implement` in Implementer thread (if created in Exercise 8.3)
   - **Name threads descriptively**: Use clear names like "Feature X - Planning" vs "Feature X - Implementation"
   - **One task at a time**: Complete planning fully before switching to implementation thread
   - **Document decisions**: Keep running notes in docs/ folder for cross-thread reference
   - **Use @project sparingly**: Only use when you need full codebase context, as it can slow responses

**Learning Goal:** Master multi-thread organization techniques using custom agents to separate planning, implementation, and review concerns, creating a structured development workflow that mirrors professional team collaboration, adapted for JetBrains' thread management system.

---

Happy coding with GitHub Copilot!
