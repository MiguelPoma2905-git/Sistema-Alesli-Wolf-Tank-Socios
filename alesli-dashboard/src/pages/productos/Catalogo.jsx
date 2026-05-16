import { useMemo, useState } from 'react'
import {
  ArrowUpDown,
  Barcode,
  Bell,
  CalendarDays,
  CheckCircle,
  ClipboardList,
  Copy,
  Edit,
  Eye,
  FilePlus,
  Filter,
  Layers,
  Loader2,
  LogIn,
  Minus,
  Package,
  Pencil,
  Plus,
  Search,
  Share2,
  ShoppingBag,
  Slash,
  Sparkles,
  Tag,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatPrice, genOrderId } from '../../utils/helpers'

const CATEGORIES = ['Todos', 'Ramos', 'Centros de Mesa', 'Coronas', 'Arreglos Premium', 'Cajas', 'Eventos']
const STOCK_FILTERS = ['Todos', 'Stock > 0', 'Stock bajo < 10', 'Agotados']
const SORT_OPTIONS = [
  { value: 'codeAsc', label: 'Código ↑' },
  { value: 'codeDesc', label: 'Código ↓' },
  { value: 'priceAsc', label: 'Precio ↑' },
  { value: 'priceDesc', label: 'Precio ↓' },
  { value: 'stockAsc', label: 'Stock ↑' },
  { value: 'stockDesc', label: 'Stock ↓' },
]

const INITIAL_PRODUCTS = [
  {
    id: 'A-1',
    sku: 'RAMO-ROJO-001',
    nombre: 'Ramo de Rosas Rojas',
    descripcion: '24 rosas rojas con eucalipto y papel kraft',
    categoria: 'Ramos',
    subcategoria: 'Ramos románticos',
    imagen: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=80'],
    precios: {
      original: 160,
      aceptado: 140,
      mantenido: 70,
      promocional: 120,
      promocion_fecha: { inicio: '2026-05-01', fin: '2026-05-15' },
    },
    stock: 25,
    stockMinimo: 5,
    unidad: 'ramo',
    tiempoPreparacion: 30,
    materiales: [
      { nombre: 'Rosas rojas', cantidad: 24 },
      { nombre: 'Eucalipto', cantidad: 3 },
      { nombre: 'Papel kraft', cantidad: 1 },
    ],
    proveedor: 'Flores del Valle',
    temporada: ['Todo el año', 'Primavera'],
    estado: 'activo',
    visitas: 180,
    ventasTotales: 32,
    historial: [],
  },
  {
    id: 'A-2',
    sku: 'RAMO-MIX-002',
    nombre: 'Ramo Mixto Pastel',
    descripcion: 'Mix de rosas, peonías y verdes para un regalo elegante',
    categoria: 'Ramos',
    subcategoria: 'Ramos mixtos',
    imagen: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 180, aceptado: 155, mantenido: 85, promocional: null, promocion_fecha: null },
    stock: 12,
    stockMinimo: 4,
    unidad: 'ramo',
    tiempoPreparacion: 35,
    materiales: [
      { nombre: 'Rosas blancas', cantidad: 12 },
      { nombre: 'Peonías', cantidad: 6 },
      { nombre: 'Verde', cantidad: 4 },
    ],
    proveedor: 'Jardines Andinos',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 140,
    ventasTotales: 18,
    historial: [],
  },
  {
    id: 'A-3',
    sku: 'CENTRO-LIRIOS-003',
    nombre: 'Centro de Mesa Lirios',
    descripcion: 'Centro blanco con lirios y follaje fresco',
    categoria: 'Centros de Mesa',
    subcategoria: 'Centros elegantes',
    imagen: 'https://images.unsplash.com/photo-1520453803296-db7e7a6e9df9?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1520453803296-db7e7a6e9df9?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 210, aceptado: 190, mantenido: 120, promocional: 175, promocion_fecha: { inicio: '2026-12-01', fin: '2026-12-25' } },
    stock: 7,
    stockMinimo: 3,
    unidad: 'centro',
    tiempoPreparacion: 45,
    materiales: [
      { nombre: 'Lirios', cantidad: 8 },
      { nombre: 'Eucalipto', cantidad: 5 },
      { nombre: 'Cinta satinada', cantidad: 1 },
    ],
    proveedor: 'ImportFlor Bolivia',
    temporada: ['Todo el año', 'Navidad'],
    estado: 'activo',
    visitas: 98,
    ventasTotales: 9,
    historial: [],
  },
  {
    id: 'A-4',
    sku: 'CORONA-FUN-004',
    nombre: 'Corona Fúnebre Blanca',
    descripcion: 'Corona funeraria con rosas blancas y lirios',
    categoria: 'Coronas',
    subcategoria: 'Funerarias',
    imagen: 'https://images.unsplash.com/photo-1518972559570-1b2bf0047d25?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1518972559570-1b2bf0047d25?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 330, aceptado: 300, mantenido: 180, promocional: null, promocion_fecha: null },
    stock: 5,
    stockMinimo: 2,
    unidad: 'corona',
    tiempoPreparacion: 60,
    materiales: [
      { nombre: 'Rosas blancas', cantidad: 20 },
      { nombre: 'Lirios', cantidad: 8 },
      { nombre: 'Verde', cantidad: 6 },
    ],
    proveedor: 'Flores del Valle',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 64,
    ventasTotales: 12,
    historial: [],
  },
  {
    id: 'A-5',
    sku: 'PREM-ORQ-005',
    nombre: 'Arreglo Premium Orquídeas',
    descripcion: 'Elegante arreglo de orquídeas premium en base moderna',
    categoria: 'Arreglos Premium',
    subcategoria: 'Premium',
    imagen: 'https://images.unsplash.com/photo-1496196614460-48988a57fccf?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1496196614460-48988a57fccf?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 420, aceptado: 380, mantenido: 240, promocional: 360, promocion_fecha: { inicio: '2026-05-10', fin: '2026-05-20' } },
    stock: 3,
    stockMinimo: 2,
    unidad: 'arreglo',
    tiempoPreparacion: 80,
    materiales: [
      { nombre: 'Orquídeas', cantidad: 6 },
      { nombre: 'Musgo', cantidad: 2 },
      { nombre: 'Base decorativa', cantidad: 1 },
    ],
    proveedor: 'Vivero El Paraíso',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 74,
    ventasTotales: 21,
    historial: [],
  },
  {
    id: 'A-6',
    sku: 'RAMO-ALG-006',
    nombre: 'Ramo de Girasoles',
    descripcion: 'Ramo luminoso de girasoles para eventos alegres',
    categoria: 'Ramos',
    subcategoria: 'Ramos alegres',
    imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 520, aceptado: 480, mantenido: 260, promocional: null, promocion_fecha: null },
    stock: 18,
    stockMinimo: 6,
    unidad: 'ramo',
    tiempoPreparacion: 40,
    materiales: [
      { nombre: 'Girasoles', cantidad: 12 },
      { nombre: 'Verde', cantidad: 4 },
      { nombre: 'Cinta', cantidad: 1 },
    ],
    proveedor: 'Jardines Andinos',
    temporada: ['Verano'],
    estado: 'activo',
    visitas: 98,
    ventasTotales: 25,
    historial: [],
  },
  {
    id: 'A-7',
    sku: 'CAJA-TUL-007',
    nombre: 'Caja de Tulipanes Rosados',
    descripcion: 'Caja compacta con tulipanes rosados y tarjeta personalizada',
    categoria: 'Cajas',
    subcategoria: 'Cajas regalo',
    imagen: 'https://images.unsplash.com/photo-1526481280690-3e04366f28d9?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1526481280690-3e04366f28d9?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 980, aceptado: 850, mantenido: 420, promocional: 800, promocion_fecha: { inicio: '2026-05-05', fin: '2026-05-12' } },
    stock: 9,
    stockMinimo: 4,
    unidad: 'caja',
    tiempoPreparacion: 50,
    materiales: [
      { nombre: 'Tulipanes rosados', cantidad: 12 },
      { nombre: 'Caja de regalo', cantidad: 1 },
      { nombre: 'Tarjeta', cantidad: 1 },
    ],
    proveedor: 'Flores del Valle',
    temporada: ['Primavera'],
    estado: 'activo',
    visitas: 68,
    ventasTotales: 14,
    historial: [],
  },
  {
    id: 'A-8',
    sku: 'RAMO-BOD-008',
    nombre: 'Ramo Novia Premium',
    descripcion: 'Ramo de novia con lirios, rosas y satén blanco',
    categoria: 'Ramos',
    subcategoria: 'Novias',
    imagen: 'https://images.unsplash.com/photo-1517260912219-08d65408df59?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1517260912219-08d65408df59?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 320, aceptado: 280, mantenido: 150, promocional: null, promocion_fecha: null },
    stock: 4,
    stockMinimo: 2,
    unidad: 'ramo',
    tiempoPreparacion: 70,
    materiales: [
      { nombre: 'Rosas blancas', cantidad: 10 },
      { nombre: 'Lirios', cantidad: 5 },
      { nombre: 'Cinta blanca', cantidad: 1 },
    ],
    proveedor: 'ImportFlor Bolivia',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 85,
    ventasTotales: 20,
    historial: [],
  },
  {
    id: 'A-9',
    sku: 'CORONA-MIX-009',
    nombre: 'Corona Mixta Pastel',
    descripcion: 'Corona floral con tonalidades rosas y blancas',
    categoria: 'Coronas',
    subcategoria: 'Festivas',
    imagen: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 260, aceptado: 230, mantenido: 130, promocional: null, promocion_fecha: null },
    stock: 11,
    stockMinimo: 5,
    unidad: 'corona',
    tiempoPreparacion: 55,
    materiales: [
      { nombre: 'Rosas rosadas', cantidad: 10 },
      { nombre: 'Verde', cantidad: 4 },
      { nombre: 'Base circular', cantidad: 1 },
    ],
    proveedor: 'Vivero El Paraíso',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 61,
    ventasTotales: 7,
    historial: [],
  },
  {
    id: 'A-10',
    sku: 'PREM-GIR-010',
    nombre: 'Arreglo Girasoles y Eucalipto',
    descripcion: 'Arreglo alto con girasoles, eucalipto y follaje',
    categoria: 'Arreglos Premium',
    subcategoria: 'Premium',
    imagen: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 460, aceptado: 420, mantenido: 260, promocional: 400, promocion_fecha: { inicio: '2026-05-01', fin: '2026-05-08' } },
    stock: 6,
    stockMinimo: 3,
    unidad: 'arreglo',
    tiempoPreparacion: 75,
    materiales: [
      { nombre: 'Girasoles', cantidad: 8 },
      { nombre: 'Eucalipto', cantidad: 6 },
      { nombre: 'Base decorativa', cantidad: 1 },
    ],
    proveedor: 'Flores del Valle',
    temporada: ['Verano'],
    estado: 'activo',
    visitas: 57,
    ventasTotales: 9,
    historial: [],
  },
  {
    id: 'A-11',
    sku: 'RAMO-ROSA-011',
    nombre: 'Ramo Rosas Rosadas',
    descripcion: 'Ramo suave con rosas rosadas y follaje verde',
    categoria: 'Ramos',
    subcategoria: 'Ramos románticos',
    imagen: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 190, aceptado: 170, mantenido: 95, promocional: null, promocion_fecha: null },
    stock: 20,
    stockMinimo: 6,
    unidad: 'ramo',
    tiempoPreparacion: 35,
    materiales: [
      { nombre: 'Rosas rosadas', cantidad: 12 },
      { nombre: 'Eucalipto', cantidad: 3 },
      { nombre: 'Papel kraft', cantidad: 1 },
    ],
    proveedor: 'Jardines Andinos',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 82,
    ventasTotales: 28,
    historial: [],
  },
  {
    id: 'A-12',
    sku: 'CAJA-ROS-012',
    nombre: 'Caja Sorpresa Rosas',
    descripcion: 'Caja con rosas de colores surtidos y globo complementario',
    categoria: 'Cajas',
    subcategoria: 'Caja sorpresa',
    imagen: 'https://images.unsplash.com/photo-1519585315645-81ec0acdf714?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1519585315645-81ec0acdf714?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 1070, aceptado: 980, mantenido: 520, promocional: null, promocion_fecha: null },
    stock: 14,
    stockMinimo: 5,
    unidad: 'caja',
    tiempoPreparacion: 55,
    materiales: [
      { nombre: 'Rosas surtidas', cantidad: 18 },
      { nombre: 'Caja', cantidad: 1 },
      { nombre: 'Globo', cantidad: 1 },
    ],
    proveedor: 'Flores del Valle',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 76,
    ventasTotales: 16,
    historial: [],
  },
  {
    id: 'A-13',
    sku: 'RAMO-PRIM-013',
    nombre: 'Ramo Primaveral',
    descripcion: 'Ramo colorido de flores mixtas para eventos de primavera',
    categoria: 'Ramos',
    subcategoria: 'Ramos primaverales',
    imagen: 'https://images.unsplash.com/photo-1501862700950-183a2fa32f70?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1501862700950-183a2fa32f70?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 210, aceptado: 180, mantenido: 100, promocional: 160, promocion_fecha: { inicio: '2026-09-01', fin: '2026-09-30' } },
    stock: 10,
    stockMinimo: 4,
    unidad: 'ramo',
    tiempoPreparacion: 40,
    materiales: [
      { nombre: 'Rosas mixtas', cantidad: 10 },
      { nombre: 'Peonías', cantidad: 4 },
      { nombre: 'Follaje', cantidad: 4 },
    ],
    proveedor: 'Jardines Andinos',
    temporada: ['Primavera'],
    estado: 'activo',
    visitas: 62,
    ventasTotales: 11,
    historial: [],
  },
  {
    id: 'A-14',
    sku: 'CORONA-NEG-014',
    nombre: 'Corona Negra Moderna',
    descripcion: 'Corona elegante con flores blancas y detalles negros',
    categoria: 'Coronas',
    subcategoria: 'Contemporáneas',
    imagen: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 360, aceptado: 330, mantenido: 190, promocional: null, promocion_fecha: null },
    stock: 2,
    stockMinimo: 1,
    unidad: 'corona',
    tiempoPreparacion: 70,
    materiales: [
      { nombre: 'Rosas blancas', cantidad: 12 },
      { nombre: 'Flores negras', cantidad: 6 },
      { nombre: 'Follaje', cantidad: 5 },
    ],
    proveedor: 'ImportFlor Bolivia',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 44,
    ventasTotales: 6,
    historial: [],
  },
  {
    id: 'A-15',
    sku: 'EVENT-ARQ-015',
    nombre: 'Arreglo Evento Deluxe',
    descripcion: 'Arreglo ideal para bodas y celebraciones con flores premium',
    categoria: 'Eventos',
    subcategoria: 'Bodas',
    imagen: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 650, aceptado: 590, mantenido: 330, promocional: null, promocion_fecha: null },
    stock: 5,
    stockMinimo: 2,
    unidad: 'arreglo',
    tiempoPreparacion: 90,
    materiales: [
      { nombre: 'Flores premium', cantidad: 18 },
      { nombre: 'Base decorativa', cantidad: 1 },
      { nombre: 'Cinta satinada', cantidad: 1 },
    ],
    proveedor: 'Vivero El Paraíso',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 50,
    ventasTotales: 8,
    historial: [],
  },
  {
    id: 'A-16',
    sku: 'RAMO-CAJ-016',
    nombre: 'Ramo en Caja Negra',
    descripcion: 'Ramo moderno en caja negra con hoja de oro',
    categoria: 'Cajas',
    subcategoria: 'Caja premium',
    imagen: 'https://images.unsplash.com/photo-1524594345848-07e0474664e4?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1524594345848-07e0474664e4?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 1100, aceptado: 990, mantenido: 520, promocional: null, promocion_fecha: null },
    stock: 7,
    stockMinimo: 3,
    unidad: 'caja',
    tiempoPreparacion: 60,
    materiales: [
      { nombre: 'Rosas blancas', cantidad: 14 },
      { nombre: 'Caja premium', cantidad: 1 },
      { nombre: 'Hoja decorativa', cantidad: 1 },
    ],
    proveedor: 'Flores del Valle',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 59,
    ventasTotales: 10,
    historial: [],
  },
  {
    id: 'A-17',
    sku: 'PREM-EVE-017',
    nombre: 'Arreglo San Valentín',
    descripcion: 'Arreglo romántico con rosas rojas y velas decorativas',
    categoria: 'Eventos',
    subcategoria: 'San Valentín',
    imagen: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 580, aceptado: 520, mantenido: 300, promocional: 480, promocion_fecha: { inicio: '2026-02-01', fin: '2026-02-14' } },
    stock: 9,
    stockMinimo: 3,
    unidad: 'arreglo',
    tiempoPreparacion: 80,
    materiales: [
      { nombre: 'Rosas rojas', cantidad: 20 },
      { nombre: 'Velas', cantidad: 2 },
      { nombre: 'Base decorativa', cantidad: 1 },
    ],
    proveedor: 'Jardines Andinos',
    temporada: ['San Valentín'],
    estado: 'activo',
    visitas: 89,
    ventasTotales: 22,
    historial: [],
  },
  {
    id: 'A-18',
    sku: 'RAMO-HEL-018',
    nombre: 'Ramo Heliconias Tropical',
    descripcion: 'Ramo vibrante de heliconias y follaje tropical',
    categoria: 'Ramos',
    subcategoria: 'Tropicales',
    imagen: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 280, aceptado: 250, mantenido: 140, promocional: null, promocion_fecha: null },
    stock: 21,
    stockMinimo: 7,
    unidad: 'ramo',
    tiempoPreparacion: 45,
    materiales: [
      { nombre: 'Heliconias', cantidad: 10 },
      { nombre: 'Follaje tropical', cantidad: 5 },
      { nombre: 'Cinta decorativa', cantidad: 1 },
    ],
    proveedor: 'Flores del Valle',
    temporada: ['Verano'],
    estado: 'activo',
    visitas: 91,
    ventasTotales: 13,
    historial: [],
  },
  {
    id: 'A-19',
    sku: 'CAJA-ORQ-019',
    nombre: 'Caja Orquídeas Mini',
    descripcion: 'Caja compacta con orquídeas y follaje minimalista',
    categoria: 'Cajas',
    subcategoria: 'Mini',
    imagen: 'https://images.unsplash.com/photo-1465028142291-0744f6e0d1f0?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1465028142291-0744f6e0d1f0?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 750, aceptado: 700, mantenido: 380, promocional: null, promocion_fecha: null },
    stock: 8,
    stockMinimo: 4,
    unidad: 'caja',
    tiempoPreparacion: 60,
    materiales: [
      { nombre: 'Orquídeas', cantidad: 4 },
      { nombre: 'Caja', cantidad: 1 },
      { nombre: 'Musgo', cantidad: 1 },
    ],
    proveedor: 'Vivero El Paraíso',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 48,
    ventasTotales: 11,
    historial: [],
  },
  {
    id: 'A-20',
    sku: 'PREM-FRE-020',
    nombre: 'Arreglo Fresia Deluxe',
    descripcion: 'Arreglo fragante con fresias y detalles dorados',
    categoria: 'Arreglos Premium',
    subcategoria: 'Premium',
    imagen: 'https://images.unsplash.com/photo-1515169067864-5387ec356754?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1515169067864-5387ec356754?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 500, aceptado: 460, mantenido: 270, promocional: 430, promocion_fecha: { inicio: '2026-05-18', fin: '2026-05-25' } },
    stock: 6,
    stockMinimo: 3,
    unidad: 'arreglo',
    tiempoPreparacion: 70,
    materiales: [
      { nombre: 'Fresias', cantidad: 10 },
      { nombre: 'Verde', cantidad: 4 },
      { nombre: 'Base', cantidad: 1 },
    ],
    proveedor: 'Flores del Valle',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 52,
    ventasTotales: 15,
    historial: [],
  },
  {
    id: 'A-21',
    sku: 'RAMO-NAV-021',
    nombre: 'Ramo Navidad',
    descripcion: 'Ramo festivo con flores rojas y decoraciones navideñas',
    categoria: 'Eventos',
    subcategoria: 'Navidad',
    imagen: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 600, aceptado: 540, mantenido: 310, promocional: 500, promocion_fecha: { inicio: '2026-12-01', fin: '2026-12-24' } },
    stock: 13,
    stockMinimo: 5,
    unidad: 'ramo',
    tiempoPreparacion: 75,
    materiales: [
      { nombre: 'Rosas rojas', cantidad: 14 },
      { nombre: 'Pino', cantidad: 5 },
      { nombre: 'Cinta dorada', cantidad: 1 },
    ],
    proveedor: 'Jardines Andinos',
    temporada: ['Navidad'],
    estado: 'activo',
    visitas: 77,
    ventasTotales: 19,
    historial: [],
  },
  {
    id: 'A-22',
    sku: 'RAMO-FLO-022',
    nombre: 'Ramo de Flores Silvestres',
    descripcion: 'Ramo campestre con flores silvestres y verde natural',
    categoria: 'Ramos',
    subcategoria: 'Campestre',
    imagen: 'https://images.unsplash.com/photo-1473243764071-2526df96d0b5?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1473243764071-2526df96d0b5?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 240, aceptado: 210, mantenido: 110, promocional: null, promocion_fecha: null },
    stock: 23,
    stockMinimo: 8,
    unidad: 'ramo',
    tiempoPreparacion: 45,
    materiales: [
      { nombre: 'Flores silvestres', cantidad: 16 },
      { nombre: 'Verde', cantidad: 5 },
      { nombre: 'Papel kraft', cantidad: 1 },
    ],
    proveedor: 'Flores del Valle',
    temporada: ['Primavera'],
    estado: 'activo',
    visitas: 53,
    ventasTotales: 10,
    historial: [],
  },
  {
    id: 'A-23',
    sku: 'CAJA-BOU-023',
    nombre: 'Caja Bouquet Bronce',
    descripcion: 'Caja elegante con bouquet y accesorios de regalo',
    categoria: 'Cajas',
    subcategoria: 'Boutique',
    imagen: 'https://images.unsplash.com/photo-1510684541407-5974b1b9d08f?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1510684541407-5974b1b9d08f?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 880, aceptado: 820, mantenido: 460, promocional: null, promocion_fecha: null },
    stock: 16,
    stockMinimo: 6,
    unidad: 'caja',
    tiempoPreparacion: 60,
    materiales: [
      { nombre: 'Rosas', cantidad: 10 },
      { nombre: 'Caja boutique', cantidad: 1 },
      { nombre: 'Accesorios', cantidad: 2 },
    ],
    proveedor: 'Vivero El Paraíso',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 49,
    ventasTotales: 13,
    historial: [],
  },
  {
    id: 'A-24',
    sku: 'PREM-ORQ-024',
    nombre: 'Orquídeas Rosadas Deluxe',
    descripcion: 'Presentación de orquídeas rosadas en base de cristal',
    categoria: 'Arreglos Premium',
    subcategoria: 'Premium',
    imagen: 'https://images.unsplash.com/photo-1462155432892-5c4f5e7c0c08?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1462155432892-5c4f5e7c0c08?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 540, aceptado: 500, mantenido: 290, promocional: 470, promocion_fecha: { inicio: '2026-05-15', fin: '2026-05-31' } },
    stock: 8,
    stockMinimo: 4,
    unidad: 'arreglo',
    tiempoPreparacion: 70,
    materiales: [
      { nombre: 'Orquídeas rosadas', cantidad: 5 },
      { nombre: 'Musgo', cantidad: 2 },
      { nombre: 'Base de cristal', cantidad: 1 },
    ],
    proveedor: 'Flores del Valle',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 61,
    ventasTotales: 12,
    historial: [],
  },
  {
    id: 'A-25',
    sku: 'RAMO-BEL-025',
    nombre: 'Ramo Belleza Natural',
    descripcion: 'Combinación orgánica de rosas y flores silvestres',
    categoria: 'Ramos',
    subcategoria: 'Natural',
    imagen: 'https://images.unsplash.com/photo-1470734708642-7c3f0dca2157?auto=format&fit=crop&w=800&q=80',
    imagenes: ['https://images.unsplash.com/photo-1470734708642-7c3f0dca2157?auto=format&fit=crop&w=800&q=80'],
    precios: { original: 210, aceptado: 185, mantenido: 105, promocional: null, promocion_fecha: null },
    stock: 19,
    stockMinimo: 6,
    unidad: 'ramo',
    tiempoPreparacion: 45,
    materiales: [
      { nombre: 'Rosas', cantidad: 8 },
      { nombre: 'Flores silvestres', cantidad: 6 },
      { nombre: 'Verde', cantidad: 4 },
    ],
    proveedor: 'Jardines Andinos',
    temporada: ['Todo el año'],
    estado: 'activo',
    visitas: 60,
    ventasTotales: 20,
    historial: [],
  },
]

const pageSize = 20

const getStockStatus = (product) => {
  if (product.stock === 0) return { label: 'Agotado', className: 'bg-rose-100 text-rose-700' }
  if (product.stock < 10) return { label: 'Bajo stock', className: 'bg-amber-100 text-amber-700' }
  return { label: 'Disponible', className: 'bg-emerald-100 text-emerald-700' }
}

const calculateMargin = (product) => {
  const aceptado = Number(product.precios.aceptado)
  const mantenido = Number(product.precios.mantenido)
  if (!aceptado) return 0
  return Math.round(((aceptado - mantenido) / aceptado) * 100)
}

const calculateROI = (product) => {
  const aceptado = Number(product.precios.aceptado)
  const mantenido = Number(product.precios.mantenido)
  if (!mantenido) return 0
  return Math.round(((aceptado - mantenido) / mantenido) * 100)
}

const formatDate = (value) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const normalizePrice = (value) => value === '' ? '' : Number(value)

function Catalogo() {
  const { addOrder, showToast } = useApp()
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [viewMode, setViewMode] = useState('grid')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [stockFilter, setStockFilter] = useState('Todos')
  const [sortKey, setSortKey] = useState('codeAsc')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [saleProduct, setSaleProduct] = useState(null)
  const [stockProduct, setStockProduct] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [productForm, setProductForm] = useState(null)
  const [saleForm, setSaleForm] = useState({ cantidad: 1, precio: 0, cliente: 'Cliente existente', fechaEntrega: '', notas: '' })
  const [stockForm, setStockForm] = useState({ cantidad: 0, tipo: 'entrada', motivo: 'Ajuste de stock' })

  const filteredProducts = useMemo(() => {
    const lower = search.toLowerCase()

    return products
      .filter((product) => {
        const matchesSearch = [product.id, product.sku, product.nombre, product.descripcion]
          .some((value) => String(value).toLowerCase().includes(lower))

        const matchesCategory = category === 'Todos' || product.categoria === category
        const minValue = normalizePrice(priceRange.min)
        const maxValue = normalizePrice(priceRange.max)
        const price = product.precios.aceptado
        const matchesPrice = (!minValue || price >= minValue) && (!maxValue || price <= maxValue)

        const stockStatus = stockFilter === 'Todos'
          || (stockFilter === 'Stock > 0' && product.stock > 0)
          || (stockFilter === 'Stock bajo < 10' && product.stock > 0 && product.stock < 10)
          || (stockFilter === 'Agotados' && product.stock === 0)

        return matchesSearch && matchesCategory && matchesPrice && stockStatus
      })
      .sort((a, b) => {
        if (sortKey === 'codeAsc') return a.id.localeCompare(b.id)
        if (sortKey === 'codeDesc') return b.id.localeCompare(a.id)
        if (sortKey === 'priceAsc') return a.precios.aceptado - b.precios.aceptado
        if (sortKey === 'priceDesc') return b.precios.aceptado - a.precios.aceptado
        if (sortKey === 'stockAsc') return a.stock - b.stock
        if (sortKey === 'stockDesc') return b.stock - a.stock
        return 0
      })
  }, [products, search, category, priceRange, stockFilter, sortKey])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const closeModal = () => {
    setModalType(null)
    setSelectedProduct(null)
    setEditingProduct(null)
    setSaleProduct(null)
    setStockProduct(null)
    setProductForm(null)
  }

  const openCreateModal = () => {
    setProductForm({
      id: '', sku: '', nombre: '', descripcion: '', categoria: 'Ramos', subcategoria: '', imagen: '', precios: { original: '', aceptado: '', mantenido: '', promocional: '', promocion_fecha: { inicio: '', fin: '' } }, stock: 0, stockMinimo: 5, unidad: 'unidad', tiempoPreparacion: 30, materiales: [], proveedor: '', temporada: [], estado: 'activo', visitas: 0, ventasTotales: 0, historial: [],
    })
    setEditingProduct(null)
    setModalType('product')
  }

  const openEditModal = (product) => {
    setProductForm({ ...product })
    setEditingProduct(product)
    setModalType('product')
  }

  const openDetailModal = (product) => {
    setSelectedProduct(product)
    setModalType('detail')
  }

  const openSaleModal = (product) => {
    setSaleProduct(product)
    setSaleForm({ cantidad: 1, precio: product.precios.aceptado, cliente: 'Cliente existente', fechaEntrega: '', notas: '' })
    setModalType('sale')
  }

  const openStockModal = (product) => {
    setStockProduct(product)
    setStockForm({ cantidad: 0, tipo: 'entrada', motivo: 'Ajuste de stock' })
    setModalType('stock')
  }

  const handleSaveProduct = () => {
    if (!productForm.nombre || !productForm.id || !productForm.precios.aceptado || !productForm.precios.mantenido) {
      showToast('Completa nombre, código y precios', 'warning', '⚠️')
      return
    }

    if (editingProduct) {
      setProducts((prev) => prev.map((item) => (item.id === editingProduct.id ? { ...productForm, historial: item.historial } : item)))
      showToast('Producto actualizado', 'success', '✅')
    } else {
      const exists = products.some((item) => item.id === productForm.id)
      if (exists) {
        showToast('El código ya existe', 'error', '❌')
        return
      }
      const newProduct = { ...productForm, historial: [], visitas: 0, ventasTotales: 0 }
      setProducts((prev) => [newProduct, ...prev])
      showToast('Producto agregado al catálogo', 'success', '✅')
    }
    closeModal()
  }

  const handleDuplicate = (product) => {
    const nextId = `A-${products.length + 1}`
    const duplicate = {
      ...product,
      id: nextId,
      sku: `${product.sku}-DUP`,
      nombre: `${product.nombre} (Copia)`,
      ventasTotales: 0,
      historial: [],
    }
    setProducts((prev) => [duplicate, ...prev])
    showToast('Producto duplicado', 'success', '✅')
  }

  const handleDelete = (product) => {
    if (product.ventasTotales > 0) {
      showToast('No se puede eliminar un producto con ventas registradas', 'error', '❌')
      return
    }
    setProducts((prev) => prev.filter((item) => item.id !== product.id))
    showToast('Producto eliminado', 'success', '✅')
  }

  const handleRegisterSale = () => {
    const cantidad = Number(saleForm.cantidad)
    const precio = Number(saleForm.precio)
    if (cantidad <= 0 || precio <= 0) {
      showToast('Cantidad y precio deben ser valores válidos', 'warning', '⚠️')
      return
    }
    if (cantidad > saleProduct.stock) {
      showToast('La cantidad excede el stock disponible', 'warning', '⚠️')
      return
    }

    const anticipo = Math.round(precio * cantidad * 0.5)
    const total = precio * cantidad
    const order = {
      id: genOrderId(),
      client: saleForm.cliente,
      arrangement: saleProduct.nombre,
      total,
      status: 'Pendiente',
      date: formatDate(saleForm.fechaEntrega || new Date().toISOString()),
    }
    addOrder(order)
    setProducts((prev) => prev.map((item) => item.id === saleProduct.id ? {
      ...item,
      stock: item.stock - cantidad,
      ventasTotales: item.ventasTotales + cantidad,
      historial: [{ fecha: new Date().toISOString(), cantidad, motivo: 'Venta registrada', usuario: 'Sistema' }, ...item.historial],
    } : item))
    showToast(`Venta registrada. Anticipo: ${formatPrice(anticipo, 'Bs ')}`, 'success', '✅')
    closeModal()
  }

  const handleAdjustStock = () => {
    const cantidad = Number(stockForm.cantidad)
    if (!cantidad) {
      showToast('Ingresa una cantidad para el ajuste', 'warning', '⚠️')
      return
    }
    setProducts((prev) => prev.map((item) => {
      if (item.id !== stockProduct.id) return item
      const newStock = stockForm.tipo === 'entrada' ? item.stock + cantidad : Math.max(0, item.stock - cantidad)
      return {
        ...item,
        stock: newStock,
        historial: [{ fecha: new Date().toISOString(), cantidad: stockForm.tipo === 'entrada' ? cantidad : -cantidad, motivo: stockForm.motivo, usuario: 'Admin' }, ...item.historial],
      }
    }))
    showToast('Stock ajustado', 'success', '✅')
    closeModal()
  }

  const exportCSV = () => {
    const headers = ['id', 'sku', 'nombre', 'descripcion', 'categoria', 'subcategoria', 'aceptado', 'mantenido', 'stock', 'stockMinimo', 'proveedor']
    const rows = products.map((product) => [
      product.id,
      product.sku,
      product.nombre,
      product.descripcion,
      product.categoria,
      product.subcategoria,
      product.precios.aceptado,
      product.precios.mantenido,
      product.stock,
      product.stockMinimo,
      product.proveedor,
    ].join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'catalogo-alesli.csv'
    link.click()
    showToast('Catálogo exportado a CSV', 'success', '✅')
  }

  const handleImportCsv = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)
    const [header, ...data] = lines
    if (!header || data.length === 0) {
      showToast('CSV inválido', 'error', '❌')
      return
    }
    const columns = header.split(',').map((col) => col.trim())
    const imported = data.map((line) => {
      const values = line.split(',')
      const product = {}
      columns.forEach((col, index) => { product[col] = values[index] ?? '' })
      return {
        id: product.id || `A-${products.length + 1}`,
        sku: product.sku || '',
        nombre: product.nombre || 'Producto importado',
        descripcion: product.descripcion || '',
        categoria: product.categoria || 'Ramos',
        subcategoria: product.subcategoria || '',
        imagen: '',
        imagenes: [],
        precios: { original: 0, aceptado: Number(product.aceptado) || 0, mantenido: Number(product.mantenido) || 0, promocional: null, promocion_fecha: null },
        stock: Number(product.stock) || 0,
        stockMinimo: Number(product.stockMinimo) || 5,
        unidad: 'unidad',
        tiempoPreparacion: 30,
        materiales: [],
        proveedor: product.proveedor || '',
        temporada: [],
        estado: 'activo',
        visitas: 0,
        ventasTotales: 0,
        historial: [],
      }
    })
    setProducts((prev) => [...imported, ...prev])
    showToast('Productos importados', 'success', '✅')
    event.target.value = ''
  }

  const calculateAnticipo = () => {
    const precio = Number(saleForm.precio)
    const cantidad = Number(saleForm.cantidad)
    if (!precio || !cantidad) return 'Bs 0'
    return formatPrice(Math.round(precio * cantidad * 0.5), 'Bs ')
  }

  return (
    <div className="space-y-8 p-6">
      <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Catálogo interno</p>
            <h1 className="mt-3 text-3xl font-extrabold text-gray-900">Gestión completa de arreglos</h1>
            <p className="mt-2 text-sm text-gray-500">Administra códigos, precios, stock y ventas con control completo para tu equipo.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={openCreateModal} className="btn btn-primary btn-sm inline-flex items-center gap-2"><Plus className="h-4 w-4" /> Nuevo arreglo</button>
            <button type="button" onClick={exportCSV} className="btn btn-secondary btn-sm inline-flex items-center gap-2"><Share2 className="h-4 w-4" /> Exportar CSV</button>
            <label className="btn btn-ghost btn-sm cursor-pointer inline-flex items-center gap-2"><FilePlus className="h-4 w-4" /> Importar CSV
              <input type="file" accept=".csv" className="hidden" onChange={handleImportCsv} />
            </label>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_3fr]">
        <aside className="space-y-6 rounded-[28px] border border-gray-100 bg-white p-6 shadow-card">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Atajos rápidos</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-pink-50 p-4">
                <p className="text-xs uppercase tracking-[1px] text-pink-700">Contacto ventas</p>
                <p className="mt-2 text-sm text-gray-700">(+591) 77793200</p>
                <p className="text-sm text-gray-700">(+591) 70034386</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-[1px] text-gray-500">Reserva</p>
                <p className="mt-2 text-sm text-gray-700">Se requiere 50% de anticipo para confirmar la venta.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-3xl bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-800">Códigos y escaneo</p>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Barcode className="h-5 w-5 text-pink-500" /> Código QR y barra para TPV.
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Layers className="h-5 w-5 text-pink-500" /> Usar A-1 a A-25 para ventas rápidas.
            </div>
          </div>

          <div className="space-y-3 rounded-3xl bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
            <p className="text-sm font-semibold text-pink-700">Mejora rápida</p>
            <p className="text-sm text-gray-700">Agrega fotos, proveedores y tiempos de preparación para cada arreglo.</p>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-card">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3 text-gray-700">
                  <Search className="h-5 w-5 text-pink-500" />
                  <input
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
                    placeholder="Buscar por código, nombre o descripción"
                    className="input w-full border-gray-200 bg-gray-50"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  <select value={category} onChange={(e) => { setCategory(e.target.value); setCurrentPage(1) }} className="input">
                    {CATEGORIES.map((categoryOption) => (<option key={categoryOption} value={categoryOption}>{categoryOption}</option>))}
                  </select>
                  <div className="flex gap-2">
                    <input type="number" min="0" value={priceRange.min} onChange={(e) => { setPriceRange((prev) => ({ ...prev, min: e.target.value })); setCurrentPage(1) }} placeholder="Min precio" className="input w-full" />
                    <input type="number" min="0" value={priceRange.max} onChange={(e) => { setPriceRange((prev) => ({ ...prev, max: e.target.value })); setCurrentPage(1) }} placeholder="Max precio" className="input w-full" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <select value={stockFilter} onChange={(e) => { setStockFilter(e.target.value); setCurrentPage(1) }} className="input w-full max-w-[220px]">
                  {STOCK_FILTERS.map((option) => (<option key={option} value={option}>{option}</option>))}
                </select>
                <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="input w-full max-w-[220px]">
                  {SORT_OPTIONS.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                </select>
                <button type="button" onClick={() => setViewMode((prev) => prev === 'grid' ? 'list' : 'grid')} className="btn btn-secondary btn-sm inline-flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" /> {viewMode === 'grid' ? 'Ver tabla' : 'Ver tarjetas'}
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[1.5px] text-gray-500">Resumen</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-[1px] text-gray-500">Productos</p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">{filteredProducts.length}</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-[1px] text-gray-500">Stock total</p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">{products.reduce((sum, item) => sum + item.stock, 0)}</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-[1px] text-gray-500">Agotados</p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">{products.filter((item) => item.stock === 0).length}</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-[1px] text-gray-500">Bajo stock</p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">{products.filter((item) => item.stock > 0 && item.stock < 10).length}</p>
                </div>
              </div>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid gap-6 xl:grid-cols-3">
              {paginatedProducts.map((product) => {
                const status = getStockStatus(product)
                const isPromo = product.precios.promocional && product.precios.promocional < product.precios.aceptado
                return (
                  <article key={product.id} className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm">
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <img src={product.imagen} alt={product.nombre} className="h-full w-full object-cover" />
                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">{product.id}</div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{product.nombre}</h3>
                          <p className="mt-1 text-sm text-gray-500">{product.categoria} • {product.subcategoria}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-gray-600">{product.descripcion}</p>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <div className="rounded-3xl bg-gray-50 p-3 text-sm text-gray-600">
                          <p>Precio original</p>
                          <p className="mt-1 font-semibold text-gray-900 line-through">{formatPrice(product.precios.original, 'Bs ')}</p>
                        </div>
                        <div className="rounded-3xl bg-gray-50 p-3 text-sm text-gray-600">
                          <p>Precio aceptado</p>
                          <p className="mt-1 font-semibold text-gray-900">{formatPrice(product.precios.aceptado, 'Bs ')}</p>
                        </div>
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <div className="rounded-3xl bg-gray-50 p-3 text-sm text-gray-600">
                          <p>Mantenido</p>
                          <p className="mt-1 font-semibold text-gray-900">{formatPrice(product.precios.mantenido, 'Bs ')}</p>
                        </div>
                        <div className="rounded-3xl bg-gray-50 p-3 text-sm text-gray-600">
                          <p>Margen</p>
                          <p className="mt-1 font-semibold text-gray-900">{calculateMargin(product)}%</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">Stock {product.stock}</span>
                        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">ROI {calculateROI(product)}%</span>
                      </div>
                      <div className="mt-5 grid gap-2 sm:grid-cols-2">
                        <button type="button" onClick={() => openSaleModal(product)} className="btn btn-primary btn-sm inline-flex items-center justify-center gap-2"><ShoppingBag className="h-4 w-4" /> Registrar venta</button>
                        <button type="button" onClick={() => openEditModal(product)} className="btn btn-secondary btn-sm inline-flex items-center justify-center gap-2"><Edit className="h-4 w-4" /> Editar</button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" onClick={() => openDetailModal(product)} className="btn btn-ghost btn-sm inline-flex items-center gap-2"><Eye className="h-4 w-4" /> Ver detalles</button>
                        <button type="button" onClick={() => openStockModal(product)} className="btn btn-ghost btn-sm inline-flex items-center gap-2"><Package className="h-4 w-4" /> Ajustar stock</button>
                        <button type="button" onClick={() => handleDuplicate(product)} className="btn btn-ghost btn-sm inline-flex items-center gap-2"><Copy className="h-4 w-4" /> Duplicar</button>
                        <button type="button" onClick={() => handleDelete(product)} className="btn btn-ghost btn-sm inline-flex items-center gap-2 text-rose-600"><Trash2 className="h-4 w-4" /> Eliminar</button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-card">
              <table className="min-w-full divide-y divide-gray-200 text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Código</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Producto</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Precio</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Stock</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Margen</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Estado</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {paginatedProducts.map((product) => {
                    const status = getStockStatus(product)
                    return (
                      <tr key={product.id}>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{product.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <p className="font-semibold text-gray-900">{product.nombre}</p>
                          <p className="text-xs text-gray-500">{product.descripcion}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatPrice(product.precios.aceptado, 'Bs ')}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{product.stock}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{calculateMargin(product)}%</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="flex flex-wrap gap-2">
                            <button type="button" onClick={() => openSaleModal(product)} className="btn btn-sm btn-primary">Registrar</button>
                            <button type="button" onClick={() => openDetailModal(product)} className="btn btn-sm btn-secondary">Ver</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-gray-100 bg-white p-5 shadow-card">
            <p className="text-sm text-gray-500">Mostrando {paginatedProducts.length} de {filteredProducts.length} productos</p>
            <div className="flex items-center gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="btn btn-secondary btn-sm">Anterior</button>
              <span className="text-sm text-gray-700">Página {currentPage} / {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="btn btn-secondary btn-sm">Siguiente</button>
            </div>
          </div>
        </div>
      </section>

      {modalType === 'product' && productForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">{editingProduct ? 'Editar producto' : 'Nuevo producto'}</p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{editingProduct ? editingProduct.nombre : 'Crear arreglo'}</h2>
              </div>
              <button type="button" onClick={closeModal} className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <input value={productForm.id} onChange={(e) => setProductForm((prev) => ({ ...prev, id: e.target.value }))} placeholder="Código (A-1)" className="input" />
                <input value={productForm.sku} onChange={(e) => setProductForm((prev) => ({ ...prev, sku: e.target.value }))} placeholder="SKU alternativo" className="input" />
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <input value={productForm.nombre} onChange={(e) => setProductForm((prev) => ({ ...prev, nombre: e.target.value }))} placeholder="Nombre del arreglo" className="input" />
                <input value={productForm.categoria} onChange={(e) => setProductForm((prev) => ({ ...prev, categoria: e.target.value }))} placeholder="Categoría" className="input" />
              </div>
              <textarea value={productForm.descripcion} onChange={(e) => setProductForm((prev) => ({ ...prev, descripcion: e.target.value }))} placeholder="Descripción corta" className="input min-h-[120px]" />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <input type="number" min="0" value={productForm.precios.original} onChange={(e) => setProductForm((prev) => ({ ...prev, precios: { ...prev.precios, original: Number(e.target.value) } }))} placeholder="Precio original" className="input" />
                <input type="number" min="0" value={productForm.precios.aceptado} onChange={(e) => setProductForm((prev) => ({ ...prev, precios: { ...prev.precios, aceptado: Number(e.target.value) } }))} placeholder="Precio aceptado" className="input" />
                <input type="number" min="0" value={productForm.precios.mantenido} onChange={(e) => setProductForm((prev) => ({ ...prev, precios: { ...prev.precios, mantenido: Number(e.target.value) } }))} placeholder="Precio mantenido" className="input" />
                <input value={productForm.imagen} onChange={(e) => setProductForm((prev) => ({ ...prev, imagen: e.target.value }))} placeholder="URL imagen" className="input" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <input type="number" min="0" value={productForm.stock} onChange={(e) => setProductForm((prev) => ({ ...prev, stock: Number(e.target.value) }))} placeholder="Stock disponible" className="input" />
                <input type="number" min="0" value={productForm.stockMinimo} onChange={(e) => setProductForm((prev) => ({ ...prev, stockMinimo: Number(e.target.value) }))} placeholder="Stock mínimo" className="input" />
                <input value={productForm.proveedor} onChange={(e) => setProductForm((prev) => ({ ...prev, proveedor: e.target.value }))} placeholder="Proveedor" className="input" />
                <input type="number" min="0" value={productForm.tiempoPreparacion} onChange={(e) => setProductForm((prev) => ({ ...prev, tiempoPreparacion: Number(e.target.value) }))} placeholder="Tiempo preparación (min)" className="input" />
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={handleSaveProduct} className="btn btn-primary btn-sm">Guardar</button>
                <button type="button" onClick={closeModal} className="btn btn-secondary btn-sm">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalType === 'sale' && saleProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Registrar venta</p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{saleProduct.nombre}</h2>
                <p className="mt-1 text-sm text-gray-500">Código {saleProduct.id} • Stock {saleProduct.stock}</p>
              </div>
              <button type="button" onClick={closeModal} className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-[1px] text-gray-500">Precio aceptado</p>
                  <p className="mt-2 text-xl font-semibold text-gray-900">{formatPrice(saleForm.precio, 'Bs ')}</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-[1px] text-gray-500">Anticipo 50%</p>
                  <p className="mt-2 text-xl font-semibold text-pink-600">{calculateAnticipo()}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input type="number" min="1" max={saleProduct.stock} value={saleForm.cantidad} onChange={(e) => setSaleForm((prev) => ({ ...prev, cantidad: Number(e.target.value) }))} placeholder="Cantidad" className="input" />
                <input type="number" min="0" value={saleForm.precio} onChange={(e) => setSaleForm((prev) => ({ ...prev, precio: Number(e.target.value) }))} placeholder="Precio por unidad" className="input" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input value={saleForm.cliente} onChange={(e) => setSaleForm((prev) => ({ ...prev, cliente: e.target.value }))} placeholder="Cliente" className="input" />
                <input type="date" value={saleForm.fechaEntrega} onChange={(e) => setSaleForm((prev) => ({ ...prev, fechaEntrega: e.target.value }))} className="input" />
              </div>
              <textarea value={saleForm.notas} onChange={(e) => setSaleForm((prev) => ({ ...prev, notas: e.target.value }))} placeholder="Notas adicionales" className="input min-h-[100px]" />
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={handleRegisterSale} className="btn btn-primary btn-sm inline-flex items-center gap-2"><LogIn className="h-4 w-4" /> Registrar venta</button>
                <button type="button" onClick={closeModal} className="btn btn-secondary btn-sm">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalType === 'stock' && stockProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Ajustar stock</p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{stockProduct.nombre}</h2>
                <p className="mt-1 text-sm text-gray-500">Stock actual: {stockProduct.stock}</p>
              </div>
              <button type="button" onClick={closeModal} className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <select value={stockForm.tipo} onChange={(e) => setStockForm((prev) => ({ ...prev, tipo: e.target.value }))} className="input">
                  <option value="entrada">Entrada</option>
                  <option value="salida">Salida</option>
                </select>
                <input type="number" min="0" value={stockForm.cantidad} onChange={(e) => setStockForm((prev) => ({ ...prev, cantidad: Number(e.target.value) }))} placeholder="Cantidad" className="input" />
              </div>
              <input value={stockForm.motivo} onChange={(e) => setStockForm((prev) => ({ ...prev, motivo: e.target.value }))} placeholder="Motivo" className="input" />
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={handleAdjustStock} className="btn btn-primary btn-sm inline-flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Ajustar stock</button>
                <button type="button" onClick={closeModal} className="btn btn-secondary btn-sm">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalType === 'detail' && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Detalle del arreglo</p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{selectedProduct.nombre}</h2>
                <p className="mt-1 text-sm text-gray-500">Código {selectedProduct.id} • SKU {selectedProduct.sku}</p>
              </div>
              <button type="button" onClick={closeModal} className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="rounded-[28px] border border-gray-100 bg-gray-50 p-5">
                  <p className="text-sm uppercase tracking-[1px] text-gray-500">Descripción</p>
                  <p className="mt-3 text-gray-700">{selectedProduct.descripcion}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">Categoría</p>
                    <p className="mt-2 font-semibold text-gray-900">{selectedProduct.categoria}</p>
                  </div>
                  <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">Subcategoría</p>
                    <p className="mt-2 font-semibold text-gray-900">{selectedProduct.subcategoria}</p>
                  </div>
                  <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">Proveedor</p>
                    <p className="mt-2 font-semibold text-gray-900">{selectedProduct.proveedor}</p>
                  </div>
                  <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">Tiempo preparación</p>
                    <p className="mt-2 font-semibold text-gray-900">{selectedProduct.tiempoPreparacion} min</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">Stock actual</p>
                    <p className="mt-2 font-semibold text-gray-900">{selectedProduct.stock}</p>
                  </div>
                  <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">Stock mínimo</p>
                    <p className="mt-2 font-semibold text-gray-900">{selectedProduct.stockMinimo}</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">Materiales</p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    {selectedProduct.materiales.map((material, index) => (
                      <li key={index} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-pink-500" /> {material.nombre} · {material.cantidad}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <img src={selectedProduct.imagen} alt={selectedProduct.nombre} className="h-full min-h-[300px] w-full rounded-[28px] object-cover" />
                <div className="rounded-3xl bg-gray-50 p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <Tag className="h-4 w-4 text-pink-500" />
                    <span className="text-sm font-semibold text-gray-900">Precio aceptado</span>
                  </div>
                  <p className="mt-3 text-3xl font-extrabold text-gray-900">{formatPrice(selectedProduct.precios.aceptado, 'Bs ')}</p>
                  <p className="mt-1 text-sm text-gray-500">Precio mantenido {formatPrice(selectedProduct.precios.mantenido, 'Bs ')}</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-5">
                  <p className="text-sm uppercase tracking-[1px] text-gray-500">Temporada</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProduct.temporada.map((season) => (<span key={season} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">{season}</span>))}
                  </div>
                </div>
                <div className="rounded-3xl bg-gray-50 p-5">
                  <p className="text-sm uppercase tracking-[1px] text-gray-500">Historial de stock</p>
                  <div className="mt-3 space-y-2 text-sm text-gray-700">
                    {selectedProduct.historial.length === 0 ? (
                      <p className="text-gray-500">Sin movimientos recientes.</p>
                    ) : selectedProduct.historial.map((entry, index) => (
                      <div key={index} className="rounded-2xl bg-white p-3 shadow-sm">
                        <p className="font-semibold text-gray-900">{entry.motivo}</p>
                        <p className="text-xs text-gray-500">{formatDate(entry.fecha)} • {entry.cantidad > 0 ? '+' : ''}{entry.cantidad}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button type="button" onClick={() => openSaleModal(selectedProduct)} className="btn btn-primary btn-sm inline-flex items-center gap-2"><ShoppingBag className="h-4 w-4" /> Registrar venta</button>
              <button type="button" onClick={() => openStockModal(selectedProduct)} className="btn btn-secondary btn-sm">Ajustar stock</button>
              <button type="button" onClick={closeModal} className="btn btn-ghost btn-sm">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Catalogo