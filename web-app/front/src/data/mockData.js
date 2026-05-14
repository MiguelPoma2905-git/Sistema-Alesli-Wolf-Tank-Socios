// ─── FLOWERS ─────────────────────────────────────────────────────────────────
export const flowers = [
  { id: 1,  name: 'Rosones rosados premium',    price: 45, img: '🌸', cat: 'Rosas',     rating: 4.8, reviews: 38, stock: true },
  { id: 2,  name: 'Rosas rojas pasión',          price: 55, img: '🌹', cat: 'Rosas',     rating: 4.9, reviews: 52, stock: true },
  { id: 3,  name: 'Rosas blancas pureza',        price: 42, img: '🤍', cat: 'Rosas',     rating: 4.7, reviews: 21, stock: true },
  { id: 4,  name: 'Tulipanes multicolor',        price: 38, img: '🌷', cat: 'Tulipanes', rating: 4.6, reviews: 17, stock: true },
  { id: 5,  name: 'Tulipanes rosas delicados',   price: 35, img: '🌷', cat: 'Tulipanes', rating: 4.5, reviews: 14, stock: false },
  { id: 6,  name: 'Girasoles alegres',           price: 32, img: '🌻', cat: 'Girasoles', rating: 4.8, reviews: 29, stock: true },
  { id: 7,  name: 'Girasoles campo grande',      price: 28, img: '🌻', cat: 'Girasoles', rating: 4.7, reviews: 18, stock: true },
  { id: 8,  name: 'Orquídeas blancas',           price: 65, img: '🌺', cat: 'Orquídeas', rating: 4.9, reviews: 41, stock: true },
  { id: 9,  name: 'Orquídeas lilas',             price: 70, img: '💜', cat: 'Orquídeas', rating: 4.8, reviews: 33, stock: true },
  { id: 10, name: 'Lirios blancos puros',        price: 42, img: '🌼', cat: 'Lirios',    rating: 4.6, reviews: 22, stock: true },
  { id: 11, name: 'Ramo mixto primavera',        price: 48, img: '💐', cat: 'Mixtos',    rating: 4.7, reviews: 45, stock: true },
  { id: 12, name: 'Bouquet romántico deluxe',    price: 75, img: '💐', cat: 'Mixtos',    rating: 5.0, reviews: 67, stock: true },
  { id: 13, name: 'Girasoles del Sol Naciente',  price: 30, img: '🌻', cat: 'Girasoles', rating: 4.9, reviews: 12, stock: true },
  { id: 14, name: 'Ramo Aurora Boreal',          price: 55, img: '💐', cat: 'Mixtos',    rating: 4.8, reviews: 5,  stock: true },
]

// ─── GIFTS ───────────────────────────────────────────────────────────────────
export const gifts = [
  { id: 101, name: 'Caja romántica rosa',      price: 75,  oldPrice: 95,  img: '🎁', desc: 'Rosas + chocolates + tarjeta personalizada' },
  { id: 102, name: 'Combo flores + peluche',   price: 65,                 img: '🐻', desc: 'Ramo de 12 rosas con peluche mediano'        },
  { id: 103, name: 'Desayuno sorpresa',        price: 85,                 img: '🎂', desc: 'Flores + chocolates + globo de cumpleaños'   },
  { id: 104, name: 'Ramo + caja de chocolates',price: 90,  oldPrice: 110, img: '💝', desc: 'Ramo mixto + caja de bombones artesanales'   },
  { id: 105, name: 'Kit aniversario deluxe',    price: 120,               img: '🌹', desc: 'Rosas rojas + champagne + tarjeta'           },
  { id: 106, name: 'Sorpresa de cumpleaños',    price: 70,                img: '🎉', desc: 'Flores de temporada + globo + dulces'        },
]

// ─── PELUCHES ────────────────────────────────────────────────────────────────
export const peluches = [
  { id: 201, name: 'Osito de amor',        price: 25, size: 'Mediano', color: 'Café',      img: '🐻' },
  { id: 202, name: 'Conejo blanco',        price: 18, size: 'Pequeño', color: 'Blanco',    img: '🐰' },
  { id: 203, name: 'Oso gigante corazón',  price: 55, size: 'Gigante', color: 'Rosa',      img: '🧸' },
  { id: 204, name: 'Perrito adorable',     price: 28, size: 'Mediano', color: 'Beige',     img: '🐶' },
  { id: 205, name: 'Oso premium café',     price: 40, size: 'Grande',  color: 'Marrón',    img: '🐻' },
  { id: 206, name: 'Unicornio mágico',     price: 32, size: 'Mediano', color: 'Arcoíris',  img: '🦄' },
]

// ─── CHOCOLATES (Tus datos originales adaptados con categorías para que funcione el filtro)
export const chocolates = [
  { id: 301, name: 'Caja de bombones belgas',  price: 35, desc: '24 piezas',   cat: 'Bombones', img: '🍫' },
  { id: 302, name: 'Trufas de chocolate oscuro',price: 28, desc: '12 trufas',  cat: 'Trufas',   img: '🍫' },
  { id: 303, name: 'Caja premium corazón',     price: 55, desc: '36 piezas',   cat: 'Caja premium', img: '❤️' },
  { id: 304, name: 'Tableta artesanal rosa',   price: 22, desc: '100g',        cat: 'Artesanal', img: '🎀' },
  { id: 305, name: 'Bombones de frutas',       price: 30, desc: '18 piezas',   cat: 'Bombones', img: '🍓' },
  { id: 306, name: 'Trufas de champagne',      price: 40, desc: '16 trufas',   cat: 'Trufas',   img: '🥂' },
]

// ─── ORDERS ──────────────────────────────────────────────────────────────────
export const orders = [
  { id: '#FLO12345', date: '12 May 2025', product: 'Ramo de rosas rojas',       status: 'Completado', total: 45.00, address: 'Av. Siempre Viva 123, CDMX', img: '🌹' },
  { id: '#FLO12344', date: '10 May 2025', product: 'Caja de rosas + Peluche',   status: 'Pendiente',  total: 55.00, address: 'Av. Siempre Viva 123, CDMX', img: '🎁' },
  { id: '#FLO12343', date: '8 May 2025',  product: 'Ramo mixto grande',         status: 'Retrasado',  total: 65.00, address: 'Av. Siempre Viva 123, CDMX', img: '💐' },
  { id: '#FLO12342', date: '5 May 2025',  product: 'Girasoles + Chocolates',     status: 'Cancelado',  total: 35.00, address: 'Av. Siempre Viva 123, CDMX', img: '🌻' },
  { id: '#FLO12341', date: '1 May 2025',  product: 'Orquídeas blancas',          status: 'Completado', total: 65.00, address: 'Av. Siempre Viva 123, CDMX', img: '🌺' },
  { id: '#FLO12340', date: '28 Apr 2025', product: 'Bouquet romántico deluxe',   status: 'Completado', total: 75.00, address: 'Av. Siempre Viva 123, CDMX', img: '💐' },
]

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
export const reviews = [
  { id: 1, name: 'María G.',   initial: 'M', color: '#EC4899', date: '10 May 2025', product: 'Ramo de rosas rosadas',   rating: 5, text: '¡Increíble! Las rosas llegaron perfectas y frescas. El empaque era precioso y el servicio de entrega muy puntual. Definitivamente compraré de nuevo.', useful: 12 },
  { id: 2, name: 'Carlos R.',  initial: 'C', color: '#8B5CF6', date: '8 May 2025',  product: 'Combo rosas + chocolates', rating: 5, text: 'Pedí el combo de rosas con chocolates para el aniversario de mi esposa y quedó encantada. Todo llegó en perfecto estado y a tiempo.',              useful: 8  },
  { id: 3, name: 'Ana L.',     initial: 'A', color: '#10B981', date: '5 May 2025',  product: 'Combo flores + peluche',   rating: 4, text: 'Muy buena calidad en las flores. El peluche era adorable. La entrega tardó un poco más de lo esperado pero el resultado valió la pena.',  useful: 5  },
  { id: 4, name: 'Roberto M.', initial: 'R', color: '#F59E0B', date: '2 May 2025',  product: 'Ramo mixto primavera',     rating: 5, text: 'Llevo 3 pedidos con Alesli y siempre superan mis expectativas. El programa de recompensas también es genial. 100% recomendado.',            useful: 20 },
  { id: 5, name: 'Diana P.',   initial: 'D', color: '#6366F1', date: '28 Apr 2025', product: 'Orquídeas blancas',        rating: 4, text: 'Las orquídeas eran hermosas. El empaque personalizado con el mensaje fue un detalle muy bonito que hizo especial el regalo.',                useful: 7  },
]

// ─── COUPONS ─────────────────────────────────────────────────────────────────
export const coupons = [
  { id: 1, discount: '-10%', title: '10% de descuento',    desc: 'Descuento en tu próxima compra de flores',  min: 'Mínimo: $40.00', vence: '31 May 2025', code: 'DESCUENTO10',  status: 'Activo',   bg: '#FF4DB8' },
  { id: 2, discount: 'Free', title: 'Envío gratis',        desc: 'Sin costo de envío en cualquier pedido',    min: 'Mínimo: $50.00', vence: '15 Jun 2025', code: 'ENVIOGRATIS',  status: 'Activo',   bg: '#A855F7' },
  { id: 3, discount: '-20%', title: 'Bienvenida -20%',     desc: 'Cupón de bienvenida para nuevos clientes',  min: 'Mínimo: $60.00', vence: 'Expirado',    code: 'BIENVENIDA20', status: 'Expirado', bg: '#9ca3af' },
  { id: 4, discount: '-15%', title: '-15% en flores',      desc: 'Descuento en toda la sección de flores',    min: 'Mínimo: $35.00', vence: '30 Jun 2025', code: 'FLORES15',     status: 'Activo',   bg: '#F59E0B' },
]

// ─── REWARD HISTORY ──────────────────────────────────────────────────────────
export const rewardHistory = [
  { label: 'Compra #FLO12345', date: '12 May 2025', pts: '+45', positive: true  },
  { label: 'Compra #FLO12344', date: '10 May 2025', pts: '+55', positive: true  },
  { label: 'Cupón canjeado',   date: '8 May 2025',  pts: '-50', positive: false },
  { label: 'Compra #FLO12342', date: '5 May 2025',  pts: '+35', positive: true  },
  { label: 'Bono bienvenida',  date: '1 May 2025',  pts: '+35', positive: true  },
]

// ─── MOCK USER ───────────────────────────────────────────────────────────────
export const mockUser = {
  name:   'Ana García',
  email:  'ana.garcia@correo.com',
  avatar: 'A',
  level:  'Plata',
  points: 120,
  nextLevel: 300,
}