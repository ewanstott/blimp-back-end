🧑‍⚕️ Blimp - Backend Architecture 📈
------------------------

🚨 Site Currently Not Live

The site is currently not running.
However, you can view the project files to understand how the site was structured and designed.
Frontend Repo here: https://github.com/ewanstott/blimp

💻 Tech Stack
------------------------
- Backend Framework: Node.js and Express.js using TypeScript
- Database: MySQL relational database (hosted separately)
- Middlewares: Custom middlewares to handle requests and errors efficiently
- Security: Helmet for HTTP headers, CORS for access control, Secured against SQL injections
- Authentication: Token-based authentication with token generation and storage; Expiring tokens feature for added security
- Validation: Validation and sanitation of user input to ensure data integrity and security
- Testing: Vitest for backend test suites
- Design Patterns: Implementation following SOLID principles
- API Design: Fully functional REST API supporting CRUD operations

📖 About Blimp's Backend
------------------------
The backbone of the Blimp health tech web app, this backend architecture is designed to be efficient, secure, and robust. It lays the foundation for all operations on Blimp, enabling secure user registration, seamless messaging between patients and practitioners, and appointment booking.

⚙️ Core Features
------------------------
- Token Authentication: Advanced token generation and storage mechanisms, ensuring only authenticated users gain access.
- Security: Comprehensive measures, from sanitising user input to safeguarding against SQL injections and ensuring best practices with Helmet and CORS.
- Custom Middlewares: Efficient request and error handling using custom Express middlewares.
- Express Router: Modular and clean API routes for maintainability.
- TypeScript Integration: Usage of custom types and interfaces using TypeScript for better type safety and clean code.
- Database Operations: Interactions with MySQL, ensuring data integrity and protection against malicious attacks.
- Rate limiting.

👤 Architect's Note
------------------------
I (Ewan Stott) have laid the backend foundation of Blimp with the utmost diligence. The backend not only supports but enhances the frontend functionalities, ensuring users have a seamless and secure experience.

⭐ Blimp Web App ⭐
------------------------
✨ **Highlights:**
- Robust and scalable backend architecture using Node.js and Express.js with TypeScript.
- Comprehensive security measures, from token authentication to SQL injection prevention.
- Custom middlewares ensuring efficient request and error handling.
- Detailed API routes crafted with the Express Router, supporting all app functionalities.
- Solid testing framework using Vitest, ensuring reliability.

⚡ **Future Scope:**
- Session Authentication: Consider introducing session-based authentication for added security layers.
- ORM: Explore the integration of Object-Relational Mapping for more intuitive database operations.
- Integrations: Further third-party integrations for enhanced functionalities.
- OAuth: Implement OAuth for secure third-party data access.
- WebSockets Protocol: For real-time data handling and live chat functionalities.
- Proxy: Incorporate proxy handling for better routing and load balancing.
