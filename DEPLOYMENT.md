# Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure random string
     - `NEXTAUTH_SECRET`: Another secure random string
     - `NEXTAUTH_URL`: Your deployment URL

3. **MongoDB Setup**
   - Create a free MongoDB Atlas cluster
   - Get your connection string
   - Add it to Vercel environment variables

### Option 2: Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   - Add the same environment variables as Vercel

### Option 3: Railway

1. **Connect Repository**
   - Link your GitHub repository
   - Railway will auto-detect Next.js

2. **Add MongoDB**
   - Add MongoDB plugin in Railway
   - Use the provided connection string

## 🗄️ Database Setup

### MongoDB Atlas (Cloud)

1. **Create Account**
   - Sign up at [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create a free cluster

2. **Configure Access**
   - Add your IP address to whitelist
   - Create a database user
   - Get connection string

3. **Connection String Format**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/cse-learning-platform?retryWrites=true&w=majority
   ```

### Local MongoDB

1. **Install MongoDB**
   ```bash
   # macOS
   brew install mongodb-community
   
   # Ubuntu
   sudo apt-get install mongodb
   
   # Windows
   # Download from mongodb.com
   ```

2. **Start MongoDB**
   ```bash
   mongod
   ```

3. **Connection String**
   ```
   mongodb://localhost:27017/cse-learning-platform
   ```

## 🌱 Seeding Initial Data

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

3. **Run Seed Script**
   ```bash
   npm run seed
   ```

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/cse-learning-platform

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000

# Optional: For production
NODE_ENV=production
```

## 🏗️ Build and Run

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use strong, unique secrets for JWT

2. **Database Security**
   - Use MongoDB Atlas with IP whitelisting
   - Create dedicated database users with minimal permissions

3. **HTTPS**
   - Always use HTTPS in production
   - Vercel provides HTTPS automatically

## 🚀 Performance Optimization

1. **Next.js Features Used**
   - App Router for better performance
   - Automatic code splitting
   - Image optimization
   - Static generation where possible

2. **Database Optimization**
   - Indexed fields for faster queries
   - Pagination for large datasets
   - Connection pooling with Mongoose

## 📊 Monitoring and Analytics

### Vercel Analytics
- Enable Vercel Analytics in your dashboard
- Monitor page views and performance

### Error Tracking
- Consider adding Sentry for error tracking
- Monitor API response times

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: vercel/action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check connection string format
   - Verify IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

2. **Build Errors**
   - Clear `.next` folder and rebuild
   - Check for TypeScript errors
   - Verify all dependencies are installed

3. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure NEXTAUTH_URL matches deployment URL

### Debug Mode
```bash
DEBUG=* npm run dev
```

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check the GitHub repository for updates

## 🎉 Success!

Your CSE Learning Platform should now be live and accessible to students worldwide!

Visit your deployment URL and start learning! 🚀


🔐 Admin Login Credentials:
Email: admin@cselearn.com
Password: admin123456

🌐 Login URL: http://localhost:3000/auth/login
📊 Admin Dashboard: http://localhost:3000/admin