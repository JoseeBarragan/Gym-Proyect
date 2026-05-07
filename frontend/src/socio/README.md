# Socio Feature Implementation

## Backend API Analysis

### Endpoints Discovered:

#### CLASES (Classes)
- **GET /Clase** - Get all classes (Roles: Administrador, Instructor)
- **GET /Clase/:id** - Get class by ID

#### RESERVAS (Reservations)
- **POST /reservations** - Create reservation (Roles: Socio)
  - Body: `{ idUsuario: string, idClase: string, fechaReserva: Date }`
- **DELETE /reservations/:id** - Cancel reservation (Roles: Socio)
- **GET /reservations/:id** - Get user reservations (Roles: Socio)
- **GET /reservations/clase/:idClase** - Get class reservations (Roles: Administrador, Instructor)

#### MEMBRESÍAS (Memberships)
- **GET /typeMembership** - Get all membership types
- **POST /membership/asign** - Assign membership (Roles: Socio)
  - Body: `{ idSocio: string, idTipoMembresia: string }`

#### PAGOS (Payments)
- **POST /payment/createPayment** - Create Stripe payment session
  - Body: `{ idSocio: string, idTipoMembresia: string }`
  - Returns: `{ url: string }` - Stripe checkout URL
- **GET /payment/success** - Payment success callback (Public)
- **GET /payment/cancel** - Payment cancel callback (Public)

## Implementation

### Files Created:

1. **`/socio/api/socioApi.ts`** - API configuration and fetch functions
2. **`/socio/features/useSocio.ts`** - React Query hooks for all socio operations
3. **`/socio/layout/SocioLayout.tsx`** - Socio area layout with sidebar navigation
4. **`/socio/pages/ClasesPage.tsx`** - Class listing and reservation with confirmation modal
5. **`/socio/pages/ReservasPage.tsx`** - User's reservations list with cancel functionality
6. **`/socio/pages/MembresiasPage.tsx`** - Membership types with Stripe payment integration

### Features Implemented:

#### 1. Class Listing & Reservation ✅
- Shows all available classes from backend
- Displays: name, instructor, schedule, duration, capacity
- Confirmation modal before reserving
- Success/error feedback with toast notifications
- Visual feedback for already reserved classes

#### 2. My Reservations ✅
- Lists user's reservations with status
- Shows: class name, date, reservation status
- Cancel reservation with confirmation modal
- Color-coded status badges (Reserved/Attended/Cancelled)

#### 3. Membership Payment ✅
- Display membership types from backend
- Shows: name, description, price, duration
- Two payment options:
  - **Stripe**: Redirects to Stripe checkout
  - **Direct**: Direct assignment without payment
- Confirmation modal before payment

### Design Features:
- Dark theme (#0a0a0a base, #111111 cards)
- Electric blue (#3b82f6) accent color
- Glassmorphism effects with backdrop blur
- Mobile-first responsive design
- Smooth transitions and animations
- Loading states and error handling

### Auth Integration:
- Uses existing JWT token from localStorage
- Protected routes with ProtectedRoute component
- User ID extracted from JWT token
- Role-based access control (Socio role required)

## Usage

Routes are under `/socio`:
- `/socio` - Classes page (default)
- `/socio/reservas` - My reservations
- `/socio/membresias` - Memberships

All routes require Socio role authentication.
