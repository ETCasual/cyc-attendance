import { randomUUID } from 'crypto'
import Cookies from 'cookies'
import { encode, decode } from 'next-auth/jwt'


// Helper functions to generate unique keys and calculate the expiry dates for session cookies
export const generateSessionToken = () => {
    // Use `randomUUID` if available. (Node 15.6++)
    return randomUUID()
}

export const fromDate = (time: number, date = Date.now()) => {
    return new Date(date + time * 1000)
}