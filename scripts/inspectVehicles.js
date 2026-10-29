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

async function inspect() {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('vehicle_id', { ascending: true })

  if (error) {
    console.error('Error fetching vehicles:', error)
  } else {
    console.log(`Total vehicles in DB: ${data.length}`)
    console.log(data)
  }
}

inspect()

