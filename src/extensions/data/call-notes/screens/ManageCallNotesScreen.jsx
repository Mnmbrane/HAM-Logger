/*
 * Copyright ©️ 2024-2025 Sebastian Delmont <sd@ham2k.com>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { ScrollView } from 'react-native'
import UUID from 'react-native-uuid'
import { SafeAreaView } from 'react-native-safe-area-context'

import { loadDataFile } from '../../../../store/dataFiles/actions/dataFileFS'
import { registerDataFile, unRegisterDataFile } from '../../../../store/dataFiles'
import { selectExtensionSettings, setExtensionSettings } from '../../../../store/settings'
import { useThemedStyles } from '../../../../styles/tools/useThemedStyles'
import ScreenContainer from '../../../../screens/components/ScreenContainer'
import { H2kButton, H2kDialog, H2kDialogActions, H2kDialogContent, H2kDialogTitle, H2kListItem, H2kListSection, H2kMarkdown, H2kTextInput } from '../../../../ui'

import { BUILT_IN_NOTES, CallNotesData, Info, createDataFileDefinition } from '../CallNotesExtension'

const FileDefinitionDialog = ({ identifier, extSettings, styles, dispatch, onDialogDone }) => {
  const def = useMemo(() => extSettings.customFiles.find(f => f.identifier === identifier), [extSettings.customFiles, identifier])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const originalLocation = useMemo(() => def.location, [])

  const updateDef = useCallback((values) => {
    const newFiles = [...extSettings.customFiles]
    let pos = newFiles.findIndex(f => f.identifier === identifier)
    if (pos < 0) pos = newFiles.length
    newFiles[pos] = { ...def, ...values }

    dispatch(setExtensionSettings({ key: Info.key, customFiles: newFiles }))
  }, [extSettings.customFiles, def, dispatch, identifier])

  const handleDelete = useCallback(() => {
    const newFiles = [...extSettings.customFiles]
    let pos = newFiles.findIndex(f => f.identifier === identifier)
    newFiles.splice(pos, 1)
    const enabledNotes = { ...extSettings.enabledNotes }
    delete enabledNotes[identifier]
    dispatch(setExtensionSettings({ key: Info.key, customFiles: newFiles, enabledNotes }))

    pos = CallNotesData.files.findIndex(f => f.identifier === identifier)
    if (pos >= 0) {
      CallNotesData.files.splice(pos, 1)
      delete CallNotesData.notes[identifier]
      unRegisterDataFile(`call-notes-${identifier}`)
      CallNotesData.activeFiles[identifier] = false
    }

    onDialogDone && onDialogDone()
  }, [dispatch, extSettings.customFiles, extSettings.enabledNotes, identifier, onDialogDone])

  const handleDone = useCallback(async () => {
    let pos = CallNotesData.files.findIndex(f => f.identifier === identifier)
    if (pos <= 0) pos = CallNotesData.files.length
    CallNotesData.files[pos] = def

    if (originalLocation !== def.location) {
      unRegisterDataFile(`call-notes-${identifier}`)
      registerDataFile(createDataFileDefinition(def))
      if (CallNotesData.activeFiles[identifier]) {
        dispatch(loadDataFile(`call-notes-${identifier}`))
      }
    }

    onDialogDone && onDialogDone()
  }, [originalLocation, def, onDialogDone, identifier, dispatch])

  return (
    <H2kDialog visible={true} onDismiss={onDialogDone}>
      <H2kDialogTitle style={{ textAlign: 'center' }}>Callsign Notes File</H2kDialogTitle>
      <H2kDialogContent>
        <H2kTextInput
          label="Name"
          value={def.name ?? ''}
          placeholder={'Name for your Callsign Notes File'}
          onChangeText={(value) => updateDef({ name: value }) }
        />
        <H2kTextInput
          label="Location"
          value={def.location ?? ''}
          inputMode={'url'}
          // multiline={true}  // TODO: Change to multiline when this bug is fixed https://github.com/facebook/react-native/issues/37784
          placeholder={'https://example.com/dir/notes.txt'}
          onChangeText={(value) => updateDef({ location: value }) }
        />
      </H2kDialogContent>
      <H2kDialogActions style={{ justifyContent: 'space-between' }}>
        <H2kButton onPress={handleDelete}>Delete</H2kButton>
        <H2kButton onPress={handleDone}>Done</H2kButton>
      </H2kDialogActions>
    </H2kDialog>
  )
}

export default function ManageCallNotesScreen ({ navigation, dispatch }) {
  useEffect(() => {
    navigation.setOptions({ title: 'Callsign Notes' })
  }, [navigation])

  const styles = useThemedStyles()

  const extSettings = useSelector(state => selectExtensionSettings(state, Info.key))

  const customFiles = useMemo(() => {
    return extSettings?.customFiles || []
  }, [extSettings])

  const [selectedFile, setSelectedFile] = useState()

  const handleToggle = useCallback((identifier, value) => {
    dispatch(setExtensionSettings({ key: Info.key, enabledNotes: { ...extSettings.enabledNotes, [identifier]: value } }))
    CallNotesData.activeFiles[identifier] = value
  }, [dispatch, extSettings.enabledNotes])

  const handleNewFile = useCallback(() => {
    const identifier = UUID.v4()
    dispatch(setExtensionSettings({ key: Info.key, customFiles: [...customFiles, { name: '', identifier }] }))
    CallNotesData.activeFiles[identifier] = true
    setSelectedFile(identifier)
  }, [customFiles, dispatch])

  return (
    <ScreenContainer>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <H2kListSection title={'Builtin'}>
            {BUILT_IN_NOTES.map(def => (
              <H2kListItem
                key={def.name}
                title={def.name}
                description={def.description}
                leftIcon={'file-account-outline'}
                rightSwitchValue={extSettings?.enabledNotes?.[def.identifier] !== false}
                rightSwitchOnValueChange={(value) => handleToggle(def.identifier, value)}
              />
            ))}
          </H2kListSection>

          <H2kListSection title="Custom">
            {customFiles.map((def, i) => (
              <H2kListItem key={i}
                title={def.name}
                description={def.location}
                leftIcon={'file-account-outline'}
                rightSwitchValue={extSettings?.enabledNotes?.[def.identifier] !== false}
                rightSwitchOnValueChange={(value) => handleToggle(def.identifier, value)}
                onPress={() => setSelectedFile(def.identifier)}
              />
            ))}

            <H2kListItem
              title={'Add a new file'}
              leftIcon={'plus'}
              onPress={handleNewFile}
            />

          </H2kListSection>
          {selectedFile !== undefined && (
            <FileDefinitionDialog
              identifier={selectedFile}
              extSettings={extSettings}
              styles={styles}
              dispatch={dispatch}
              onDialogDone={() => setSelectedFile(undefined)}
            />
          )}
          <H2kListSection title={'About Callsign Notes'}>
            <H2kMarkdown style={{ marginHorizontal: styles.oneSpace * 2 }}>
              {`
Callsign notes are stored on simple text files, one call per line followed by information you want shown in the logging screen. You can use the builtin files or add your own.

Provide a direct link to a plain text file, or a "share link" from a service like:

* [Google Docs](https://docs.google.com/)
* [Google Drive](https://drive.google.com/)
* [GitHub Gists](https://gist.github.com/)
* [Dropbox](https://www.dropbox.com/)
* [Apple iCloud Drive](https://www.icloud.com/)

Lines on that file should look like this and can support basic markdown formatting:

\`\`\`
K2HRC 🎉 Ham2K Radio Club!!!

KE8PZN 👑 James POTA King

WD4DAN Dan POTA _Royalty_

DAN WD4DAN,WD4JMM
\`\`\`


If the entry starts with an emoji, it will be used instead of the default ⭐.

Entries can be used for "callsign expansion" if you first type \`..\` or \`//\` in the callsign field, such as \`//DAN\` in the example above.

          `}
            </H2kMarkdown>
          </H2kListSection>
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  )
}
