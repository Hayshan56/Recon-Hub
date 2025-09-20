# ReconHub - Open-Source Recon for Everyone

<div align="center">
  <img src="src/assets/reconhub-logo.png" alt="ReconHub Logo" width="120" height="120">
  
  <h3>Free, open-source reconnaissance platform for bug bounty hunters and cybersecurity students</h3>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178c6.svg)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Latest-38bdf8.svg)](https://tailwindcss.com/)
</div>

## 🎯 Features

- **Lightning Fast Subdomain Discovery** - Leverage multiple data sources including SecurityTrails and AlienVault OTX
- **Real-time Status Checking** - Instantly check HTTP status codes for discovered subdomains
- **Export to CSV** - Download your reconnaissance results for further analysis
- **Open Source Security** - Fully transparent codebase hosted on GitHub
- **No Installation Required** - Web-based platform accessible from anywhere
- **Beautiful Modern UI** - Premium SaaS-style interface with glassmorphism and smooth animations

## 🚀 Live Demo

Visit [ReconHub](https://yourdeployedurl.com) to try it out!

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **TailwindCSS** for beautiful, responsive styling
- **Framer Motion** for smooth animations
- **Shadcn/UI** for accessible component library
- **Vite** for lightning-fast development

### Backend (Separate Repository)
- **FastAPI** (Python) providing `/scan` endpoint
- **SecurityTrails API** for comprehensive subdomain data
- **AlienVault OTX API** for additional reconnaissance data

## 📦 Installation & Development

### Prerequisites
- Node.js 18+ and npm
- Git

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/reconhub.git
cd reconhub

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Design System

ReconHub features a premium SaaS-style design with:

- **Color Palette**: Purple and cyan gradients with dark theme
- **Typography**: Clean, modern fonts with gradient text effects
- **Components**: Glassmorphic cards with backdrop blur effects
- **Animations**: Smooth Framer Motion transitions and micro-interactions
- **Responsive**: Mobile-first design that works on all devices

## 🔧 Configuration

The application uses environment variables for API configuration:

```env
# API Configuration (Backend)
SECURITY_TRAILS_API_KEY=your_api_key_here
ALIEN_VAULT_API_KEY=your_api_key_here
```

## 📊 API Documentation

### Scan Endpoint
```
POST /api/scan
Content-Type: application/json

{
  "domain": "example.com"
}
```

**Response:**
```json
{
  "domain": "example.com",
  "subdomains": [
    {
      "subdomain": "www.example.com",
      "status": 200,
      "statusText": "OK"
    },
    {
      "subdomain": "api.example.com", 
      "status": 200,
      "statusText": "OK"
    }
  ],
  "total": 2,
  "scan_time": "2024-01-15T10:30:00Z"
}
```

## 🚀 Deployment

### Frontend (Render Static Site)

1. Connect your GitHub repository to Render
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Backend (Render Web Service)

1. Create a new Web Service on Render
2. Connect your backend repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables for API keys
6. Deploy!

## 🤝 Contributing

ReconHub is open-source and welcomes contributions from the cybersecurity community!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Areas
- 🐛 Bug fixes and improvements
- ✨ New reconnaissance features
- 📚 Documentation enhancements
- 🎨 UI/UX improvements
- 🔒 Security enhancements

## 👨‍💻 About the Creator

ReconHub is built by **Hayshan Kannan**, a 14-year-old cybersecurity enthusiast from Malaysia:

- 🏆 **#3 Ranking** in Malaysia's cybersecurity community
- 📚 **100+ Labs Completed** in hands-on cybersecurity training
- 🔓 **2+ Years** of experience in ethical hacking and bug bounty hunting
- 🌟 **Open Source Advocate** committed to democratizing cybersecurity tools

### Connect with the Creator
- **LinkedIn**: [Hayshan Kannan](https://www.linkedin.com/in/hayshan-kannan-ab00b0354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- **GitHub**: [View Profile](https://github.com/yourusername)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SecurityTrails** and **AlienVault OTX** for providing powerful APIs
- **Shadcn/UI** for the beautiful component library
- **Framer Motion** for smooth animations
- **The cybersecurity community** for inspiration and support

## 📞 Support

- 🐛 **Bug Reports**: [Create an Issue](https://github.com/yourusername/reconhub/issues)
- 💡 **Feature Requests**: [Discussions](https://github.com/yourusername/reconhub/discussions)
- 📧 **Email**: hayshan@example.com

---

<div align="center">
  <p>⭐ If you find ReconHub useful, please consider giving it a star! ⭐</p>
  <p>Built with ❤️ for the cybersecurity community</p>
</div>