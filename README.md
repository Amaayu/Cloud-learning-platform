# CSE Learning Platform

A comprehensive cloud-based learning platform for B.Tech Computer Science Engineering students, built with Next.js, MongoDB, and modern web technologies.

## 🚀 Features

### 👥 User Roles

**🧑‍🎓 Normal User**

- Register/Login with email and password
- Browse coding subjects (DSA, DBMS, OS, CN, Web Dev, AI/ML)
- Explore subject → unit → topic hierarchy
- Read theory, examples, and demo code
- Copy code with syntax highlighting
- Bookmark favorite topics
- Mark topics/units as completed
- Track learning progress
- Attempt unit-wise quizzes
- Dark/Light mode toggle

**🧑‍💼 Admin**

- Full Admin Dashboard
- CRUD operations for subjects, units, topics, and quizzes
- User management and analytics
- Content management with rich text and code examples
- Progress tracking and reporting

### 🎨 UI/UX Features

- Modern, responsive design with Tailwind CSS
- Dark/Light mode with system preference detection
- Smooth animations with Framer Motion
- Syntax-highlighted code blocks with copy functionality
- Progress bars and completion tracking
- Professional dashboard layouts

### 🛠️ Technical Features

- Next.js 14 with App Router
- MongoDB with Mongoose ODM
- JWT-based authentication
- TypeScript for type safety
- Responsive design for all devices
- SEO optimized

## 📦 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database**: MongoDB with Mongoose
- **Authentication**: Custom JWT implementation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Syntax Highlighting**: React Syntax Highlighter
- **Theme**: Next Themes for dark/light mode

## 🏗️ Project Structure

```
cse-learning-platform/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── subjects/          # Subject pages
│   │   ├── admin/             # Admin dashboard
│   │   └── profile/           # User profile
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   ├── navbar.tsx        # Navigation component
│   │   └── code-block.tsx    # Code syntax highlighter
│   ├── lib/                   # Utility libraries
│   │   ├── db.ts             # Database connection
│   │   ├── auth.ts           # Authentication utilities
│   │   └── utils.ts          # General utilities
│   ├── models/               # MongoDB models
│   │   ├── User.ts
│   │   ├── Subject.ts
│   │   ├── Unit.ts
│   │   ├── Topic.ts
│   │   └── Quiz.ts
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cse-learning-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/cse-learning-platform
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NEXTAUTH_SECRET=your-nextauth-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use a cloud instance like MongoDB Atlas.

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### First Time Setup

1. **Create an Admin User**

   - Register a new account through the signup page
   - Manually update the user's role to 'admin' in the MongoDB database
   - Or modify the signup API to create the first user as admin

2. **Add Sample Content**
   - Use the admin dashboard to add subjects, units, and topics
   - Or import sample data through the MongoDB interface

## 📚 Usage

### For Students

1. **Sign up** for a new account or **login** with existing credentials
2. **Browse subjects** from the home page or subjects page
3. **Select a subject** to view its units
4. **Choose a unit** to see available topics
5. **Read topics** with theory, examples, and code snippets
6. **Bookmark** important topics for later reference
7. **Mark topics as completed** to track your progress
8. **Take quizzes** to test your understanding

### For Administrators

1. **Login** with admin credentials
2. **Access the admin dashboard** from the navigation menu
3. **Manage content** using the CRUD interfaces
4. **Monitor user progress** and platform analytics
5. **Add new subjects, units, topics, and quizzes**

## 🎯 Key Features Implemented

### ✅ Authentication System

- User registration and login
- JWT-based session management
- Role-based access control (User/Admin)
- Protected routes and API endpoints

### ✅ Content Management

- Hierarchical content structure (Subject → Unit → Topic)
- Rich text content with markdown support
- Code examples with syntax highlighting
- Copy-to-clipboard functionality

### ✅ Progress Tracking

- Topic completion tracking
- Unit progress calculation
- Subject-wise progress overview
- Bookmark system for favorite topics

### ✅ User Interface

- Responsive design for all screen sizes
- Dark/Light mode with persistence
- Smooth animations and transitions
- Professional dashboard layouts
- Search and filter functionality

### ✅ Admin Dashboard

- Content CRUD operations
- User management interface
- Analytics and reporting
- Quick action shortcuts

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Content

1. **Subjects**: Use the admin dashboard or directly add to MongoDB
2. **Units**: Create units within subjects with proper ordering
3. **Topics**: Add topics with content, examples, and code snippets
4. **Quizzes**: Create multiple-choice quizzes for each unit

### Customization

- **Styling**: Modify Tailwind classes in components
- **Theme**: Update CSS variables in `globals.css`
- **Content Structure**: Modify MongoDB models as needed
- **Authentication**: Extend JWT implementation or integrate OAuth

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

- **Netlify**: Configure build settings and environment variables
- **Railway**: Connect MongoDB and set environment variables
- **Heroku**: Add MongoDB addon and configure environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Shadcn/UI for the beautiful component library
- MongoDB for the flexible database solution
- All the open-source contributors who made this project possible

## 📞 Support

For support, email support@cselearn.com or join our Discord community.

---

**Happy Learning! 🎓**
