import React, { useState } from 'react'
import { AuthLayout } from './AuthLayout'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { ForgotPasswordForm } from './ForgotPasswordForm'

type AuthMode = 'login' | 'register' | 'forgot-password'

interface AuthPageProps {
  onSuccess?: () => void
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
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
            onSuccess={onSuccess}
          />
        )
      case 'register':
        return (
          <RegisterForm
            onToggleMode={() => setMode('login')}
            onSuccess={onSuccess}
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