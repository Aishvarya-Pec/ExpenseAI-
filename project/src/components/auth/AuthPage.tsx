import React, { useState } from 'react'
import { AuthLayout } from './AuthLayout'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { ForgotPasswordForm } from './ForgotPasswordForm'

type AuthMode = 'login' | 'register' | 'forgot-password'

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login')

  const getTitle = () => {
    switch (mode) {
      case 'login':
        return 'Welcome Back'
      case 'register':
        return 'Create Account'
      case 'forgot-password':
        return 'Reset Password'
      default:
        return 'ExpenseAI'
    }
  }

  const getSubtitle = () => {
    switch (mode) {
      case 'login':
        return 'Sign in to your account to continue'
      case 'register':
        return 'Start tracking your expenses with AI'
      case 'forgot-password':
        return 'Enter your email to reset your password'
      default:
        return ''
    }
  }

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            onToggleMode={() => setMode('register')}
            onForgotPassword={() => setMode('forgot-password')}
          />
        )
      case 'register':
        return (
          <RegisterForm
            onToggleMode={() => setMode('login')}
          />
        )
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onBackToLogin={() => setMode('login')}
          />
        )
      default:
        return null
    }
  }

  return (
    <AuthLayout title={getTitle()} subtitle={getSubtitle()}>
      {renderForm()}
    </AuthLayout>
  )
}