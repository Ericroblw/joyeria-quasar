// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tsaafeeqbzjtctdhjkll.supabase.co'
const supabaseKey = 'sb_publishable_rXF4a6DUH5sKGtK_lnMIgg_iuikcdsP'

export const supabase = createClient(supabaseUrl, supabaseKey)
