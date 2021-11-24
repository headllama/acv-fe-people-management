import { ComponentType } from 'react'
import {
  RouteProps as ReactRouteProps,
  Route as ReactRoute,
  Redirect,
} from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean
  component: ComponentType
}

export function Route({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) {
  const { token } = useAuth()

  return (
    <ReactRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}
