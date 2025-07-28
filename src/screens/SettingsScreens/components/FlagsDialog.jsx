/*
 * Copyright ©️ 2024-2025 Sebastian Delmont <sd@ham2k.com>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useCallback, useEffect, useState } from 'react'
import { RadioButton, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { setSettings } from '../../../store/settings'
import { View } from 'react-native'
import { H2kButton, H2kDialog, H2kDialogActions, H2kDialogContent, H2kDialogTitle } from '../../../ui'

export function FlagsDialog ({ visible, settings, styles, onDialogDone }) {
  const dispatch = useDispatch()

  const [dialogVisible, setDialogVisible] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    setDialogVisible(visible)
  }, [visible])

  useEffect(() => {
    setValue(settings?.dxFlags || 'dx')
  }, [settings])

  const handleAccept = useCallback(() => {
    dispatch(setSettings({ dxFlags: value }))
    setDialogVisible(false)
    onDialogDone && onDialogDone()
  }, [value, dispatch, onDialogDone])

  const handleCancel = useCallback(() => {
    setValue(settings.theme)
    setDialogVisible(false)
    onDialogDone && onDialogDone()
  }, [settings, onDialogDone])

  return (
    <H2kDialog visible={dialogVisible} onDismiss={handleCancel}>
      <H2kDialogTitle style={{ textAlign: 'center' }}>Show Flags</H2kDialogTitle>
      <H2kDialogContent>
        <RadioButton.Group
          onValueChange={(v) => setValue(v)}
          value={value}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="dx" />
            <Text onPress={() => setValue('dx')} style={styles.rowText}>Only for DX contacts</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="all" />
            <Text onPress={() => setValue('all')} style={styles.rowText}>For all contacts</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value="none" />
            <Text onPress={() => setValue('none')} style={styles.rowText}>Don't show any flags</Text>
          </View>
        </RadioButton.Group>
      </H2kDialogContent>
      <H2kDialogActions>
        <H2kButton onPress={handleCancel}>Cancel</H2kButton>
        <H2kButton onPress={handleAccept}>Ok</H2kButton>
      </H2kDialogActions>
    </H2kDialog>
  )
}
