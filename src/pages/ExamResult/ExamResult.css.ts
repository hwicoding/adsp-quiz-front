import { style } from '@vanilla-extract/css'
import { theme } from '../../styles/theme'

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
})

export const header = style({
  marginBottom: '2rem',
  textAlign: 'center',
})

export const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
})

export const loading = style({
  textAlign: 'center',
  padding: '4rem',
  fontSize: '1.2rem',
})

export const error = style({
  textAlign: 'center',
  padding: '4rem',
  fontSize: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

export const answerList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

export const sectionTitle = style({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
})

export const answerItem = style({
  padding: '1.5rem',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

export const answerHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const questionNumber = style({
  fontWeight: 'bold',
})

export const correctBadge = style({
  padding: '0.25rem 0.75rem',
  backgroundColor: theme.colors.success,
  color: theme.colors.white,
  borderRadius: '4px',
  fontSize: '0.875rem',
})

export const wrongBadge = style({
  padding: '0.25rem 0.75rem',
  backgroundColor: theme.colors.error,
  color: theme.colors.white,
  borderRadius: '4px',
  fontSize: '0.875rem',
})

export const questionText = style({
  fontSize: '1rem',
  marginTop: '0.5rem',
})

export const answerInfo = style({
  display: 'flex',
  gap: '1rem',
  fontSize: '0.875rem',
  color: theme.colors.textSecondary,
})

export const explanation = style({
  marginTop: '0.5rem',
  padding: '1rem',
  backgroundColor: theme.colors.backgroundSecondary,
  borderRadius: '4px',
  fontSize: '0.875rem',
})

export const footer = style({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  marginTop: '2rem',
})
