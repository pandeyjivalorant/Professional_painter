# Complete Technical Documentation
## Professional Painter Portfolio

---

## 1. Project Overview

*   **Project Name**: Professional Painter Portfolio (Vasu Pande Fine Art)
*   **Purpose**: To serve as a high-end digital gallery and portfolio for a professional painter, showcasing original fine art, contemporary paintings, and mixed media works.
*   **Business Goal**: To elevate the artist's brand, provide a luxurious online viewing experience for collectors, and generate direct sales inquiries.
*   **Website Type**: Portfolio, Digital Gallery, and E-commerce Lead Generation.
*   **Main Features**:
    *   Dynamic masonry & grid galleries.
    *   Advanced filtering (by style, price, medium, availability).
    *   Immersive single-painting detail pages (Room previews, Zoom viewer, Story section).
    *   Dark/Light Mode Theme System.
    *   Direct inquiry system (WhatsApp integration).
    *   SEO-optimized dynamic metadata.
*   **Current Implementation Status**: The core user-facing frontend is fully implemented and integrated with a PostgreSQL database via Prisma. Advanced UI components and performance optimizations (lazy loading) are actively in place. The admin dashboard for CMS capabilities is planned for the next phase.

---

## 2. Complete Tech Stack

### Frontend
*   **Framework**: Next.js 15.1.0 (App Router). *Used for its hybrid rendering (Server Components for SEO and speed, Client Components for interactivity).*
*   **Language**: JavaScript / JSX.
*   **Styling**: Tailwind CSS (v3.4). *Used for rapid, utility-first styling combined with highly customized CSS variables for the theme.*
*   **UI Libraries**:
    *   `@headlessui/react`: *Used for accessible, unstyled interactive components like dialogs and transitions without fighting default styles.*
*   **Animation Libraries**:
    *   `framer-motion`: *Used for fluid, physics-based page transitions, scroll animations, and interactive micro-interactions.*
*   **Icons**: `lucide-react`. *Used for a consistent, lightweight, and modern SVG icon set.*
*   **Image Optimization**: Next.js `<Image>` component (`next/image`). *Used to automatically serve WebP/AVIF formats and prevent Cumulative Layout Shift (CLS).*
*   **Theme System**: `next-themes`. *Used to safely handle system preference detection and manual dark/light mode toggling without hydration mismatch.*
*   **Carousel / Sliders**: `swiper`. *Used for touch-friendly image carousels (e.g., Every Angle Gallery).*
*   **Lightbox**: `yet-another-react-lightbox`. *Used for the immersive, full-screen image zoom viewer.*
*   **Fonts**: Custom Google Fonts (`Cormorant Garamond`, `Cinzel`, `Inter`) injected via `next/font`. *Used to establish a premium, editorial aesthetic.*
*   **Responsive Strategy**: Mobile-first design using Tailwind's `sm:`, `md:`, `lg:` breakpoints, paired with CSS Grid/Flexbox and dynamic masonry columns.

### Backend
*   **Framework**: Next.js API Routes & Server Actions.
*   **Runtime**: Node.js.
*   **API Structure**: Currently heavily reliant on direct Prisma ORM queries within Server Components (`page.js`), bypassing traditional REST APIs for faster data hydration.
*   **Server Components**: Used extensively to fetch data on the server, keeping bundle sizes small and database secrets secure (e.g., `app/gallery/page.js`).
*   **Client Components**: Used only where interactivity is required (e.g., `GalleryClient.jsx`, `ThemeToggle.jsx`).
*   **Data Fetching Strategy**: Server-side fetching with Prisma.
*   **Folder Architecture**: App Router (`/app`), decoupled UI (`/components`), utility functions (`/lib`), and database config (`/prisma`).

### Database
*   **Database Provider**: PostgreSQL. *Selected for its robust relational data integrity, JSON support, and scalability.*
*   **ORM**: Prisma (`@prisma/client` 7.8.0). *Selected for its type-safe query builder, intuitive schema definition, and auto-generated migrations.*
*   **Relationships**: Standard 1-to-Many relationships (e.g., One Category has Many Paintings; One Painting has Many Images).
*   **Models**: `Category`, `Painting`, `PaintingImage`, `Certificate`, `Testimonial`, `ContactMessage`, `ADMIN`.

---

## 3. Authentication
*   **Current Authentication**: None. The public-facing portfolio does not require users to log in to view art.
*   **Planned Authentication**: An Admin Panel is planned, utilizing the `ADMIN` schema model. It will likely use NextAuth.js (Auth.js) or custom JWT sessions to secure CMS routes (`/admin/*`) allowing the artist to upload new paintings and read messages.
*   **Admin Security**: Passwords will be hashed (e.g., using bcrypt). Role-based access control (SUPER_ADMIN, ADMIN, EDITOR) is defined in the Prisma schema.

---

## 4. Deployment
*   **Hosting**: Designed for Vercel (optimal for Next.js).
*   **Environment Variables**: Uses `.env` for `DATABASE_URL` and `NEXT_PUBLIC_` variables.
*   **Build Process**: The `build` script runs `prisma generate` before `next build` to ensure the Prisma client is up-to-date with the schema.
*   **Production Workflow**: Git push to `main` branch automatically triggers Vercel CI/CD pipelines. Note: ESLint is configured with `ignoreDuringBuilds: true` to prevent legacy linting errors from blocking deployments.

---

## 5. Storage
*   **Images / Paintings**: Image URLs are stored as strings in the database. Currently, `next.config.js` is configured to allow `images.unsplash.com`. Production images are expected to be hosted on a CDN like Cloudinary, AWS S3, or Vercel Blob.
*   **Certificates**: Stored identically to paintings—image URLs referencing external bucket storage.

---

## 6. Theme System
The website utilizes a highly sophisticated CSS variable-based theme system combined with Tailwind CSS.

*   **Dark Mode (Default)**: Termed "Obsidian". Uses rich blacks (`#0B0B0B`), ivory text, and gold accents.
*   **Light Mode**: Termed "Warm White". Uses creamy off-whites, dark charcoal text, and muted gold.
*   **next-themes**: Wraps the application in `app/providers.jsx`, applying a `light` class or `[data-theme="light"]` attribute to the `<html>` tag.
*   **CSS Variables**: Defined in `app/globals.css`. Variables like `--obsidian-rgb`, `--gold-rgb`, and `--ivory-rgb` are redefined under the `.light` class.
*   **Tailwind Configuration**: `tailwind.config.js` maps Tailwind classes (e.g., `bg-obsidian`, `text-gold`) to the CSS RGB variables using `rgb(var(--color-rgb) / <alpha-value>)`, allowing for opacity support (`bg-obsidian/50`).
*   **Theme Persistence**: `next-themes` persists the user's choice in `localStorage` and prevents FOUC (Flash of Unstyled Content).

---

## 7. SEO (Search Engine Optimization)
*   **Metadata**: Next.js Metadata API is used natively. The `layout.js` defines base metadata.
*   **Dynamic SEO**: `app/painting/[id]/page.js` utilizes `generateMetadata({ params })` to dynamically fetch the painting from Prisma and set the exact `<title>`, description, and OpenGraph tags for that specific artwork.
*   **OpenGraph**: Dynamically uses the painting's main image as the OG Image for rich sharing on Twitter, iMessage, and WhatsApp.
*   **Performance**: Fast Server-Side Rendering (SSR) ensures web crawlers receive fully populated HTML without waiting for JavaScript execution.

---

## 8. Performance Optimizations
*   **Image Optimization**: All images use `<Image />` for lazy loading, WebP formatting, and automatic resizing.
*   **Lazy Loading / Dynamic Imports**: The `app/painting/[id]/page.js` heavily utilizes `next/dynamic` to lazy-load below-the-fold components (e.g., `StorySection`, `RoomPreviewSection`, `DimensionsSection`). This drastically reduces the initial JavaScript payload.
*   **Code Splitting**: Native to Next.js; pages only load the JS necessary for their specific route.
*   **Data Caching**: Next.js App Router aggressively caches server fetches where appropriate, utilizing `export const dynamic = 'force-dynamic'` only on pages requiring real-time DB data.

---

## 9. Folder Structure

```text
/
├── app/                  # Next.js App Router (Pages, Layouts, API)
│   ├── certificates/     # Certificates page
│   ├── contact/          # Contact page
│   ├── gallery/          # Main gallery listing page
│   ├── painting/[id]/    # Dynamic individual painting detail page
│   ├── globals.css       # Global CSS & CSS variables (Theme engine)
│   ├── layout.js         # Root layout (Navbar, Footer, Providers)
│   ├── page.js           # Home page (Server Component)
│   └── providers.jsx     # Context providers (next-themes)
├── components/           # Reusable UI Components
│   ├── gallery/          # Gallery specific components (GalleryClient)
│   ├── home/             # Homepage components
│   ├── painting/         # Components for the painting detail page
│   │   ├── Artist/       # Artist info sections
│   │   ├── Certificate/  # Certificate of authenticity display
│   │   ├── CTA/          # Call to Action sections
│   │   ├── Dimensions/   # Size & physical specs visualization
│   │   ├── Hero/         # Artwork hero / zoom viewer
│   │   ├── Inquiry/      # Inquiry forms & floating action bars
│   │   ├── RoomPreview/  # "View in room" mockups
│   │   ├── Shared/       # Typography, dividers, common UI
│   │   ├── Similar/      # Related artworks carousel
│   │   └── Story/        # Inspiration & background story
│   ├── Navbar.jsx        # Global navigation
│   ├── Footer.jsx        # Global footer
│   ├── UI.jsx            # Common UI elements (e.g., Artwork Cards)
│   └── ThemeToggle.jsx   # Dark/Light mode switcher
├── lib/                  # Utility functions
│   ├── prisma.js         # Singleton Prisma client instantiation
│   └── serializers.js    # Data serialization utilities (e.g., Prisma Decimal to Number)
├── prisma/               # Database Architecture
│   ├── migrations/       # SQL migrations
│   ├── schema.prisma     # Database schema definitions
│   └── seed.js           # Database seeding scripts
├── public/               # Static assets (fonts, local images, favicons)
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind configuration & token setup
└── package.json          # Dependencies and scripts
```

---

## 10. Important Components

### 1. `ArtworkProvider` (`components/painting/ArtworkContext.jsx`)
*   **Purpose**: To provide painting data globally to all sub-components on the painting detail page.
*   **Dependencies**: React Context.
*   **Flow**: Wraps the `[id]/page.js`. Prevents "prop drilling" so that deeply nested components like `ZoomViewer` or `StorySection` can instantly access the artwork data.

### 2. `GalleryClient` (`components/gallery/GalleryClient.jsx`)
*   **Purpose**: Renders the interactive grid of all artworks.
*   **Responsibilities**: Handles client-side filtering (price, category, availability), sorting, and rendering the masonry layout.
*   **Props**: `initialPaintings` (Array).
*   **Flow**: Receives serialized data from the Server Component `gallery/page.js` and applies React `useState` to filter the UI locally without requesting the server again.

### 3. `UI.jsx` (Artwork Cards)
*   **Purpose**: Shared card component for rendering a painting thumbnail, title, and formatted price.
*   **Dependencies**: `next/link`, `framer-motion`.
*   **Used Pages**: Homepage, Gallery, Similar Artworks.

### 4. `StickyInquiryCard` & `MobileInquiryBar`
*   **Purpose**: Lead generation.
*   **Responsibilities**: Provide a sticky/floating CTA to contact the artist via WhatsApp. Uses `window.location` or `<a href="wa.me/...">` to construct a pre-filled WhatsApp message.

---

## 11. Database Models (`schema.prisma`)

1.  **`Painting`**: Core model.
    *   *Fields*: `id`, `title`, `slug`, `description`, `price` (Decimal), `status` (Enum), `width`, `height`, `isPublished`, `categoryId`.
    *   *Relationships*: Belongs to a `Category`, has many `PaintingImages`.
2.  **`PaintingImage`**: Stores multiple angles/images for a single painting.
    *   *Fields*: `url`, `isMain`, `displayOrder`.
3.  **`Category`**: Groupings (e.g., "Abstract", "Portraits").
4.  **`Certificate`**: Authenticity documents.
5.  **`Testimonial`**: Client reviews.
6.  **`ContactMessage`**: Stores submitted contact forms.
7.  **`ADMIN`**: Stores administrator credentials.

---

## 12. Website Flow (User Journey)

1.  **Landing Page (`/`)**: High-impact hero section, featured works, artist intro.
2.  **Gallery (`/gallery`)**: User browses all art. They can filter by "Available Only" or adjust the price slider.
3.  **Painting Detail (`/painting/[id]`)**: User clicks an artwork. They are presented with a massive hero image, storytelling, a room preview showing the art on a wall, physical dimensions, and a certificate preview.
4.  **Inquiry**: If the art is "AVAILABLE", the user clicks "Inquire" triggering a direct WhatsApp chat pre-filled with the painting's name.
5.  **Contact (`/contact`)**: General inquiries form.
6.  **Certificates (`/certificates`)**: Verification portal for buyers.

---

## 13. State Management

*   **React Context**: Used specifically via `ArtworkProvider` to broadcast data on the complex Detail page.
*   **Hooks (`useState`, `useMemo`)**: Used in `GalleryClient` for filtering.
*   **Theme Context**: Handled by `next-themes` (`useTheme`).
*   **Server State**: Next.js App Router (Server Components) manages DB state, passing plain JSON down to client components.

---

## 14. Styling Architecture

*   **Global CSS (`globals.css`)**: Defines custom utility classes like `.glass`, `.gold-text`, `.hover-lift`, and typography overrides.
*   **Tailwind Config**: Maps standard Tailwind classes to CSS variables. e.g., `text-gold` translates to `color: var(--gold)`.
*   **Color Tokens**: Obsidian (Black), Ivory (White), Gold (Primary Accent), Slate (Secondary Backgrounds).
*   **Typography**: `Cormorant Garamond` for headings (classic, elegant). `Cinzel` for navigation/buttons (statuesque). `Inter` for body text (highly readable).

---

## 15. Packages Analysis

| Package | Version | Purpose | Can it be removed? |
| :--- | :--- | :--- | :--- |
| `next` | 15.1.0 | Core React framework. | **No** |
| `@prisma/client` | 7.8.0 | Database communication. | **No** |
| `tailwindcss` | 3.4.19 | Styling engine. | **No** |
| `framer-motion` | 12.40.0 | Complex animations. | No (Core to UX) |
| `next-themes` | 0.4.6 | Dark/Light mode engine. | No |
| `lucide-react` | 1.17.0 | Icon library. | No |
| `swiper` | 14.0.1 | Touch-friendly carousels. | Could be replaced with native CSS scroll-snap, but Swiper provides better JS controls. |
| `yet-another-react-lightbox`| 3.32.0 | Fullscreen image zooming. | No (Saves significant dev time). |

---

## 16. Security

*   **Database**: Prisma utilizes prepared statements natively, preventing SQL Injection.
*   **Validation**: Server-side validation for form submissions is required (Implementation currently pending Zod integration).
*   **Environment Variables**: Database credentials and sensitive keys are stored in `.env` and NEVER prefixed with `NEXT_PUBLIC_`.
*   **Cross-Site Scripting (XSS)**: React natively escapes HTML to prevent XSS attacks.

---

## 17. Problems Found & Recommendations

### Code Smells & Opportunities
1.  **ESLint Disabled**: `next.config.js` has `ignoreDuringBuilds: true`. **Recommendation**: Fix underlying linting errors and enforce strict ESLint rules to prevent future bugs.
2.  **Hardcoded Data**: WhatsApp numbers are hardcoded in `MobileInquiryBar` and `UI.jsx`. **Recommendation**: Move contact numbers to `.env` or fetch from a database `Settings` table.
3.  **Missing Input Validation**: There is currently no robust input validation library. **Recommendation**: Implement `zod` for validating contact forms and admin routes.
4.  **Database Seeding**: The `seed.js` script handles initialization, but it's crucial to ensure it doesn't accidentally run in production and wipe data.
5.  **Image Hosting**: Currently relying on local URLs or Unsplash. **Recommendation**: Implement an AWS S3 or Cloudinary integration before going to production, utilizing Next.js `next/image` loaders.

---

## 18. Learning Section (For Junior Developers)

*   **What is Next.js App Router?** It’s a framework built on top of React. Unlike older React apps where everything loaded in the browser, Next.js renders the HTML on the server first. This makes the website lightning-fast and allows Google to read the content easily (SEO).
*   **What is a Server Component?** Notice how `app/page.js` is `async` and does not have `useState`? It runs on the backend server, talks directly to the database (Prisma), and sends only the finished HTML to the browser.
*   **What is Prisma?** Instead of writing raw SQL (`SELECT * FROM Painting`), Prisma lets us write JavaScript (`prisma.painting.findMany()`). It's safer and gives us autocomplete in our code editor.
*   **What are CSS Variables?** In `globals.css`, we define `--gold-rgb: 201 162 39`. If the user clicks "Light Mode", we change that variable to `--gold-rgb: 155 125 46`. Because Tailwind is hooked up to these variables, the entire website changes color instantly without needing to write new classes.
*   **Why `serializePainting`?** Server Components pass data to Client Components through a hidden network boundary. You can only pass standard JSON (Strings, Numbers, Arrays). Prisma returns prices as special `Decimal` objects. We use the `lib/serializers.js` file to convert those `Decimal` objects into plain `Number` types so the website doesn't crash!
