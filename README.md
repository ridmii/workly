# Workly Workshop Management (Frontend)

Welcome to Workly, a frontend-only web application designed for managing workshops and user feedback. This project provides a responsive, theme-switchable interface where users can register for workshops, submit feedback with ratings, and view their personalized dashboard. Built as a standalone client-side application, it relies on static data and does not include a backend or persistent storage—data resets on page refresh.

## Features
- **Workshop Registration**: Register and unregister for workshops using a simple interface.
- **Feedback System**: Submit feedback with 1-5 star ratings and comments for attended workshops.
- **Personalized Dashboard**: View registered workshops and submitted feedback, filtered to the current user.
- **Theme Support**: Switch between light and dark themes using a theme context.
- **Animations**: Smooth transitions and effects with Framer Motion.
- **Responsive Design**: Optimized for desktop and mobile views with Tailwind CSS.

## Prerequisites
- **Node.js**: Version 14.x or later (download from [nodejs.org](https://nodejs.org/))
- **npm**: Included with Node.js
- **Web Browser**: A modern browser like Chrome, Firefox, or Edge

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ridmii/workly.git
   cd workly
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Prepare Data Files**:
   - Place a data/workshops.json file in the data/ directory with workshop data in this format:
     
   ```bash
   [
   {
    "id": 1,
    "title": "Modern Web Development with React",
    "description": "Explore best practices in building scalable React applications with modern tools and workflows.",
    "date": "2024-08-12",
    "location": "Colombo",
    "category": "Technology",
    "tags": ["React", "JavaScript"],
    "organizers": ["Isuru Perera", "Malsha Weerakoon"],
    "image": "/assets/react.jpg"
   }
   // Add more workshops as needed
   ]
   ```
   - Note: Feedback is transient and not loaded from a file; it resets on refresh.
  
  4. **Start the Development Server**:
     ```bash
     npm run dev
     ```
     **Open http://localhost:5173 in your browser to view the app**. Navigate to the Home page to start exploring workshops.

  ## Usage
 
  - Home Page: Visit the root URL (/) to browse available workshops and navigate to their details.
  - Workshop Details Page: Click a workshop from the Home page to register, unregister, or leave feedback with a rating (1-5 stars) and comment. 
  - Dashboard: Navigate to /dashboard to see your registered workshops and feedback. Only the current user's feedback (identified as "CurrentUser") is displayed with stars and comments.
  - Theme Switching: Toggle themes via the ThemeContext (implementation assumed to be in place—reviewers can inspect src/context/ThemeContext.jsx).
  - Data Behavior: Feedback and registrations are lost on page refresh since this is a frontend-only app with no persistence.

  ## Project Structure
  ```bash
    workly-workshop/
├── public/                # Static files
│   ├── assets/            # Images used in the app (e.g., leadership.jpg)
│   └── data/              # JSON data files
│       ├── feedbacks.json # Feedbacks for courses from other users 
│       └── workshops.json # Workshop data
├── src/
│   ├── components/        # Reusable components (e.g., Footer, ErrorBoundary)
│   ├── context/           # Context files (e.g., WorkshopContext, ThemeContext)
│   ├── pages/             # Page components (e.g., Dashboard, WorkshopDetails, Home)
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── vercel.json            # Vercel configuration for SPA routing
├── package.json           # Project dependencies and scripts
└── README.md              # This file

  ```

## Technologies Used
- React: For building the dynamic user interface.
- React Router: For client-side navigation.
- Tailwind CSS: For utility-first styling and responsive design.
- Framer Motion: For animations and transitions.
- Vite: For fast development and bundling.

## Limitations 
- Frontend-Only: No backend or API integration; data is static or transient.
- No Persistence: Feedback and registrations reset on page refresh.
- Mock User: Uses a hardcoded "User" with email "user@example.com".
- Static Data: Relies on workshops.json for workshop data; no dynamic updates.

## Contributing
This project was created as part of my internship selection process and is intended as a personal portfolio piece for evaluation. As such, it is not currently open for external contributions. However, I welcome feedback from reviewers! Please open an issue on the [GitHub repository](https://github.com/ridmii/workly/issues) with suggestions, questions, or comments to help me improve. Thank you for reviewing my work!

## License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as per the license terms. (Add a LICENSE file if not already present.)

## Acknowledgments
- Grateful to the open-source communities of React, Tailwind CSS, and Framer Motion for their tools.
- Thanks to Vercel for providing a seamless deployment platform.

## Contact
For questions or feedback, please open an issue on the [GitHub repository](https://github.com/ridmii/workly/issues) or contact me at heyridmi@gmail.com.

## Review Notes for GitHub Reviewers
- Scope: This is a frontend-only demo showcasing React, context management, and styling, with a deployed version on Vercel. It’s designed for learning and portfolio purposes as part of my internship selection process, featuring a Home page.
- Testing: Start at the deployed URL (e.g., https://workly.vercel.app/) or locally at http://localhost:5173. Ensure public/data/workshops.json and public/assets/ images are present. Test navigation to /dashboard and /workshop/1.
- Code Quality: Review src/pages/Home.jsx for the workshop listing, src/pages/Dashboard.jsx for feedback logic, and src/context/WorkshopContext.jsx for data management. Check vercel.json for routing configuration.
- Improvements: Suggestions for adding persistence (e.g., localStorage), a backend integration, or enhancing the Home page UI are welcome!


     
   
  
