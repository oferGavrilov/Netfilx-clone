import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { auth } from '../firebase'


export function useAuth() {
      const [loading, setLoading] = useState(false)
      const router = useRouter()

      const signUp = async (email: string, password: string, fullname: string) => {
            setLoading(true)
            try {
                  const userToSave = await createUserWithEmailAndPassword(auth, email, password)
                  router.push('/')

            } catch (err) {
                  throw err
            } finally {
                  setLoading(false)
            }
      }

      const signIn = async (email: string, password: string, fullname: string) => {
            setLoading(true)
            try {
                  const userToSave = await signInWithEmailAndPassword(auth, email, password)
                  router.push('/')

            } catch (err) {
                  throw err
            } finally {
                  setLoading(false)
            }
      }


      const logout = async () => {
            setLoading(true)
            try {
                  signOut(auth)
            } catch (err) {
                  throw err
            } finally {
                  setLoading(false)
            }
      }
      return
}
