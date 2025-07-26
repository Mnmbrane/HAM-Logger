/*
 * Copyright ©️ 2024-2025 Sebastian Delmont <sd@ham2k.com>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useCallback, useMemo } from 'react'

import { H2kTextInput } from './H2kTextInput'

const VALID_MAIDENHEAD_REGEX = /^([A-R]{2}|[A-R]{2}[0-9]{2}|[A-R]{2}[0-9]{2}[a-x]{2}||[A-R]{2}[0-9]{2}[a-x]{2}[0-9]{2})$/

export function H2kGridInput (props) {
  const { value } = props

  const isValidValue = useMemo(() => VALID_MAIDENHEAD_REGEX.test(value), [value])

  const textTransformer = useCallback(text => {
    text = text.substring(0, 4).toUpperCase() + text.substring(4).toLowerCase()

    return text
  }, [])

  return (
    <H2kTextInput
      {...props}
      value={value}
      keyboard="dumb"
      noSpaces={true}
      maxLength={8}
      error={value && !isValidValue}
      textTransformer={textTransformer}
    />
  )
}
