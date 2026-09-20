# 🤖 AI Content Studio

AI Content Studio is a modern **AI-powered content creation platform** designed to help users generate, improve, and manage different types of digital content from a single dashboard.

The platform combines a modern web interface with an AI-powered backend to provide tools for **content generation, rewriting, summarization, idea generation, and content management**.

---

## 🚀 Features

### ✨ AI Content Generation

Generate high-quality content using AI based on a user's prompt.

* Blog posts
* Social media posts
* Marketing copy
* Product descriptions
* Creative content
* Custom AI prompts

### 📝 Content Rewriter

Improve existing content while maintaining its original meaning.

* Rewrite paragraphs
* Improve readability
* Change writing style
* Make content professional
* Make content concise

### 📌 Content Summarizer

Convert long content into shorter and easier-to-understand summaries.

* Text summarization
* Key-point extraction
* Short summaries
* Quick content analysis

### 💡 Content Ideas Generator

Generate creative content ideas based on a topic or niche.

* Blog ideas
* Social media ideas
* Marketing ideas
* Video/content ideas
* Topic suggestions

### 🎯 Multiple Writing Styles

Users can generate content according to different styles, such as:

* Professional
* Casual
* Creative
* Friendly
* Persuasive
* Informative

### 📊 AI Content Dashboard

A centralized dashboard allows users to:

* Create content
* View generated content
* Manage previous content
* Copy generated content
* Delete content
* Track content activity

### 🔐 User Authentication

The application provides secure user authentication with:

* User registration
* Login
* Authentication
* Protected dashboard
* Logout

---

# 🛠️ Technology Stack

## Frontend

* **Next.js** – Frontend framework
* **React** – User interface development
* **TypeScript** – Type-safe development
* **Tailwind CSS** – Responsive and modern UI
* **jsPDF** – PDF content generation/download

## Backend

* **Java** – Backend development
* **Spring Boot** – REST API development
* **Spring Security** – Authentication and authorization
* **REST APIs** – Frontend-backend communication

## AI

* **Generative AI API** – AI-powered content generation
* Prompt-based content generation
* AI-assisted rewriting
* AI summarization
* AI content ideation

## Database

* **MySQL** – Data storage
* User information
* Generated content
* Content history

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Next.js Frontend  │
                    │ React + TypeScript  │
                    │    Tailwind CSS     │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Spring Boot      │
                    │       Backend       │
                    │        Java         │
                    └──────┬───────┬──────┘
                           │       │
              ┌────────────┘       └────────────┐
              ▼                                 ▼
     ┌─────────────────┐               ┌─────────────────┐
     │      MySQL      │               │    AI Service   │
     │    Database     │               │ Generative AI   │
     └─────────────────┘               └─────────────────┘
```

---

# 📂 Project Structure

```text
AI-Content-Studio/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── styles/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   │
│   ├── pom.xml
│   └── application.properties
│
├── README.md
└── .gitignore
```

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-content-studio.git
```

Move into the project directory:

```bash
cd ai-content-studio
```

---

# 💻 Frontend Setup

Open the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

---

# ☕ Backend Setup

Open the backend directory:

```bash
cd backend
```

Make sure **Java** and **Maven** are installed.

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will run on:

```text
http://localhost:8080
```

---

# 🗄️ Database Configuration

Create a MySQL database:

```sql
CREATE DATABASE ai_content_studio;
```

Configure the database connection inside:

```text
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ai_content_studio
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Replace:

```text
YOUR_PASSWORD
```

with your local MySQL password.

---

# 🔑 Environment Variables

Create a `.env.local` file inside the frontend if required:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

For the backend, keep sensitive API credentials outside the source code.

Example:

```properties
AI_API_KEY=your_api_key
```

> ⚠️ Never upload API keys, passwords, or other secrets to GitHub.

---

# 🔄 Application Workflow

```text
User
  │
  ▼
Login / Register
  │
  ▼
AI Content Studio Dashboard
  │
  ├── Generate Content
  │
  ├── Rewrite Content
  │
  ├── Summarize Content
  │
  ├── Generate Ideas
  │
  └── Manage Content
          │
          ▼
     Spring Boot API
          │
     ┌────┴────┐
     ▼         ▼
   MySQL     AI API
     │         │
     └────┬────┘
          ▼
    Generated Result
          │
          ▼
       Dashboard
```

---

# 🎨 Main Modules

## 1. Authentication Module

Handles:

* Registration
* Login
* Logout
* User authentication
* Protected routes

## 2. Content Generation Module

Allows users to enter a prompt and generate AI-powered content.

Example:

```text
Topic:
Artificial Intelligence in Education

Content Type:
Blog

Tone:
Professional
```

The AI then generates the requested content.

## 3. Content Rewriting Module

Users can paste existing content and select a preferred writing style.

```text
Original Content
       ↓
   AI Processing
       ↓
Improved/Rewritten Content
```

## 4. Summarization Module

Converts lengthy content into a concise summary.

```text
Long Content
     ↓
AI Summarization
     ↓
Short Summary
```

## 5. Content Ideas Module

Users provide a topic and receive multiple content ideas.

Example:

```text
Topic: Artificial Intelligence

Ideas:
1. Future of AI
2. AI in Education
3. AI in Healthcare
4. AI and Cyber Security
5. Generative AI
```

## 6. Content History

Users can manage previously generated content.

Possible actions:

* View
* Copy
* Download
* Delete

---

# 📡 API Overview

Example REST API endpoints:

```text
POST   /api/auth/register
POST   /api/auth/login

POST   /api/content/generate
POST   /api/content/rewrite
POST   /api/content/summarize
POST   /api/content/ideas

GET    /api/content
GET    /api/content/{id}

DELETE /api/content/{id}
```

---

# 🔒 Security

The application is designed with security considerations including:

* Authentication
* Protected API endpoints
* Password protection
* Input validation
* Environment-based API keys
* Secure backend communication
* Database access control

---

# 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

The interface uses responsive layouts to provide a consistent user experience across different screen sizes.

---

# 📄 Content Export

Generated content can be exported for further use.

Supported functionality can include:

* Copy to clipboard
* Download as PDF
* Save generated content
* Manage content history

---

# 🌟 Future Enhancements

Future versions of AI Content Studio can include:

* 🎙️ Voice-to-content generation
* 🌐 Multi-language content generation
* 📈 Content quality scoring
* 🔍 SEO optimization
* 🔑 JWT-based authentication
* 📊 Advanced analytics dashboard
* 📝 Rich text editor
* 📅 Content scheduling
* 📱 Mobile application
* 🤖 Multiple AI model support
* 🖼️ AI image generation
* 📧 Social media publishing
* ☁️ Cloud deployment

---

# 🎯 Project Objectives

The main objectives of AI Content Studio are:

1. Simplify AI-powered content creation.
2. Provide multiple content-generation tools in one platform.
3. Reduce the time required to create digital content.
4. Provide an easy-to-use and responsive interface.
5. Store and manage generated content.
6. Demonstrate full-stack development using modern technologies.
7. Integrate Generative AI with a Java-based backend.

---

# 📚 Learning Outcomes

Through this project, developers can gain practical experience with:

* Full-stack web development
* Next.js and React
* TypeScript
* Tailwind CSS
* Java programming
* Spring Boot
* REST API development
* MySQL database integration
* Authentication and authorization
* Generative AI integration
* API communication
* PDF generation
* Git and GitHub
* Responsive UI development

---

# 👨‍💻 Developer

**Kamlesh Kumar Sahu**

B.Tech Computer Science & Engineering

GitHub:
https://github.com/KamleshSahu874

LinkedIn:
https://www.linkedin.com/in/kamlesh-kumar-sahu-9b361a309/

---

# 📜 License

This project is created for **educational and portfolio purposes**.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
