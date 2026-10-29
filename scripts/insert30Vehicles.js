import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const envContent = fs.readFileSync('.env', 'utf8')
const env = Object.fromEntries(
  envContent
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => {
      const idx = l.indexOf('=')
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]
    })
)

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)

const newVehicles = [
  // Exotic Supercars
  {
    brand: 'Ferrari',
    model: 'F8 Tributo',
    year: 2024,
    plate_number: 'FER-0008',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 2,
    daily_rate: 28000,
    status: 'Available',
  },
  {
    brand: 'Ferrari',
    model: 'Roma Spider',
    year: 2024,
    plate_number: 'ROM-2024',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 4,
    daily_rate: 26000,
    status: 'Available',
  },
  {
    brand: 'Lamborghini',
    model: 'Huracán EVO',
    year: 2024,
    plate_number: 'LMB-640',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 2,
    daily_rate: 32000,
    status: 'Available',
  },
  {
    brand: 'Lamborghini',
    model: 'Urus Performante',
    year: 2024,
    plate_number: 'URU-0001',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 5,
    daily_rate: 29000,
    status: 'Available',
  },
  {
    brand: 'McLaren',
    model: '720S Spider',
    year: 2023,
    plate_number: 'MCL-720',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 2,
    daily_rate: 30000,
    status: 'Available',
  },
  {
    brand: 'McLaren',
    model: 'Artura Hybrid',
    year: 2024,
    plate_number: 'ART-0680',
    transmission: 'Automatic',
    fuel_type: 'Hybrid',
    seating_capacity: 2,
    daily_rate: 27000,
    status: 'Available',
  },
  {
    brand: 'Aston Martin',
    model: 'Vantage V8',
    year: 2024,
    plate_number: 'AST-0007',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 2,
    daily_rate: 23000,
    status: 'Available',
  },
  {
    brand: 'Aston Martin',
    model: 'DBX707',
    year: 2024,
    plate_number: 'DBX-0707',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 5,
    daily_rate: 25000,
    status: 'Available',
  },
  {
    brand: 'Audi',
    model: 'R8 V10 Performance',
    year: 2023,
    plate_number: 'R8-5200',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 2,
    daily_rate: 24000,
    status: 'Available',
  },
  {
    brand: 'Audi',
    model: 'RS Q8 Carbon Edition',
    year: 2024,
    plate_number: 'RSQ-8888',
    transmission: 'Automatic',
    fuel_type: 'Hybrid',
    seating_capacity: 5,
    daily_rate: 18500,
    status: 'Available',
  },
  {
    brand: 'Audi',
    model: 'RS6 Avant Performance',
    year: 2024,
    plate_number: 'RS6-0600',
    transmission: 'Automatic',
    fuel_type: 'Hybrid',
    seating_capacity: 5,
    daily_rate: 17000,
    status: 'Available',
  },
  {
    brand: 'Chevrolet',
    model: 'Corvette Z06 Coupe',
    year: 2024,
    plate_number: 'VET-0006',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 2,
    daily_rate: 14500,
    status: 'Available',
  },
  {
    brand: 'Maserati',
    model: 'MC20 Cielo',
    year: 2024,
    plate_number: 'MC-0020',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 2,
    daily_rate: 27500,
    status: 'Available',
  },
  {
    brand: 'Maserati',
    model: 'Grecale Trofeo',
    year: 2024,
    plate_number: 'MAS-5300',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 5,
    daily_rate: 15000,
    status: 'Available',
  },

  // Ultra-Luxury Sedans & Flagships
  {
    brand: 'Rolls-Royce',
    model: 'Ghost Extended Series II',
    year: 2024,
    plate_number: 'RR-0001',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 5,
    daily_rate: 38000,
    status: 'Available',
  },
  {
    brand: 'Bentley',
    model: 'Continental GT V8',
    year: 2023,
    plate_number: 'BTL-0008',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 4,
    daily_rate: 25000,
    status: 'Available',
  },
  {
    brand: 'Bentley',
    model: 'Flying Spur Azure',
    year: 2024,
    plate_number: 'FLY-7777',
    transmission: 'Automatic',
    fuel_type: 'Hybrid',
    seating_capacity: 5,
    daily_rate: 32000,
    status: 'Available',
  },
  {
    brand: 'Mercedes',
    model: 'Maybach S 680 4MATIC',
    year: 2024,
    plate_number: 'MAY-0680',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 4,
    daily_rate: 30000,
    status: 'Available',
  },
  {
    brand: 'Mercedes',
    model: 'AMG G 63 Biturbo',
    year: 2024,
    plate_number: 'G63-9999',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 5,
    daily_rate: 24000,
    status: 'Available',
  },
  {
    brand: 'Mercedes',
    model: 'AMG GT 63 S 4-Door',
    year: 2024,
    plate_number: 'AMG-0063',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 4,
    daily_rate: 20000,
    status: 'Rented',
  },
  {
    brand: 'Mercedes',
    model: 'S 500 4MATIC Sedan',
    year: 2024,
    plate_number: 'S50-0001',
    transmission: 'Automatic',
    fuel_type: 'Hybrid',
    seating_capacity: 5,
    daily_rate: 16500,
    status: 'Available',
  },

  // BMW High-Performance & Flagships
  {
    brand: 'BMW',
    model: 'M4 Competition Coupe',
    year: 2024,
    plate_number: 'M4-0510',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 4,
    daily_rate: 13500,
    status: 'Available',
  },
  {
    brand: 'BMW',
    model: '740i M Sport Sedan',
    year: 2024,
    plate_number: 'BMW-7401',
    transmission: 'Automatic',
    fuel_type: 'Hybrid',
    seating_capacity: 5,
    daily_rate: 15000,
    status: 'Available',
  },
  {
    brand: 'BMW',
    model: 'X7 M60i xDrive',
    year: 2024,
    plate_number: 'BMW-0760',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 7,
    daily_rate: 16500,
    status: 'Available',
  },

  // Porsche Iconic
  {
    brand: 'Porsche',
    model: '911 Carrera S Coupe',
    year: 2024,
    plate_number: 'POR-0911',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 4,
    daily_rate: 19500,
    status: 'Rented',
  },

  // Executive SUVs & Off-Road Prestige
  {
    brand: 'Land Rover',
    model: 'Range Rover Autobiography',
    year: 2024,
    plate_number: 'RNG-0001',
    transmission: 'Automatic',
    fuel_type: 'Diesel',
    seating_capacity: 5,
    daily_rate: 21000,
    status: 'Available',
  },
  {
    brand: 'Land Rover',
    model: 'Defender 110 V8',
    year: 2024,
    plate_number: 'DEF-0110',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 7,
    daily_rate: 15000,
    status: 'Available',
  },
  {
    brand: 'Cadillac',
    model: 'Escalade ESV Sport',
    year: 2024,
    plate_number: 'CAD-0001',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 7,
    daily_rate: 18000,
    status: 'Available',
  },

  // Lexus Luxury & VIP
  {
    brand: 'Lexus',
    model: 'LX 600 VIP Edition',
    year: 2024,
    plate_number: 'LEX-0600',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    seating_capacity: 5,
    daily_rate: 16000,
    status: 'Rented',
  },
  {
    brand: 'Lexus',
    model: 'LM 350h Executive Lounge',
    year: 2024,
    plate_number: 'VIP-0350',
    transmission: 'Automatic',
    fuel_type: 'Hybrid',
    seating_capacity: 4,
    daily_rate: 19000,
    status: 'Available',
  },
]

async function insertVehicles() {
  console.log(`Starting insertion of ${newVehicles.length} vehicles...`)

  const { data, error } = await supabase.from('vehicles').insert(newVehicles).select()

  if (error) {
    console.error('Failed to insert vehicles:', error)
    process.exit(1)
  }

  console.log(`Successfully inserted ${data.length} vehicles!`)

  // Check total count now
  const { count } = await supabase.from('vehicles').select('*', { count: 'exact', head: true })
  console.log(`Total vehicles in database now: ${count}`)
}

insertVehicles()

