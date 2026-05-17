# 💒 Invitation Uzatu - Samal Wedding Invitation

A beautiful, bilingual (Kazakh/Russian) wedding invitation website built with Next.js 14, featuring a pixel-perfect design transfer from HTML reference.

## 🌟 Features

- **🌍 Dual Language**: Seamless switching between Kazakh (қазақша) and Russian (русский)
- **📝 RSVP System**: Complete guest management with Google Sheets integration
- **🎵 Background Music**: Auto-playing ambient music with user controls
- **⏰ Live Countdown**: Real-time countdown to the wedding ceremony
- **👥 Admin Panel**: Secure admin interface for managing guest responses
- **📱 Responsive Design**: Mobile-first design with desktop paper-card effect
- **🎨 Authentic Design**: Pixel-perfect recreation of traditional wedding invitation aesthetics

## 🎨 Design Elements

### Color Palette
```css
--bg: #FDF8F5        /* Warm cream background */
--card: #FFFFFF      /* Pure white cards */
--text: #3D2A1E      /* Deep brown text */
--sub: #9A7060       /* Warm gray subtext */
--accent: #F3C3B2    /* Soft peach accent */
--accent2: #C9A46A   /* Golden accent */
--countdown: #FDE8D3 /* Light peach countdown */
```

### Typography
- **Headers**: Cormorant Garamond (elegant serif)
- **Body Text**: Jost (modern sans-serif)
- **Sizes**: Responsive clamp() functions for perfect scaling

### Components
- **FloralDivider**: Botanical ornamental dividers
- **OrnekDivider**: Traditional Kazakh geometric patterns (өрнек)
- **Hero Section**: Complex SVG gradients with blur effects
- **Mini Calendar**: Interactive August 2026 calendar
- **RSVP Form**: Multi-step form with guest count management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- MongoDB database (Atlas or local instance)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/whtvrr/invitationUzatu.git
cd invitationUzatu
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Admin Configuration
ADMIN_PASSWORD=your-secure-admin-password

# Optional
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

4. **Add background music (optional)**
```bash
# Place your music file in the public directory
cp your-music.mp3 public/music.mp3
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the invitation.

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── rsvp/         # RSVP submission endpoint
│   │   └── submissions/   # Admin data endpoint
│   ├── globals.css       # Global styles & CSS variables
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main invitation page
├── components/            # React components
│   ├── AdminPanel.tsx    # Admin interface
│   ├── CountdownSection.tsx
│   ├── DateSection.tsx   # Interactive calendar
│   ├── FloralDivider.tsx # Botanical ornaments
│   ├── HeroSection.tsx   # Main hero with SVG backgrounds
│   ├── HostsSection.tsx
│   ├── InviteSection.tsx
│   ├── LanguageToggle.tsx
│   ├── MusicPlayer.tsx
│   ├── OrnekDivider.tsx  # Kazakh patterns
│   ├── ProgramSection.tsx
│   ├── RSVPSection.tsx   # RSVP form
│   └── VenueSection.tsx
├── hooks/
│   └── useLang.ts        # Language switching logic
└── lib/
    ├── i18n.ts           # Translation strings
    └── schemas.ts        # Zod validation schemas
```

## 🔧 Configuration

### MongoDB Setup

1. **Create MongoDB Atlas Account** (or use local MongoDB)
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Create a database user with read/write permissions

2. **Get Connection String**
   - Copy your MongoDB connection string
   - Replace `<password>` and `<username>` with your credentials
   - Add your database name to the URI

3. **Database Schema**
   The RSVP collection will automatically be created with this structure:
   ```javascript
   {
     timestamp: Date,
     name: String,
     attendance: String, // 'come', 'with', 'no'
     guestsCount: Number,
     guestNames: [String],
     phone: String,
     language: String, // 'kk', 'ru'
     userAgent: String,
     ip: String,
     createdAt: Date,
     updatedAt: Date
   }
   ```

### Admin Panel Access
- **Keyboard Shortcut**: `Ctrl + Shift + S` (or `Cmd + Shift + S` on Mac)
- **Password**: Set in `ADMIN_PASSWORD` environment variable

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm run build
npx vercel --prod
```

### Environment Variables for Production
Make sure to set all environment variables in your deployment platform.

## 🎵 Music Integration

Place your background music file as `public/music.mp3`. The player will:
- Auto-detect the file presence
- Respect browser autoplay policies
- Provide user controls for mute/unmute
- Remember user preference in localStorage

## 🌍 Internationalization

The app supports:
- **Kazakh (қазақша)**: Default language
- **Russian (русский)**: Secondary language

All text content is stored in `src/lib/i18n.ts` and can be easily extended for additional languages.

## 📅 Wedding Details

- **Date**: August 23, 2026
- **Time**: 16:30 (Asia/Aqtobe timezone)
- **Venue**: Prestige Palace, Aktobe
- **Type**: Қыз ұзату (Traditional Kazakh farewell ceremony)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Design**: Based on traditional Kazakh wedding invitation aesthetics
- **Typography**: Google Fonts (Cormorant Garamond, Jost)
- **Icons**: Custom SVG illustrations
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system

---

**Built with ❤️ for Samal's special day**

*Co-authored by Claude Sonnet 4*
