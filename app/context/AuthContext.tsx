"use client"
import { fetchEachUser } from '@/utils/axiosInstance';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type User = {
  id: number;
	account_name: string;
	account_number: string;
	balance: number;
	bank_name: number;
	created_at: string;
	email: string;
	email_verified_at: string;
	enabled: 1;
	fullName: string;
	my_referral_code: string;
	number: string;
	referral_bonus: number;
	referral_code: string;
	referred_by: string;
	role: string;
	star: number;
	total_withdraw: number;
	updated_at: string;
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  setProfile: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
     const fetchUserData = async () => {
                try{
                    const response = await fetchEachUser()
                  
                    if (response.data.user) {
                        localStorage.setItem('user', JSON.stringify(response.data))
                        setUser(response.data?.user)
                    } else {
                        console.error('Failed to fetch user data:', response.data.message)
                    }
                } catch (error: any) {
                    console.error('Error fetching user data:', error)
                }
            }
    fetchUserData()

    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const login = (user: User, token: string) => {
    setUser(user)
    setToken(token)
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  const setProfile = (user: User) => {
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setProfile}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
