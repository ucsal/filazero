import dotenv from 'dotenv'

dotenv.config()

const config = {
  VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
}

console.log('=== Firebase Configuration ===')
console.log(JSON.stringify(config, null, 2))

const missingKeys = Object.entries(config)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missingKeys.length > 0) {
  console.error('\n❌ Missing environment variables:', missingKeys)
} else {
  console.log('\n✅ All environment variables loaded successfully!')
}
